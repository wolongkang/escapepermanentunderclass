// Test script: Generate 20 reports enriched with LIVE X + Reddit data
// Combines personalization + real-time social sentiment
// Usage: npx tsx scripts/test-reports-social.ts

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// Load .env.local for API keys
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  maxRetries: 5,
});

const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;

// Same 20 jobs + same user profiles as personalized test
const TEST_JOBS = [
  { title: "Telemarketers", category: "Sales", ai_risk_score: 8.8, task_automation_score: 8.5, cognitive_exposure_score: 7.2, physical_requirement_score: 1.5, creativity_score: 2.0, social_intelligence_score: 3.5, regulatory_barrier_score: 1.8, median_salary: 29600, employment_count: 130000, growth_projection: -18.7 },
  { title: "Bookkeeping, Accounting, and Auditing Clerks", category: "Finance & Accounting", ai_risk_score: 7.8, task_automation_score: 8.0, cognitive_exposure_score: 7.5, physical_requirement_score: 1.2, creativity_score: 2.5, social_intelligence_score: 2.8, regulatory_barrier_score: 3.0, median_salary: 45860, employment_count: 1500000, growth_projection: -5.2 },
  { title: "Data Entry Keyers", category: "Office & Administrative", ai_risk_score: 8.5, task_automation_score: 9.0, cognitive_exposure_score: 6.5, physical_requirement_score: 1.5, creativity_score: 1.5, social_intelligence_score: 1.8, regulatory_barrier_score: 1.2, median_salary: 35850, employment_count: 152000, growth_projection: -25.6 },
  { title: "Insurance Appraisers, Auto Damage", category: "Finance & Accounting", ai_risk_score: 5.0, task_automation_score: 5.5, cognitive_exposure_score: 5.2, physical_requirement_score: 3.5, creativity_score: 3.0, social_intelligence_score: 4.0, regulatory_barrier_score: 4.5, median_salary: 71800, employment_count: 14800, growth_projection: -6.0 },
  { title: "Logisticians", category: "Finance & Accounting", ai_risk_score: 7.1, task_automation_score: 7.0, cognitive_exposure_score: 7.5, physical_requirement_score: 1.5, creativity_score: 3.5, social_intelligence_score: 4.0, regulatory_barrier_score: 2.5, median_salary: 77520, employment_count: 198000, growth_projection: 18.0 },
  { title: "Software Developers", category: "Technology", ai_risk_score: 4.8, task_automation_score: 4.5, cognitive_exposure_score: 7.0, physical_requirement_score: 1.2, creativity_score: 7.5, social_intelligence_score: 5.0, regulatory_barrier_score: 2.0, median_salary: 127260, employment_count: 1795300, growth_projection: 25.7 },
  { title: "Registered Nurses", category: "Healthcare", ai_risk_score: 3.2, task_automation_score: 3.0, cognitive_exposure_score: 4.5, physical_requirement_score: 6.5, creativity_score: 5.5, social_intelligence_score: 8.5, regulatory_barrier_score: 8.0, median_salary: 81220, employment_count: 3175390, growth_projection: 5.6 },
  { title: "Graphic Designers", category: "Arts & Design", ai_risk_score: 6.2, task_automation_score: 5.5, cognitive_exposure_score: 6.8, physical_requirement_score: 1.2, creativity_score: 8.0, social_intelligence_score: 5.0, regulatory_barrier_score: 1.5, median_salary: 57990, employment_count: 263900, growth_projection: 2.7 },
  { title: "Paralegals and Legal Assistants", category: "Legal", ai_risk_score: 6.5, task_automation_score: 6.8, cognitive_exposure_score: 7.0, physical_requirement_score: 1.2, creativity_score: 3.5, social_intelligence_score: 5.0, regulatory_barrier_score: 5.0, median_salary: 59200, employment_count: 345000, growth_projection: 4.0 },
  { title: "Real Estate Agents", category: "Sales", ai_risk_score: 5.5, task_automation_score: 5.0, cognitive_exposure_score: 5.5, physical_requirement_score: 3.0, creativity_score: 4.5, social_intelligence_score: 7.5, regulatory_barrier_score: 5.5, median_salary: 52030, employment_count: 168740, growth_projection: 3.0 },
  { title: "Market Research Analysts and Marketing Specialists", category: "Finance & Accounting", ai_risk_score: 4.5, task_automation_score: 5.0, cognitive_exposure_score: 6.5, physical_requirement_score: 1.2, creativity_score: 6.0, social_intelligence_score: 5.5, regulatory_barrier_score: 1.5, median_salary: 68230, employment_count: 792000, growth_projection: 13.0 },
  { title: "Truck Drivers, Heavy and Tractor-Trailer", category: "Transportation", ai_risk_score: 6.0, task_automation_score: 6.5, cognitive_exposure_score: 3.0, physical_requirement_score: 5.5, creativity_score: 2.0, social_intelligence_score: 3.0, regulatory_barrier_score: 6.0, median_salary: 49920, employment_count: 2100000, growth_projection: 4.0 },
  { title: "Surgeons", category: "Healthcare", ai_risk_score: 2.0, task_automation_score: 1.5, cognitive_exposure_score: 4.0, physical_requirement_score: 7.5, creativity_score: 8.0, social_intelligence_score: 8.0, regulatory_barrier_score: 9.5, median_salary: 251890, employment_count: 36100, growth_projection: 3.0 },
  { title: "Mental Health Counselors", category: "Healthcare", ai_risk_score: 2.5, task_automation_score: 1.8, cognitive_exposure_score: 3.5, physical_requirement_score: 1.5, creativity_score: 7.0, social_intelligence_score: 9.5, regulatory_barrier_score: 7.5, median_salary: 53710, employment_count: 373000, growth_projection: 22.0 },
  { title: "Electricians", category: "Construction & Extraction", ai_risk_score: 2.3, task_automation_score: 2.0, cognitive_exposure_score: 2.5, physical_requirement_score: 8.0, creativity_score: 5.0, social_intelligence_score: 4.5, regulatory_barrier_score: 7.0, median_salary: 60240, employment_count: 728800, growth_projection: 6.0 },
  { title: "Firefighters", category: "Protective Service", ai_risk_score: 2.1, task_automation_score: 1.5, cognitive_exposure_score: 2.0, physical_requirement_score: 9.0, creativity_score: 5.0, social_intelligence_score: 7.0, regulatory_barrier_score: 8.0, median_salary: 51680, employment_count: 330800, growth_projection: 4.0 },
  { title: "Elementary School Teachers", category: "Education & Training", ai_risk_score: 3.0, task_automation_score: 2.5, cognitive_exposure_score: 4.0, physical_requirement_score: 3.5, creativity_score: 7.0, social_intelligence_score: 9.0, regulatory_barrier_score: 7.5, median_salary: 61690, employment_count: 1359300, growth_projection: 1.0 },
  { title: "Plumbers, Pipefitters, and Steamfitters", category: "Construction & Extraction", ai_risk_score: 2.2, task_automation_score: 1.8, cognitive_exposure_score: 2.0, physical_requirement_score: 8.5, creativity_score: 4.5, social_intelligence_score: 4.0, regulatory_barrier_score: 7.0, median_salary: 59880, employment_count: 496100, growth_projection: 2.0 },
  { title: "Farmers, Ranchers, and Other Agricultural Managers", category: "Management", ai_risk_score: 2.7, task_automation_score: 3.5, cognitive_exposure_score: 3.0, physical_requirement_score: 7.5, creativity_score: 5.0, social_intelligence_score: 5.0, regulatory_barrier_score: 4.0, median_salary: 73060, employment_count: 963600, growth_projection: -1.0 },
  { title: "Compensation, Benefits, and Job Analysis Specialists", category: "Finance & Accounting", ai_risk_score: 7.4, task_automation_score: 7.5, cognitive_exposure_score: 7.8, physical_requirement_score: 1.2, creativity_score: 3.0, social_intelligence_score: 4.5, regulatory_barrier_score: 4.0, median_salary: 67190, employment_count: 90800, growth_projection: 6.0 },
];

const USER_PROFILES = [
  { age: 23, country: "United States", years_experience: 1 },
  { age: 52, country: "Germany", years_experience: 28 },
  { age: 34, country: "India", years_experience: 8 },
  { age: 45, country: "United Kingdom", years_experience: 20 },
  { age: 29, country: "Brazil", years_experience: 5 },
  { age: 26, country: "United States", years_experience: 3 },
  { age: 58, country: "Japan", years_experience: 35 },
  { age: 31, country: "Poland", years_experience: 6 },
  { age: 40, country: "Canada", years_experience: 15 },
  { age: 22, country: "Nigeria", years_experience: 1 },
  { age: 48, country: "Australia", years_experience: 22 },
  { age: 55, country: "Mexico", years_experience: 30 },
  { age: 27, country: "United States", years_experience: 4 },
  { age: 36, country: "South Korea", years_experience: 10 },
  { age: 42, country: "France", years_experience: 18 },
  { age: 25, country: "Philippines", years_experience: 2 },
  { age: 50, country: "United States", years_experience: 25 },
  { age: 33, country: "Russia", years_experience: 9 },
  { age: 60, country: "Spain", years_experience: 38 },
  { age: 28, country: "United States", years_experience: 4 },
];

interface JobData {
  title: string;
  category: string;
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
  age: number;
  country: string;
  years_experience: number;
}

// Fetch recent tweets about this job + AI
async function fetchXData(jobTitle: string): Promise<string> {
  if (!X_BEARER_TOKEN) return "[X data unavailable - no bearer token]";

  // Create a search-friendly query: short job title + AI
  const shortTitle = jobTitle.split(",")[0].replace(/and /g, "").trim();
  const query = `("${shortTitle}" OR ${shortTitle.split(" ").slice(0, 2).join(" ")}) (AI OR automation OR "artificial intelligence" OR "replaced by") -is:retweet lang:en`;

  try {
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=10&tweet.fields=created_at,public_metrics,text`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` },
    });

    if (!res.ok) {
      return `[X API error: ${res.status}]`;
    }

    const data = await res.json();
    if (!data.data || data.data.length === 0) {
      return "[No recent X posts found about this job + AI]";
    }

    // Format top tweets
    const tweets = data.data.slice(0, 5).map((t: any, i: number) =>
      `${i + 1}. "${t.text.substring(0, 200)}${t.text.length > 200 ? "..." : ""}" (${t.public_metrics?.like_count || 0} likes)`
    );
    return `Recent X/Twitter posts about "${shortTitle}" and AI:\n${tweets.join("\n")}`;
  } catch (err: any) {
    return `[X fetch error: ${err.message}]`;
  }
}

// Fetch Reddit posts about this job + AI
async function fetchRedditData(jobTitle: string): Promise<string> {
  const shortTitle = jobTitle.split(",")[0].replace(/and /g, "").trim();
  const searchQuery = `${shortTitle} AI automation`;

  try {
    // Reddit's public JSON API (no auth needed)
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=relevance&t=year&limit=8`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "EscapePermanentUnderclass/1.0 (job risk assessment tool)",
      },
    });

    if (!res.ok) {
      return `[Reddit API error: ${res.status}]`;
    }

    const data = await res.json();
    const posts = data?.data?.children || [];

    if (posts.length === 0) {
      return "[No recent Reddit posts found about this job + AI]";
    }

    const formatted = posts.slice(0, 5).map((p: any, i: number) => {
      const post = p.data;
      const selftext = post.selftext ? post.selftext.substring(0, 150) : "";
      return `${i + 1}. r/${post.subreddit}: "${post.title}" (${post.score} upvotes, ${post.num_comments} comments)${selftext ? `\n   Preview: "${selftext}..."` : ""}`;
    });

    return `Recent Reddit discussions about "${shortTitle}" and AI:\n${formatted.join("\n")}`;
  } catch (err: any) {
    return `[Reddit fetch error: ${err.message}]`;
  }
}

async function generateSocialEnrichedReport(job: JobData, user: UserProfile, xData: string, redditData: string) {
  const prompt = `You are an expert career analyst specializing in AI's impact on the labor market. Generate a comprehensive, PERSONALIZED career risk report enriched with REAL-TIME social media sentiment data.

ABOUT THE PERSON:
- Age: ${user.age} years old
- Country of Residence: ${user.country}
- Years of Professional Experience: ${user.years_experience} years in this field

THEIR JOB:
- Job Title: "${job.title}" in the "${job.category}" sector
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

LIVE SOCIAL MEDIA SENTIMENT (use these as additional context — reference specific posts/themes where relevant):

${xData}

${redditData}

IMPORTANT REQUIREMENTS:
- Factor in the person's AGE, COUNTRY, and EXPERIENCE in all recommendations
- Reference relevant social media discussions where they add value — what real workers are saying about AI disruption in this field
- Include a "social_sentiment" section that summarizes the real-time discourse
- Make the report feel current and grounded in what's actually happening right now in the field

Generate the following sections as a JSON object:

1. "executive_summary": A 3-4 paragraph executive summary speaking DIRECTLY to this person. Reference their age, location, experience, AND what current social discourse reveals about AI's impact on their field. Include near-term (1-3 years), medium-term (3-7 years), and long-term (7-15 years) outlook.

2. "social_sentiment": An object with:
   - "overall_mood": "alarmed" | "concerned" | "mixed" | "cautiously_optimistic" | "confident" — based on the social media data
   - "key_themes": array of 3-5 themes emerging from social discussion (e.g., "growing use of AI coding assistants", "fear of layoffs")
   - "notable_quotes": 1-2 brief paraphrased insights from social posts that are particularly relevant
   - "sentiment_summary": 2-3 sentence summary of what people in this field are saying online about AI

3. "task_analysis": An array of 8-12 specific tasks, each with:
   - "task": task description
   - "automation_risk": "high" | "medium" | "low"
   - "timeline": estimated years until AI can handle this
   - "explanation": why this task is/isn't at risk

4. "career_pivot_plan": An object with:
   - "immediate_actions": array of 3-5 things to do right now (tailored to their profile)
   - "adjacent_roles": array of 3-5 related AI-resistant roles, each with "title", "why_safer", "transition_difficulty" (1-5)
   - "upskilling_path": array of 3-5 skills to develop, each with "skill", "importance" (1-10), "resources"

5. "skills_roadmap": An object with:
   - "current_strengths": skills that will remain valuable
   - "skills_to_develop": specific technical and soft skills needed
   - "timeline": month-by-month plan for 6 months

6. "asset_guidance": An object with (NO specific investment advice, no stock picks, no ETFs, no mutual funds):
   - "general_principles": 3-4 principles for positioning in an AI economy
   - "areas_of_focus": sectors/areas to build knowledge in
   - "avoid": common mistakes to avoid

7. "industry_outlook": A 2-3 paragraph analysis of how AI will reshape this industry, incorporating current social media sentiment and trends.

Return ONLY valid JSON, no markdown formatting.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
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
      parsed = JSON.parse(repaired);
    } catch (e2: any) {
      let lastValid = repaired;
      for (let end = repaired.length; end > 0; end--) {
        try {
          lastValid = repaired.substring(0, end);
          const ob = (lastValid.match(/{/g) || []).length - (lastValid.match(/}/g) || []).length;
          const obr = (lastValid.match(/\[/g) || []).length - (lastValid.match(/]/g) || []).length;
          const qc = (lastValid.match(/(?<!\\)"/g) || []).length;
          if (qc % 2 !== 0) lastValid += '"';
          for (let i = 0; i < obr; i++) lastValid += "]";
          for (let i = 0; i < ob; i++) lastValid += "}";
          parsed = JSON.parse(lastValid);
          break;
        } catch { continue; }
      }
      if (!parsed) throw e2;
    }
  }

  return {
    job: job.title,
    category: job.category,
    risk_score: job.ai_risk_score,
    user_profile: user,
    x_data_available: !xData.includes("unavailable") && !xData.includes("error") && !xData.includes("No recent"),
    reddit_data_available: !redditData.includes("error") && !redditData.includes("No recent"),
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
    report: parsed,
  };
}

function analyzeReport(result: any) {
  const r = result.report;
  const user = result.user_profile;
  const issues: string[] = [];
  const metrics: Record<string, any> = {};

  // Executive Summary
  let summaryText = r.executive_summary || "";
  if (typeof summaryText !== "string") summaryText = JSON.stringify(summaryText);
  const summaryWords = summaryText.split(/\s+/).length;
  metrics.summary_word_count = summaryWords;
  if (summaryWords < 150) issues.push(`Executive summary too short (${summaryWords} words)`);
  if (summaryWords > 600) issues.push(`Executive summary too long (${summaryWords} words)`);

  const summaryLower = summaryText.toLowerCase();
  const hasTimeline = summaryLower.includes("near-term") || summaryLower.includes("1-3 year") || summaryLower.includes("medium-term") || summaryLower.includes("3-7 year");
  if (!hasTimeline) issues.push("Executive summary missing timeline estimates");

  // PERSONALIZATION CHECKS
  const fullReportStr = JSON.stringify(r).toLowerCase();

  const mentionsAge = fullReportStr.includes(String(user.age)) ||
    fullReportStr.includes("your age") ||
    (user.age >= 50 && (fullReportStr.includes("retirement") || fullReportStr.includes("later career") || fullReportStr.includes("senior professional"))) ||
    (user.age <= 30 && (fullReportStr.includes("early career") || fullReportStr.includes("early-career") || fullReportStr.includes("young professional")));
  metrics.mentions_age = mentionsAge;
  if (!mentionsAge) issues.push("PERSONALIZATION: No age-related content detected");

  const countryLower = user.country.toLowerCase();
  const mentionsCountry = fullReportStr.includes(countryLower);
  metrics.mentions_country = mentionsCountry;
  if (!mentionsCountry) issues.push(`PERSONALIZATION: Country "${user.country}" not mentioned`);

  const mentionsExperience = fullReportStr.includes(String(user.years_experience)) ||
    fullReportStr.includes("years of experience") || fullReportStr.includes("years experience") ||
    fullReportStr.includes("decade") ||
    (user.years_experience >= 20 && fullReportStr.includes("extensive experience")) ||
    (user.years_experience <= 3 && (fullReportStr.includes("early career") || fullReportStr.includes("entry-level") || fullReportStr.includes("early-career")));
  metrics.mentions_experience = mentionsExperience;
  if (!mentionsExperience) issues.push("PERSONALIZATION: No experience-level content detected");

  metrics.personalization_score = [mentionsAge, mentionsCountry, mentionsExperience].filter(Boolean).length;

  // SOCIAL SENTIMENT CHECK
  const sentiment = r.social_sentiment;
  metrics.has_social_sentiment = !!sentiment;
  if (!sentiment) {
    issues.push("SOCIAL: Missing social_sentiment section entirely");
    metrics.social_quality_score = 0;
  } else {
    const hasOverallMood = !!sentiment.overall_mood;
    const hasKeyThemes = Array.isArray(sentiment.key_themes) && sentiment.key_themes.length >= 3;
    const hasNotableQuotes = Array.isArray(sentiment.notable_quotes) && sentiment.notable_quotes.length >= 1;
    const hasSentimentSummary = !!sentiment.sentiment_summary;

    if (!hasOverallMood) issues.push("SOCIAL: Missing overall_mood");
    if (!hasKeyThemes) issues.push("SOCIAL: Missing or insufficient key_themes");
    if (!hasNotableQuotes) issues.push("SOCIAL: Missing notable_quotes");
    if (!hasSentimentSummary) issues.push("SOCIAL: Missing sentiment_summary");

    metrics.social_quality_score = [hasOverallMood, hasKeyThemes, hasNotableQuotes, hasSentimentSummary].filter(Boolean).length;
    metrics.overall_mood = sentiment.overall_mood || "unknown";
    metrics.key_themes_count = sentiment.key_themes?.length || 0;
  }

  // Task Analysis
  const tasks = r.task_analysis || [];
  metrics.task_count = tasks.length;
  if (tasks.length < 8) issues.push(`Too few tasks (${tasks.length}, expected 8-12)`);
  if (tasks.length > 12) issues.push(`Too many tasks (${tasks.length}, expected 8-12)`);

  const riskDistribution = { high: 0, medium: 0, low: 0 };
  for (const t of tasks) {
    if (t.automation_risk) riskDistribution[t.automation_risk as keyof typeof riskDistribution]++;
  }
  metrics.risk_distribution = riskDistribution;

  // Career Pivot Plan
  const pivot = r.career_pivot_plan || {};
  metrics.immediate_actions_count = (pivot.immediate_actions || []).length;
  metrics.adjacent_roles_count = (pivot.adjacent_roles || []).length;
  metrics.upskilling_count = (pivot.upskilling_path || []).length;

  if ((pivot.immediate_actions || []).length < 3) issues.push("Too few immediate actions");
  if ((pivot.adjacent_roles || []).length < 3) issues.push("Too few adjacent roles");

  // Skills Roadmap
  const roadmap = r.skills_roadmap || {};
  metrics.has_timeline = !!roadmap.timeline;
  if (!metrics.has_timeline) issues.push("Missing 6-month timeline");

  // Asset Guidance
  const assets = r.asset_guidance || {};
  metrics.principles_count = (assets.general_principles || []).length;
  if ((assets.general_principles || []).length < 3) issues.push("Too few asset guidance principles");

  const assetStr = JSON.stringify(assets).toLowerCase();
  if (assetStr.includes("buy ") || assetStr.includes("invest in ") || assetStr.includes("stock") || assetStr.includes("etf") || assetStr.includes("mutual fund")) {
    issues.push("WARNING: Asset guidance may contain specific investment advice");
  }

  // Industry Outlook
  let outlookText = r.industry_outlook || "";
  if (typeof outlookText !== "string") outlookText = JSON.stringify(outlookText);
  const outlookWords = outlookText.split(/\s+/).length;
  metrics.outlook_word_count = outlookWords;
  if (outlookWords < 100) issues.push(`Industry outlook too short (${outlookWords} words)`);

  const totalJson = JSON.stringify(r);
  metrics.total_chars = totalJson.length;
  metrics.issue_count = issues.length;

  return { metrics, issues };
}

async function main() {
  console.log("=== SOCIAL-ENRICHED REPORT GENERATION TEST: 20 JOBS ===\n");
  console.log(`Starting at: ${new Date().toISOString()}`);
  console.log(`X Bearer Token: ${X_BEARER_TOKEN ? "✓ Available" : "✗ Missing"}\n`);

  // Phase 1: Fetch social data for all jobs
  console.log("--- Phase 1: Fetching social data ---\n");
  const socialData: { x: string; reddit: string }[] = [];

  for (let i = 0; i < TEST_JOBS.length; i++) {
    const job = TEST_JOBS[i];
    process.stdout.write(`[${i + 1}/20] Fetching for: ${job.title}... `);

    const [xData, redditData] = await Promise.all([
      fetchXData(job.title),
      fetchRedditData(job.title),
    ]);

    const xStatus = xData.includes("error") || xData.includes("unavailable") || xData.includes("No recent") ? "✗" : "✓";
    const rStatus = redditData.includes("error") || redditData.includes("No recent") ? "✗" : "✓";
    console.log(`X:${xStatus} Reddit:${rStatus}`);
    socialData.push({ x: xData, reddit: redditData });

    // Small delay to respect rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  const xAvailable = socialData.filter(s => !s.x.includes("error") && !s.x.includes("unavailable") && !s.x.includes("No recent")).length;
  const rAvailable = socialData.filter(s => !s.reddit.includes("error") && !s.reddit.includes("No recent")).length;
  console.log(`\nSocial data summary: X posts found for ${xAvailable}/20 jobs, Reddit posts found for ${rAvailable}/20 jobs\n`);

  // Phase 2: Generate reports
  console.log("--- Phase 2: Generating reports ---\n");
  const results: any[] = [];
  const errors: { job: string; error: string }[] = [];

  for (let i = 0; i < TEST_JOBS.length; i++) {
    const job = TEST_JOBS[i];
    const user = USER_PROFILES[i];
    const social = socialData[i];
    const riskLabel = job.ai_risk_score >= 7 ? "HIGH" : job.ai_risk_score >= 4 ? "MED" : "LOW";
    console.log(`[${i + 1}/20] ${job.title} (${riskLabel}) | age ${user.age}, ${user.country}, ${user.years_experience}yr...`);

    try {
      const start = Date.now();
      const result = await generateSocialEnrichedReport(job, user, social.x, social.reddit);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ✓ Done in ${elapsed}s | Tokens: ${result.input_tokens}→${result.output_tokens} | X:${result.x_data_available ? "✓" : "✗"} Reddit:${result.reddit_data_available ? "✓" : "✗"}`);
      results.push(result);
    } catch (err: any) {
      console.log(`  ✗ FAILED: ${err.message}`);
      errors.push({ job: job.title, error: err.message });
    }
  }

  console.log(`\n=== GENERATION COMPLETE ===`);
  console.log(`Success: ${results.length}/20 | Failed: ${errors.length}/20\n`);

  // Analyze
  console.log("=== QUALITY ANALYSIS ===\n");
  const allAnalyses: any[] = [];

  for (const result of results) {
    const analysis = analyzeReport(result);
    allAnalyses.push({ ...result, analysis });

    const riskLabel = result.risk_score >= 7 ? "HIGH" : result.risk_score >= 4 ? "MED " : "LOW ";
    const u = result.user_profile;
    const pScore = analysis.metrics.personalization_score;
    const sScore = analysis.metrics.social_quality_score;
    console.log(`[${riskLabel} ${result.risk_score}] ${result.job} | P:${pScore}/3 S:${sScore}/4 | mood: ${analysis.metrics.overall_mood || "N/A"}`);
    console.log(`  Summary: ${analysis.metrics.summary_word_count}w | Tasks: ${analysis.metrics.task_count} | Outlook: ${analysis.metrics.outlook_word_count}w | Size: ${(analysis.metrics.total_chars / 1024).toFixed(1)}KB`);
    console.log(`  Person: age ${u.age}, ${u.country}, ${u.years_experience}yr | Age:${analysis.metrics.mentions_age ? "✓" : "✗"} Country:${analysis.metrics.mentions_country ? "✓" : "✗"} Exp:${analysis.metrics.mentions_experience ? "✓" : "✗"}`);

    if (analysis.issues.length > 0) {
      const nonWarning = analysis.issues.filter((i: string) => !i.startsWith("WARNING"));
      if (nonWarning.length > 0) {
        console.log(`  Issues: ${nonWarning.join("; ")}`);
      }
    }
    console.log();
  }

  // Aggregate
  console.log("=== AGGREGATE STATISTICS ===\n");
  const allMetrics = allAnalyses.map(a => a.analysis.metrics);
  const avg = (arr: number[]) => arr.length ? (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1) : "N/A";

  const summaryWords = allMetrics.map(m => m.summary_word_count);
  const taskCounts = allMetrics.map(m => m.task_count);
  const outlookWords = allMetrics.map(m => m.outlook_word_count);
  const totalChars = allMetrics.map(m => m.total_chars);
  const issueCounts = allMetrics.map(m => m.issue_count);
  const pScores = allMetrics.map(m => m.personalization_score);
  const sScores = allMetrics.map(m => m.social_quality_score);

  console.log(`Avg Summary Words:      ${avg(summaryWords)}`);
  console.log(`Avg Task Count:         ${avg(taskCounts)}`);
  console.log(`Avg Outlook Words:      ${avg(outlookWords)}`);
  console.log(`Avg Report Size:        ${avg(totalChars.map(c => c/1024))}KB`);
  console.log(`Avg Issues:             ${avg(issueCounts)}`);
  console.log(`Personalization Score:  ${avg(pScores)}/3 (${pScores.filter(s => s === 3).length} perfect)`);
  console.log(`Social Quality Score:   ${avg(sScores)}/4 (${sScores.filter(s => s === 4).length} perfect)`);

  // Sentiment distribution
  const moodCounts: Record<string, number> = {};
  for (const m of allMetrics) {
    const mood = m.overall_mood || "unknown";
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  }
  console.log(`\nSentiment Distribution:`);
  for (const [mood, count] of Object.entries(moodCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${mood}: ${count}`);
  }

  // Token usage
  const inputTokens = results.map(r => r.input_tokens);
  const outputTokens = results.map(r => r.output_tokens);
  const inputCost = inputTokens.reduce((s, v) => s + v, 0) * 0.25 / 1_000_000;
  const outputCost = outputTokens.reduce((s, v) => s + v, 0) * 1.25 / 1_000_000;
  console.log(`\nToken Usage:`);
  console.log(`  Input:  avg=${avg(inputTokens)}, total=${inputTokens.reduce((s, v) => s + v, 0)}`);
  console.log(`  Output: avg=${avg(outputTokens)}, total=${outputTokens.reduce((s, v) => s + v, 0)}`);
  console.log(`  Cost per 20: $${(inputCost + outputCost).toFixed(4)}`);
  console.log(`  Cost per report: $${((inputCost + outputCost) / 20).toFixed(4)}`);

  // Save
  const outputPath = "/Users/ramsfund/escapepermanentunderclass/scripts/test-reports-social-output.json";
  fs.writeFileSync(outputPath, JSON.stringify(allAnalyses, null, 2));
  console.log(`\nFull results saved to: ${outputPath}`);

  // 3-WAY COMPARISON
  console.log("\n=== 3-WAY COMPARISON ===\n");
  const baselinePath = "/Users/ramsfund/escapepermanentunderclass/scripts/test-reports-output.json";
  const personalizedPath = "/Users/ramsfund/escapepermanentunderclass/scripts/test-reports-personalized-output.json";

  const hasBaseline = fs.existsSync(baselinePath);
  const hasPersonalized = fs.existsSync(personalizedPath);

  if (hasBaseline && hasPersonalized) {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf-8"));
    const personalized = JSON.parse(fs.readFileSync(personalizedPath, "utf-8"));
    const bm = baseline.map((b: any) => b.analysis.metrics);
    const pm = personalized.map((p: any) => p.analysis.metrics);

    console.log("Metric                 | Baseline  | Personal. | Social+P  ");
    console.log("-----------------------|-----------|-----------|----------");
    console.log(`Avg Summary Words      | ${avg(bm.map((m: any) => m.summary_word_count)).padStart(9)} | ${avg(pm.map((m: any) => m.summary_word_count)).padStart(9)} | ${avg(summaryWords).padStart(9)}`);
    console.log(`Avg Task Count         | ${avg(bm.map((m: any) => m.task_count)).padStart(9)} | ${avg(pm.map((m: any) => m.task_count)).padStart(9)} | ${avg(taskCounts).padStart(9)}`);
    console.log(`Avg Outlook Words      | ${avg(bm.map((m: any) => m.outlook_word_count)).padStart(9)} | ${avg(pm.map((m: any) => m.outlook_word_count)).padStart(9)} | ${avg(outlookWords).padStart(9)}`);
    console.log(`Avg Report Size (KB)   | ${avg(bm.map((m: any) => m.total_chars / 1024)).padStart(9)} | ${avg(pm.map((m: any) => m.total_chars / 1024)).padStart(9)} | ${avg(totalChars.map(c => c/1024)).padStart(9)}`);
    console.log(`Avg Issues             | ${avg(bm.map((m: any) => m.issue_count)).padStart(9)} | ${avg(pm.map((m: any) => m.issue_count)).padStart(9)} | ${avg(issueCounts).padStart(9)}`);
    console.log(`Personalization (0-3)  | ${"N/A".padStart(9)} | ${avg(pm.map((m: any) => m.personalization_score)).padStart(9)} | ${avg(pScores).padStart(9)}`);
    console.log(`Social Quality (0-4)   | ${"N/A".padStart(9)} | ${"N/A".padStart(9)} | ${avg(sScores).padStart(9)}`);

    // Cost comparison
    const bTokens = baseline.map((b: any) => b.input_tokens * 0.25 / 1_000_000 + b.output_tokens * 1.25 / 1_000_000);
    const pTokens = personalized.map((p: any) => p.input_tokens * 0.25 / 1_000_000 + p.output_tokens * 1.25 / 1_000_000);
    const sTokens = results.map((r: any) => r.input_tokens * 0.25 / 1_000_000 + r.output_tokens * 1.25 / 1_000_000);

    console.log(`Cost per report        | $${avg(bTokens.map((t: number) => t * 10000)).padStart(7)}/1k | $${avg(pTokens.map((t: number) => t * 10000)).padStart(7)}/1k | $${avg(sTokens.map(t => t * 10000)).padStart(7)}/1k`);
    console.log(`                       | $${(bTokens.reduce((s: number, v: number) => s + v, 0) / 20).toFixed(4).padStart(8)} | $${(pTokens.reduce((s: number, v: number) => s + v, 0) / 20).toFixed(4).padStart(8)} | $${((inputCost + outputCost) / 20).toFixed(4).padStart(8)}`);
  } else {
    console.log("Missing baseline or personalized output files for comparison.");
  }
}

main().catch(console.error);
