import { createServiceClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { jobId, email, paymentId } = await request.json();

    if (!jobId || !email) {
      return NextResponse.json(
        { error: "Missing jobId or email" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Idempotency check: if report already exists for this payment, return it
    if (paymentId) {
      const { data: existing } = await supabase
        .from("reports")
        .select("slug, status")
        .eq("stripe_payment_id", paymentId)
        .single();

      if (existing) {
        return NextResponse.json({
          reportUrl: `/report/${existing.slug}`,
          slug: existing.slug,
          status: existing.status,
        });
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
        amount_paid: 2999,
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

    // Generate report content with Claude Haiku
    const reportContent = await generateReport(job);

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
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", report.id);

    if (updateError) {
      console.error("Report update error:", updateError);
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

async function generateReport(job: JobData) {
  const prompt = `You are an expert career analyst specializing in AI's impact on the labor market. Generate a comprehensive career risk report for someone working as a "${job.title}" in the "${job.category}" sector.

Job Data:
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

Generate the following sections as a JSON object:

1. "executive_summary": A 3-4 paragraph executive summary of the AI displacement risk for this role. Be specific about which aspects of the job are most vulnerable and which are most resilient. Include a timeline estimate (near-term 1-3 years, medium-term 3-7 years, long-term 7-15 years).

2. "task_analysis": An array of 8-12 specific tasks this role performs, each with:
   - "task": task description
   - "automation_risk": "high" | "medium" | "low"
   - "timeline": estimated years until AI can handle this
   - "explanation": why this task is/isn't at risk

3. "career_pivot_plan": An object with:
   - "immediate_actions": array of 3-5 things to do right now
   - "adjacent_roles": array of 3-5 related roles that are more AI-resistant, each with "title", "why_safer", "transition_difficulty" (1-5)
   - "upskilling_path": array of 3-5 skills to develop, each with "skill", "importance" (1-10), "resources"

4. "skills_roadmap": An object with:
   - "current_strengths": skills from this role that will remain valuable
   - "skills_to_develop": specific technical and soft skills needed
   - "timeline": month-by-month plan for the first 6 months

5. "asset_guidance": An object with (NO specific investment advice, only general strategic positioning):
   - "general_principles": 3-4 principles for positioning in an AI economy
   - "areas_of_focus": sectors/areas to build knowledge in
   - "avoid": common mistakes to avoid

6. "industry_outlook": A 2-3 paragraph analysis of how AI will reshape this industry over the next decade.

Return ONLY valid JSON, no markdown formatting.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    // Try to parse JSON, handle potential markdown wrapping
    const jsonStr = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(jsonStr);
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
