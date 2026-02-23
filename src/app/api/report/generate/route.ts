import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const REPORT_SECRET = process.env.REPORT_GENERATE_SECRET || "";
const PRICE_CENTS = 2999;
const STALE_REPORT_MS = 5 * 60 * 1000; // 5 minutes — allow re-generation if stuck

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  maxRetries: 5,
});

const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;

export async function POST(request: NextRequest) {
  try {
    // Auth: require shared secret to prevent free report bypass
    const authHeader = request.headers.get("x-report-secret");
    if (!REPORT_SECRET || authHeader !== REPORT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId, email, paymentId, age, country, yearsExperience } = await request.json();

    if (!jobId || !email || !paymentId) {
      return NextResponse.json(
        { error: "Missing jobId, email, or paymentId" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Idempotency: if report already exists for this payment, return it
    // But allow re-generation if stuck in "generating" for >5 minutes
    const { data: existing } = await supabase
      .from("reports")
      .select("id, slug, status, created_at")
      .eq("stripe_payment_id", paymentId)
      .single();

    if (existing) {
      if (existing.status === "completed") {
        return NextResponse.json({
          reportUrl: `/report/${existing.slug}`,
          slug: existing.slug,
          status: existing.status,
        });
      }
      // If stuck generating for >5 min, delete stale record and re-generate
      const age_ms = Date.now() - new Date(existing.created_at).getTime();
      if (existing.status === "generating" && age_ms < STALE_REPORT_MS) {
        return NextResponse.json({
          reportUrl: `/report/${existing.slug}`,
          slug: existing.slug,
          status: "generating",
        });
      }
      // Stale — remove so we can re-create below
      if (existing.status === "generating" && age_ms >= STALE_REPORT_MS) {
        await supabase.from("reports").delete().eq("id", existing.id);
      }
    }

    // Fetch job data
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Create report record
    const slug = nanoid(12);
    const { data: report, error: reportError } = await supabase
      .from("reports")
      .insert({
        job_id: jobId,
        email,
        slug,
        risk_score: job.ai_risk_score,
        stripe_payment_id: paymentId,
        amount_paid: PRICE_CENTS,
        status: "generating",
      })
      .select()
      .single();

    if (reportError) {
      console.error("Report creation error:", reportError);
      return NextResponse.json(
        { error: "Failed to create report" },
        { status: 500 }
      );
    }

    // Fetch social data in parallel with nothing else (fast)
    const userProfile = { age, country, yearsExperience };
    const [xData, redditData] = await Promise.all([
      fetchXData(job.title),
      fetchRedditData(job.title),
    ]);

    // Generate report content with Claude Haiku
    const reportContent = await generateReport(job, userProfile, xData, redditData);

    // Update report with generated content
    const { error: updateError } = await supabase
      .from("reports")
      .update({
        executive_summary: reportContent.executive_summary,
        task_analysis: reportContent.task_analysis,
        career_pivot_plan: reportContent.career_pivot_plan,
        skills_roadmap: reportContent.skills_roadmap,
        asset_guidance: reportContent.asset_guidance,
        industry_outlook: reportContent.industry_outlook,
        social_sentiment: reportContent.social_sentiment,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", report.id);

    if (updateError) {
      console.error("Report update error:", updateError);
      // Try to mark as failed so it doesn't stay stuck in "generating"
      await supabase.from("reports").update({ status: "failed" }).eq("id", report.id);
    }

    return NextResponse.json({
      reportUrl: `/report/${slug}`,
      slug,
    });
  } catch (err) {
    console.error("Report generation error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fetch recent tweets about this job + AI
async function fetchXData(jobTitle: string): Promise<string> {
  if (!X_BEARER_TOKEN) return "";

  const shortTitle = jobTitle.split(",")[0].replace(/and /g, "").trim();
  const query = `("${shortTitle}" OR ${shortTitle.split(" ").slice(0, 2).join(" ")}) (AI OR automation OR "artificial intelligence" OR "replaced by") -is:retweet lang:en`;

  try {
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=created_at,public_metrics,text`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` },
    });

    if (!res.ok) return "";

    const data = await res.json();
    if (!data.data || data.data.length === 0) return "";

    const tweets = data.data.slice(0, 5).map((t: any, i: number) =>
      `${i + 1}. "${t.text.substring(0, 200)}${t.text.length > 200 ? "..." : ""}" (${t.public_metrics?.like_count || 0} likes)`
    );
    return `Recent X/Twitter posts about "${shortTitle}" and AI:\n${tweets.join("\n")}`;
  } catch {
    return "";
  }
}

// Fetch Reddit posts about this job + AI
async function fetchRedditData(jobTitle: string): Promise<string> {
  const shortTitle = jobTitle.split(",")[0].replace(/and /g, "").trim();
  const searchQuery = `${shortTitle} AI automation`;

  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=relevance&t=year&limit=8`;
    const res = await fetch(url, {
      headers: { "User-Agent": "EscapePermanentUnderclass/1.0" },
    });

    if (!res.ok) return "";

    const data = await res.json();
    const posts = data?.data?.children || [];
    if (posts.length === 0) return "";

    const formatted = posts.slice(0, 5).map((p: any, i: number) => {
      const post = p.data;
      const selftext = post.selftext ? post.selftext.substring(0, 150) : "";
      return `${i + 1}. r/${post.subreddit}: "${post.title}" (${post.score} upvotes, ${post.num_comments} comments)${selftext ? `\n   "${selftext}..."` : ""}`;
    });

    return `Recent Reddit discussions about "${shortTitle}" and AI:\n${formatted.join("\n")}`;
  } catch {
    return "";
  }
}

interface JobData {
  title: string;
  category: string;
  description: string;
  ai_risk_score: number;
  task_automation_score: number;
  cognitive_exposure_score: number;
  physical_requirement_score: number;
  creativity_score: number;
  social_intelligence_score: number;
  regulatory_barrier_score: number;
  median_salary: number;
  employment_count: number;
  growth_projection: number;
}

interface UserProfile {
  age?: number;
  country?: string;
  yearsExperience?: number;
}

function repairJson(jsonStr: string): any {
  try {
    return JSON.parse(jsonStr);
  } catch {
    let repaired = jsonStr;
    repaired = repaired.replace(/,\s*([}\]])/g, "$1");
    repaired = repaired.replace(/,?\s*"[^"]*"\s*:\s*$/gm, "");
    const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
    if (quoteCount % 2 !== 0) repaired += '"';
    const openBraces = (repaired.match(/{/g) || []).length - (repaired.match(/}/g) || []).length;
    const openBrackets = (repaired.match(/\[/g) || []).length - (repaired.match(/]/g) || []).length;
    for (let i = 0; i < openBrackets; i++) repaired += "]";
    for (let i = 0; i < openBraces; i++) repaired += "}";
    try {
      return JSON.parse(repaired);
    } catch {
      // Last resort: truncate backwards until valid
      for (let end = repaired.length; end > 100; end--) {
        try {
          let slice = repaired.substring(0, end);
          const ob = (slice.match(/{/g) || []).length - (slice.match(/}/g) || []).length;
          const obr = (slice.match(/\[/g) || []).length - (slice.match(/]/g) || []).length;
          const qc = (slice.match(/(?<!\\)"/g) || []).length;
          if (qc % 2 !== 0) slice += '"';
          for (let i = 0; i < obr; i++) slice += "]";
          for (let i = 0; i < ob; i++) slice += "}";
          return JSON.parse(slice);
        } catch { continue; }
      }
      throw new Error("Unable to repair JSON");
    }
  }
}

async function generateReport(job: JobData, user: UserProfile, xData: string, redditData: string) {
  // Build personalization block
  const hasPersonalization = user.age || user.country || user.yearsExperience;
  const personBlock = hasPersonalization ? `
ABOUT THE PERSON:
${user.age ? `- Age: ${user.age} years old` : ""}
${user.country ? `- Country of Residence: ${user.country}` : ""}
${user.yearsExperience !== undefined ? `- Years of Professional Experience: ${user.yearsExperience} years in this field` : ""}

PERSONALIZATION REQUIREMENTS:
${user.age ? "- Factor in their AGE when discussing timelines and urgency. Consider years until typical retirement." : ""}
${user.country ? `- Factor in their COUNTRY (${user.country}) — mention local job market conditions, AI adoption rates, regional trends, and local resources.` : ""}
${user.yearsExperience !== undefined ? `- Factor in YEARS OF EXPERIENCE (${user.yearsExperience}yr) — a ${user.yearsExperience > 15 ? "senior" : user.yearsExperience > 5 ? "mid-career" : "early-career"} professional has different pivot options.` : ""}
- Make the executive summary speak directly to this person's specific situation.
- Tailor career pivot suggestions to be realistic given their profile.
` : "";

  // Build social data block
  const socialBlock = (xData || redditData) ? `
LIVE SOCIAL MEDIA SENTIMENT (reference specific themes where relevant):

${xData || "[No X/Twitter data available]"}

${redditData || "[No Reddit data available]"}
` : "";

  const hasSocialData = !!(xData || redditData);

  const prompt = `You are an expert career analyst specializing in AI's impact on the labor market. Generate a comprehensive${hasPersonalization ? ", PERSONALIZED" : ""} career risk report for ${hasPersonalization ? "a specific individual working" : "someone working"} as a "${job.title}" in the "${job.category}" sector.
${personBlock}
JOB DATA:
- AI Risk Score: ${job.ai_risk_score}/10
- Task Automation Potential: ${job.task_automation_score}/10
- Cognitive AI Exposure: ${job.cognitive_exposure_score}/10
- Physical Requirement: ${job.physical_requirement_score}/10
- Creativity Required: ${job.creativity_score}/10
- Social Intelligence Required: ${job.social_intelligence_score}/10
- Regulatory Protection: ${job.regulatory_barrier_score}/10
- Median Salary: $${job.median_salary?.toLocaleString()}
- US Employment: ${job.employment_count?.toLocaleString()}
- 10-Year Growth Projection: ${job.growth_projection}%
${socialBlock}
Generate the following sections as a JSON object:

1. "executive_summary": A 3-4 paragraph executive summary${hasPersonalization ? " speaking DIRECTLY to this person, referencing their profile" : ""}. Be specific about which aspects of the job are most vulnerable and which are most resilient. Include timeline estimates (near-term 1-3 years, medium-term 3-7 years, long-term 7-15 years)${hasPersonalization ? " tailored to their career stage" : ""}.

2. ${hasSocialData ? `"social_sentiment": An object with:
   - "overall_mood": "alarmed" | "concerned" | "mixed" | "cautiously_optimistic" | "confident"
   - "key_themes": array of 3-5 themes from social discussion
   - "notable_quotes": 1-2 brief paraphrased insights from social posts
   - "sentiment_summary": 2-3 sentence summary of what people in this field are saying about AI

3. ` : ""}"task_analysis": An array of 8-12 specific tasks this role performs, each with:
   - "task": task description
   - "automation_risk": "high" | "medium" | "low"
   - "timeline": estimated years until AI can handle this
   - "explanation": why this task is/isn't at risk

${hasSocialData ? "4" : "3"}. "career_pivot_plan": An object with:
   - "immediate_actions": array of 3-5 things to do right now${hasPersonalization ? " (tailored to their experience level and country)" : ""}
   - "adjacent_roles": array of 3-5 related AI-resistant roles, each with "title", "why_safer", "transition_difficulty" (1-5)
   - "upskilling_path": array of 3-5 skills to develop, each with "skill", "importance" (1-10), "resources"

${hasSocialData ? "5" : "4"}. "skills_roadmap": An object with:
   - "current_strengths": skills from this role that will remain valuable
   - "skills_to_develop": specific technical and soft skills needed
   - "timeline": month-by-month plan for the first 6 months

${hasSocialData ? "6" : "5"}. "asset_guidance": An object with (NO specific investment advice, no stock picks, no ETFs, no mutual funds):
   - "general_principles": 3-4 principles for positioning in an AI economy
   - "areas_of_focus": sectors/areas to build knowledge in
   - "avoid": common mistakes to avoid

${hasSocialData ? "7" : "6"}. "industry_outlook": A 2-3 paragraph analysis of how AI will reshape this industry${hasSocialData ? ", incorporating current social media sentiment" : ""}.

Return ONLY valid JSON, no markdown formatting.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 12288,
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return repairJson(jsonStr);
  } catch {
    return {
      executive_summary:
        "Report generation encountered an issue. Please contact support.",
      task_analysis: [],
      career_pivot_plan: {},
      skills_roadmap: {},
      asset_guidance: {},
      industry_outlook: "Unable to generate industry outlook at this time.",
    };
  }
}
