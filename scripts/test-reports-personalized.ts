// Test script: Generate 20 PERSONALIZED reports (same jobs as baseline) and compare
// Usage: npx tsx scripts/test-reports-personalized.ts

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// Load .env.local for API key
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

// Same 20 jobs as baseline test - NOW with random user profiles
const TEST_JOBS = [
  // HIGH RISK (7+)
  { title: "Telemarketers", category: "Sales", ai_risk_score: 8.8, task_automation_score: 8.5, cognitive_exposure_score: 7.2, physical_requirement_score: 1.5, creativity_score: 2.0, social_intelligence_score: 3.5, regulatory_barrier_score: 1.8, median_salary: 29600, employment_count: 130000, growth_projection: -18.7 },
  { title: "Bookkeeping, Accounting, and Auditing Clerks", category: "Finance & Accounting", ai_risk_score: 7.8, task_automation_score: 8.0, cognitive_exposure_score: 7.5, physical_requirement_score: 1.2, creativity_score: 2.5, social_intelligence_score: 2.8, regulatory_barrier_score: 3.0, median_salary: 45860, employment_count: 1500000, growth_projection: -5.2 },
  { title: "Data Entry Keyers", category: "Office & Administrative", ai_risk_score: 8.5, task_automation_score: 9.0, cognitive_exposure_score: 6.5, physical_requirement_score: 1.5, creativity_score: 1.5, social_intelligence_score: 1.8, regulatory_barrier_score: 1.2, median_salary: 35850, employment_count: 152000, growth_projection: -25.6 },
  { title: "Insurance Appraisers, Auto Damage", category: "Finance & Accounting", ai_risk_score: 5.0, task_automation_score: 5.5, cognitive_exposure_score: 5.2, physical_requirement_score: 3.5, creativity_score: 3.0, social_intelligence_score: 4.0, regulatory_barrier_score: 4.5, median_salary: 71800, employment_count: 14800, growth_projection: -6.0 },
  { title: "Logisticians", category: "Finance & Accounting", ai_risk_score: 7.1, task_automation_score: 7.0, cognitive_exposure_score: 7.5, physical_requirement_score: 1.5, creativity_score: 3.5, social_intelligence_score: 4.0, regulatory_barrier_score: 2.5, median_salary: 77520, employment_count: 198000, growth_projection: 18.0 },

  // MEDIUM RISK (4-7)
  { title: "Software Developers", category: "Technology", ai_risk_score: 4.8, task_automation_score: 4.5, cognitive_exposure_score: 7.0, physical_requirement_score: 1.2, creativity_score: 7.5, social_intelligence_score: 5.0, regulatory_barrier_score: 2.0, median_salary: 127260, employment_count: 1795300, growth_projection: 25.7 },
  { title: "Registered Nurses", category: "Healthcare", ai_risk_score: 3.2, task_automation_score: 3.0, cognitive_exposure_score: 4.5, physical_requirement_score: 6.5, creativity_score: 5.5, social_intelligence_score: 8.5, regulatory_barrier_score: 8.0, median_salary: 81220, employment_count: 3175390, growth_projection: 5.6 },
  { title: "Graphic Designers", category: "Arts & Design", ai_risk_score: 6.2, task_automation_score: 5.5, cognitive_exposure_score: 6.8, physical_requirement_score: 1.2, creativity_score: 8.0, social_intelligence_score: 5.0, regulatory_barrier_score: 1.5, median_salary: 57990, employment_count: 263900, growth_projection: 2.7 },
  { title: "Paralegals and Legal Assistants", category: "Legal", ai_risk_score: 6.5, task_automation_score: 6.8, cognitive_exposure_score: 7.0, physical_requirement_score: 1.2, creativity_score: 3.5, social_intelligence_score: 5.0, regulatory_barrier_score: 5.0, median_salary: 59200, employment_count: 345000, growth_projection: 4.0 },
  { title: "Real Estate Agents", category: "Sales", ai_risk_score: 5.5, task_automation_score: 5.0, cognitive_exposure_score: 5.5, physical_requirement_score: 3.0, creativity_score: 4.5, social_intelligence_score: 7.5, regulatory_barrier_score: 5.5, median_salary: 52030, employment_count: 168740, growth_projection: 3.0 },
  { title: "Market Research Analysts and Marketing Specialists", category: "Finance & Accounting", ai_risk_score: 4.5, task_automation_score: 5.0, cognitive_exposure_score: 6.5, physical_requirement_score: 1.2, creativity_score: 6.0, social_intelligence_score: 5.5, regulatory_barrier_score: 1.5, median_salary: 68230, employment_count: 792000, growth_projection: 13.0 },
  { title: "Truck Drivers, Heavy and Tractor-Trailer", category: "Transportation", ai_risk_score: 6.0, task_automation_score: 6.5, cognitive_exposure_score: 3.0, physical_requirement_score: 5.5, creativity_score: 2.0, social_intelligence_score: 3.0, regulatory_barrier_score: 6.0, median_salary: 49920, employment_count: 2100000, growth_projection: 4.0 },

  // LOW RISK (under 4)
  { title: "Surgeons", category: "Healthcare", ai_risk_score: 2.0, task_automation_score: 1.5, cognitive_exposure_score: 4.0, physical_requirement_score: 7.5, creativity_score: 8.0, social_intelligence_score: 8.0, regulatory_barrier_score: 9.5, median_salary: 251890, employment_count: 36100, growth_projection: 3.0 },
  { title: "Mental Health Counselors", category: "Healthcare", ai_risk_score: 2.5, task_automation_score: 1.8, cognitive_exposure_score: 3.5, physical_requirement_score: 1.5, creativity_score: 7.0, social_intelligence_score: 9.5, regulatory_barrier_score: 7.5, median_salary: 53710, employment_count: 373000, growth_projection: 22.0 },
  { title: "Electricians", category: "Construction & Extraction", ai_risk_score: 2.3, task_automation_score: 2.0, cognitive_exposure_score: 2.5, physical_requirement_score: 8.0, creativity_score: 5.0, social_intelligence_score: 4.5, regulatory_barrier_score: 7.0, median_salary: 60240, employment_count: 728800, growth_projection: 6.0 },
  { title: "Firefighters", category: "Protective Service", ai_risk_score: 2.1, task_automation_score: 1.5, cognitive_exposure_score: 2.0, physical_requirement_score: 9.0, creativity_score: 5.0, social_intelligence_score: 7.0, regulatory_barrier_score: 8.0, median_salary: 51680, employment_count: 330800, growth_projection: 4.0 },
  { title: "Elementary School Teachers", category: "Education & Training", ai_risk_score: 3.0, task_automation_score: 2.5, cognitive_exposure_score: 4.0, physical_requirement_score: 3.5, creativity_score: 7.0, social_intelligence_score: 9.0, regulatory_barrier_score: 7.5, median_salary: 61690, employment_count: 1359300, growth_projection: 1.0 },
  { title: "Plumbers, Pipefitters, and Steamfitters", category: "Construction & Extraction", ai_risk_score: 2.2, task_automation_score: 1.8, cognitive_exposure_score: 2.0, physical_requirement_score: 8.5, creativity_score: 4.5, social_intelligence_score: 4.0, regulatory_barrier_score: 7.0, median_salary: 59880, employment_count: 496100, growth_projection: 2.0 },

  // EDGE CASES
  { title: "Farmers, Ranchers, and Other Agricultural Managers", category: "Management", ai_risk_score: 2.7, task_automation_score: 3.5, cognitive_exposure_score: 3.0, physical_requirement_score: 7.5, creativity_score: 5.0, social_intelligence_score: 5.0, regulatory_barrier_score: 4.0, median_salary: 73060, employment_count: 963600, growth_projection: -1.0 },
  { title: "Compensation, Benefits, and Job Analysis Specialists", category: "Finance & Accounting", ai_risk_score: 7.4, task_automation_score: 7.5, cognitive_exposure_score: 7.8, physical_requirement_score: 1.2, creativity_score: 3.0, social_intelligence_score: 4.5, regulatory_barrier_score: 4.0, median_salary: 67190, employment_count: 90800, growth_projection: 6.0 },
];

// Random user profiles — diverse ages, countries, experience levels
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

async function generatePersonalizedReport(job: JobData, user: UserProfile) {
  const prompt = `You are an expert career analyst specializing in AI's impact on the labor market. Generate a comprehensive, PERSONALIZED career risk report for a specific individual.

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

IMPORTANT PERSONALIZATION REQUIREMENTS:
- Factor in the person's AGE when discussing timelines. A 55-year-old has different urgency than a 25-year-old. Consider years until typical retirement.
- Factor in their COUNTRY — mention local job market conditions, labor laws, AI adoption rates, regional industry trends, and local resources. If not in the US, adjust salary expectations and job market data accordingly.
- Factor in YEARS OF EXPERIENCE — a senior professional has different pivot options than someone early-career. Leverage their accumulated expertise in recommendations.
- Make the executive summary speak directly to this person's specific situation.
- Tailor career pivot suggestions to be realistic given their age and experience level.
- Include country-specific upskilling resources where possible.

Generate the following sections as a JSON object:

1. "executive_summary": A 3-4 paragraph executive summary speaking DIRECTLY to this person. Reference their age, location, and experience. Be specific about their timeline and urgency level. Include near-term (1-3 years), medium-term (3-7 years), and long-term (7-15 years) outlook tailored to their career stage.

2. "task_analysis": An array of 8-12 specific tasks this role performs, each with:
   - "task": task description
   - "automation_risk": "high" | "medium" | "low"
   - "timeline": estimated years until AI can handle this
   - "explanation": why this task is/isn't at risk (reference regional context where relevant)

3. "career_pivot_plan": An object with:
   - "immediate_actions": array of 3-5 things to do right now (tailored to their experience level and country)
   - "adjacent_roles": array of 3-5 related roles that are more AI-resistant, each with "title", "why_safer", "transition_difficulty" (1-5). Consider realistic transitions given age and experience.
   - "upskilling_path": array of 3-5 skills to develop, each with "skill", "importance" (1-10), "resources" (include country-specific resources where possible)

4. "skills_roadmap": An object with:
   - "current_strengths": skills from this role AND their experience level that will remain valuable
   - "skills_to_develop": specific technical and soft skills needed (consider their learning context)
   - "timeline": month-by-month plan for the first 6 months (realistic for their schedule/life stage)

5. "asset_guidance": An object with (NO specific investment advice, no stock picks, no ETFs, no mutual funds — only general strategic career and financial positioning):
   - "general_principles": 3-4 principles for positioning in an AI economy (country-aware)
   - "areas_of_focus": sectors/areas to build knowledge in (relevant to their region)
   - "avoid": common mistakes to avoid (including age-specific and country-specific pitfalls)

6. "industry_outlook": A 2-3 paragraph analysis of how AI will reshape this industry, with specific mention of how it applies in ${user.country} and what it means for someone at the ${user.years_experience > 15 ? "senior" : user.years_experience > 5 ? "mid-career" : "early-career"} stage.

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
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
    report: parsed,
  };
}

// Analyze a single report — same metrics as baseline PLUS personalization checks
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

  // Check for timeline mentions
  const summaryLower = summaryText.toLowerCase();
  const hasTimeline = summaryLower.includes("near-term") || summaryLower.includes("1-3 year") || summaryLower.includes("medium-term") || summaryLower.includes("3-7 year");
  if (!hasTimeline) issues.push("Executive summary missing timeline estimates");

  // PERSONALIZATION CHECKS
  const fullReportStr = JSON.stringify(r).toLowerCase();

  // Check if age is mentioned or referenced
  const mentionsAge = fullReportStr.includes(String(user.age)) ||
    fullReportStr.includes("your age") ||
    (user.age >= 50 && (fullReportStr.includes("retirement") || fullReportStr.includes("later career") || fullReportStr.includes("senior professional"))) ||
    (user.age <= 30 && (fullReportStr.includes("early career") || fullReportStr.includes("early-career") || fullReportStr.includes("young professional")));
  metrics.mentions_age = mentionsAge;
  if (!mentionsAge) issues.push("PERSONALIZATION: No age-related content detected");

  // Check if country is mentioned
  const countryLower = user.country.toLowerCase();
  const mentionsCountry = fullReportStr.includes(countryLower);
  metrics.mentions_country = mentionsCountry;
  if (!mentionsCountry) issues.push(`PERSONALIZATION: Country "${user.country}" not mentioned in report`);

  // Check if experience level is referenced
  const mentionsExperience = fullReportStr.includes(String(user.years_experience)) ||
    fullReportStr.includes("years of experience") ||
    fullReportStr.includes("years experience") ||
    fullReportStr.includes("decade") ||
    (user.years_experience >= 20 && fullReportStr.includes("extensive experience")) ||
    (user.years_experience <= 3 && (fullReportStr.includes("early career") || fullReportStr.includes("entry-level") || fullReportStr.includes("early-career")));
  metrics.mentions_experience = mentionsExperience;
  if (!mentionsExperience) issues.push("PERSONALIZATION: No experience-level content detected");

  metrics.personalization_score = [mentionsAge, mentionsCountry, mentionsExperience].filter(Boolean).length;

  // Task Analysis
  const tasks = r.task_analysis || [];
  metrics.task_count = tasks.length;
  if (tasks.length < 8) issues.push(`Too few tasks (${tasks.length}, expected 8-12)`);
  if (tasks.length > 12) issues.push(`Too many tasks (${tasks.length}, expected 8-12)`);

  const riskDistribution = { high: 0, medium: 0, low: 0 };
  for (const t of tasks) {
    if (t.automation_risk) riskDistribution[t.automation_risk as keyof typeof riskDistribution]++;
    if (!t.explanation || t.explanation.split(/\s+/).length < 10) {
      issues.push(`Task "${t.task?.substring(0, 40)}..." has weak explanation`);
    }
  }
  metrics.risk_distribution = riskDistribution;

  const highRatio = riskDistribution.high / (tasks.length || 1);
  if (result.risk_score >= 7 && highRatio < 0.4) issues.push("High-risk job but few high-risk tasks");
  if (result.risk_score <= 3 && highRatio > 0.3) issues.push("Low-risk job but many high-risk tasks");

  // Career Pivot Plan
  const pivot = r.career_pivot_plan || {};
  metrics.immediate_actions_count = (pivot.immediate_actions || []).length;
  metrics.adjacent_roles_count = (pivot.adjacent_roles || []).length;
  metrics.upskilling_count = (pivot.upskilling_path || []).length;

  if ((pivot.immediate_actions || []).length < 3) issues.push("Too few immediate actions");
  if ((pivot.adjacent_roles || []).length < 3) issues.push("Too few adjacent roles");
  if ((pivot.upskilling_path || []).length < 3) issues.push("Too few upskilling suggestions");

  for (const role of pivot.adjacent_roles || []) {
    if (!role.title || !role.why_safer) issues.push(`Adjacent role missing fields: ${JSON.stringify(role).substring(0, 50)}`);
  }

  // Skills Roadmap
  const roadmap = r.skills_roadmap || {};
  metrics.has_current_strengths = !!(roadmap.current_strengths && (Array.isArray(roadmap.current_strengths) ? roadmap.current_strengths.length > 0 : true));
  metrics.has_skills_to_develop = !!(roadmap.skills_to_develop && (Array.isArray(roadmap.skills_to_develop) ? roadmap.skills_to_develop.length > 0 : true));
  metrics.has_timeline = !!roadmap.timeline;

  if (!metrics.has_current_strengths) issues.push("Missing current strengths");
  if (!metrics.has_skills_to_develop) issues.push("Missing skills to develop");
  if (!metrics.has_timeline) issues.push("Missing 6-month timeline");

  // Asset Guidance
  const assets = r.asset_guidance || {};
  metrics.principles_count = (assets.general_principles || []).length;
  metrics.focus_areas_count = (assets.areas_of_focus || []).length;
  metrics.avoid_count = (assets.avoid || []).length;

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

  // Total content size
  const totalJson = JSON.stringify(r);
  metrics.total_chars = totalJson.length;
  metrics.issue_count = issues.length;

  return { metrics, issues };
}

async function main() {
  console.log("=== PERSONALIZED REPORT GENERATION TEST: 20 JOBS ===\n");
  console.log(`Starting at: ${new Date().toISOString()}\n`);

  const results: any[] = [];
  const errors: { job: string; error: string }[] = [];

  for (let i = 0; i < TEST_JOBS.length; i++) {
    const job = TEST_JOBS[i];
    const user = USER_PROFILES[i];
    const riskLabel = job.ai_risk_score >= 7 ? "HIGH" : job.ai_risk_score >= 4 ? "MED" : "LOW";
    console.log(`[${i + 1}/20] Generating: ${job.title} (Risk: ${job.ai_risk_score} ${riskLabel}) | Person: age ${user.age}, ${user.country}, ${user.years_experience}yr exp...`);

    try {
      const start = Date.now();
      const result = await generatePersonalizedReport(job, user);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ✓ Done in ${elapsed}s | Tokens: ${result.input_tokens}→${result.output_tokens}`);
      results.push(result);
    } catch (err: any) {
      console.log(`  ✗ FAILED: ${err.message}`);
      errors.push({ job: job.title, error: err.message });
    }
  }

  console.log(`\n=== GENERATION COMPLETE ===`);
  console.log(`Success: ${results.length}/20 | Failed: ${errors.length}/20\n`);

  // Analyze all reports
  console.log("=== QUALITY ANALYSIS ===\n");

  const allAnalyses: any[] = [];

  for (const result of results) {
    const analysis = analyzeReport(result);
    allAnalyses.push({ ...result, analysis });

    const riskLabel = result.risk_score >= 7 ? "HIGH" : result.risk_score >= 4 ? "MED " : "LOW ";
    const u = result.user_profile;
    const pScore = analysis.metrics.personalization_score;
    const pIcon = pScore === 3 ? "★" : pScore === 2 ? "☆" : "✗";
    const issueIcon = analysis.issues.length === 0 ? "✓" : analysis.issues.length <= 2 ? "~" : "✗";
    console.log(`${issueIcon} [${riskLabel} ${result.risk_score}] ${result.job} | ${pIcon} Personalized ${pScore}/3 (age ${u.age}, ${u.country}, ${u.years_experience}yr)`);
    console.log(`  Summary: ${analysis.metrics.summary_word_count}w | Tasks: ${analysis.metrics.task_count} (H:${analysis.metrics.risk_distribution.high} M:${analysis.metrics.risk_distribution.medium} L:${analysis.metrics.risk_distribution.low}) | Outlook: ${analysis.metrics.outlook_word_count}w`);
    console.log(`  Actions: ${analysis.metrics.immediate_actions_count} | Roles: ${analysis.metrics.adjacent_roles_count} | Skills: ${analysis.metrics.upskilling_count} | Total: ${(analysis.metrics.total_chars / 1024).toFixed(1)}KB`);
    console.log(`  Personalization: Age=${analysis.metrics.mentions_age ? "✓" : "✗"} Country=${analysis.metrics.mentions_country ? "✓" : "✗"} Experience=${analysis.metrics.mentions_experience ? "✓" : "✗"}`);

    if (analysis.issues.length > 0) {
      console.log(`  Issues (${analysis.issues.length}):`);
      for (const issue of analysis.issues) {
        console.log(`    - ${issue}`);
      }
    }
    console.log();
  }

  // Aggregate statistics
  console.log("=== AGGREGATE STATISTICS ===\n");

  const allMetrics = allAnalyses.map(a => a.analysis.metrics);
  const avg = (arr: number[]) => arr.length ? (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1) : "N/A";
  const min = (arr: number[]) => arr.length ? Math.min(...arr) : 0;
  const max = (arr: number[]) => arr.length ? Math.max(...arr) : 0;

  const summaryWords = allMetrics.map(m => m.summary_word_count);
  const taskCounts = allMetrics.map(m => m.task_count);
  const outlookWords = allMetrics.map(m => m.outlook_word_count);
  const totalChars = allMetrics.map(m => m.total_chars);
  const issueCounts = allMetrics.map(m => m.issue_count);
  const personalizationScores = allMetrics.map(m => m.personalization_score);

  console.log(`Executive Summary Words:  avg=${avg(summaryWords)}, min=${min(summaryWords)}, max=${max(summaryWords)}`);
  console.log(`Task Count:               avg=${avg(taskCounts)}, min=${min(taskCounts)}, max=${max(taskCounts)}`);
  console.log(`Industry Outlook Words:   avg=${avg(outlookWords)}, min=${min(outlookWords)}, max=${max(outlookWords)}`);
  console.log(`Total Report Size:        avg=${avg(totalChars.map(c => c/1024))}KB, min=${(min(totalChars)/1024).toFixed(1)}KB, max=${(max(totalChars)/1024).toFixed(1)}KB`);
  console.log(`Quality Issues Per Report: avg=${avg(issueCounts)}, min=${min(issueCounts)}, max=${max(issueCounts)}`);
  console.log(`Zero-Issue Reports:       ${issueCounts.filter(c => c === 0).length}/${results.length}`);

  // PERSONALIZATION STATS
  console.log(`\n=== PERSONALIZATION STATS ===\n`);
  console.log(`Personalization Score:    avg=${avg(personalizationScores)}/3`);
  console.log(`  Mentions Age:           ${allMetrics.filter(m => m.mentions_age).length}/${results.length}`);
  console.log(`  Mentions Country:       ${allMetrics.filter(m => m.mentions_country).length}/${results.length}`);
  console.log(`  Mentions Experience:    ${allMetrics.filter(m => m.mentions_experience).length}/${results.length}`);
  console.log(`  Perfect Score (3/3):    ${personalizationScores.filter(s => s === 3).length}/${results.length}`);

  // Common issues
  const issueTally: Record<string, number> = {};
  for (const a of allAnalyses) {
    for (const issue of a.analysis.issues) {
      const key = issue.replace(/\d+/g, 'N').replace(/"[^"]*"/g, '"..."');
      issueTally[key] = (issueTally[key] || 0) + 1;
    }
  }

  console.log(`\nMost Common Issues:`);
  const sortedIssues = Object.entries(issueTally).sort((a, b) => b[1] - a[1]);
  for (const [issue, count] of sortedIssues.slice(0, 10)) {
    console.log(`  ${count}x ${issue}`);
  }

  // Token usage
  const inputTokens = results.map(r => r.input_tokens);
  const outputTokens = results.map(r => r.output_tokens);
  console.log(`\nToken Usage:`);
  console.log(`  Input:  avg=${avg(inputTokens)}, total=${inputTokens.reduce((s, v) => s + v, 0)}`);
  console.log(`  Output: avg=${avg(outputTokens)}, total=${outputTokens.reduce((s, v) => s + v, 0)}`);

  // Save full results
  const outputPath = "/Users/ramsfund/escapepermanentunderclass/scripts/test-reports-personalized-output.json";
  fs.writeFileSync(outputPath, JSON.stringify(allAnalyses, null, 2));
  console.log(`\nFull results saved to: ${outputPath}`);

  // COMPARISON WITH BASELINE
  console.log("\n=== COMPARISON WITH BASELINE ===\n");
  const baselinePath = "/Users/ramsfund/escapepermanentunderclass/scripts/test-reports-output.json";
  if (fs.existsSync(baselinePath)) {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf-8"));
    const baselineMetrics = baseline.map((b: any) => b.analysis.metrics);

    const bSummary = baselineMetrics.map((m: any) => m.summary_word_count);
    const bTasks = baselineMetrics.map((m: any) => m.task_count);
    const bOutlook = baselineMetrics.map((m: any) => m.outlook_word_count);
    const bChars = baselineMetrics.map((m: any) => m.total_chars);
    const bIssues = baselineMetrics.map((m: any) => m.issue_count);
    const bInputTokens = baseline.map((b: any) => b.input_tokens);
    const bOutputTokens = baseline.map((b: any) => b.output_tokens);

    console.log("Metric                    | Baseline    | Personalized | Delta");
    console.log("--------------------------|-------------|--------------|------");
    console.log(`Avg Summary Words         | ${avg(bSummary).padStart(11)} | ${avg(summaryWords).padStart(12)} | ${(parseFloat(avg(summaryWords)) - parseFloat(avg(bSummary)) > 0 ? "+" : "")}${(parseFloat(avg(summaryWords)) - parseFloat(avg(bSummary))).toFixed(1)}`);
    console.log(`Avg Task Count            | ${avg(bTasks).padStart(11)} | ${avg(taskCounts).padStart(12)} | ${(parseFloat(avg(taskCounts)) - parseFloat(avg(bTasks)) > 0 ? "+" : "")}${(parseFloat(avg(taskCounts)) - parseFloat(avg(bTasks))).toFixed(1)}`);
    console.log(`Avg Outlook Words         | ${avg(bOutlook).padStart(11)} | ${avg(outlookWords).padStart(12)} | ${(parseFloat(avg(outlookWords)) - parseFloat(avg(bOutlook)) > 0 ? "+" : "")}${(parseFloat(avg(outlookWords)) - parseFloat(avg(bOutlook))).toFixed(1)}`);
    console.log(`Avg Report Size (KB)      | ${avg(bChars.map((c: number) => c/1024)).padStart(11)} | ${avg(totalChars.map(c => c/1024)).padStart(12)} | ${(parseFloat(avg(totalChars.map(c => c/1024))) - parseFloat(avg(bChars.map((c: number) => c/1024))) > 0 ? "+" : "")}${(parseFloat(avg(totalChars.map(c => c/1024))) - parseFloat(avg(bChars.map((c: number) => c/1024)))).toFixed(1)}KB`);
    console.log(`Avg Issues                | ${avg(bIssues).padStart(11)} | ${avg(issueCounts).padStart(12)} | ${(parseFloat(avg(issueCounts)) - parseFloat(avg(bIssues)) > 0 ? "+" : "")}${(parseFloat(avg(issueCounts)) - parseFloat(avg(bIssues))).toFixed(1)}`);
    console.log(`Avg Input Tokens          | ${avg(bInputTokens).padStart(11)} | ${avg(inputTokens).padStart(12)} | ${(parseFloat(avg(inputTokens)) - parseFloat(avg(bInputTokens)) > 0 ? "+" : "")}${(parseFloat(avg(inputTokens)) - parseFloat(avg(bInputTokens))).toFixed(1)}`);
    console.log(`Avg Output Tokens         | ${avg(bOutputTokens).padStart(11)} | ${avg(outputTokens).padStart(12)} | ${(parseFloat(avg(outputTokens)) - parseFloat(avg(bOutputTokens)) > 0 ? "+" : "")}${(parseFloat(avg(outputTokens)) - parseFloat(avg(bOutputTokens))).toFixed(1)}`);

    // Cost comparison
    const bInputCost = bInputTokens.reduce((s: number, v: number) => s + v, 0) * 0.25 / 1_000_000;
    const bOutputCost = bOutputTokens.reduce((s: number, v: number) => s + v, 0) * 1.25 / 1_000_000;
    const pInputCost = inputTokens.reduce((s: number, v: number) => s + v, 0) * 0.25 / 1_000_000;
    const pOutputCost = outputTokens.reduce((s: number, v: number) => s + v, 0) * 1.25 / 1_000_000;
    console.log(`\nCost per 20 reports:      | $${(bInputCost + bOutputCost).toFixed(4).padStart(10)} | $${(pInputCost + pOutputCost).toFixed(4).padStart(11)} | ${((pInputCost + pOutputCost) - (bInputCost + bOutputCost) > 0 ? "+" : "")}$${((pInputCost + pOutputCost) - (bInputCost + bOutputCost)).toFixed(4)}`);
    console.log(`Cost per report:          | $${((bInputCost + bOutputCost)/20).toFixed(4).padStart(10)} | $${((pInputCost + pOutputCost)/20).toFixed(4).padStart(11)} | ${(((pInputCost + pOutputCost)/20) - ((bInputCost + bOutputCost)/20) > 0 ? "+" : "")}$${(((pInputCost + pOutputCost)/20) - ((bInputCost + bOutputCost)/20)).toFixed(4)}`);
  } else {
    console.log("⚠ Baseline output not found at:", baselinePath);
    console.log("  Run `npx tsx scripts/test-reports.ts` first to generate baseline.");
  }

  // Risk tier comparison
  console.log("\n=== RISK TIER COMPARISON ===\n");
  for (const tier of ["HIGH", "MED", "LOW"]) {
    const tierResults = allAnalyses.filter(a => {
      if (tier === "HIGH") return a.risk_score >= 7;
      if (tier === "MED") return a.risk_score >= 4 && a.risk_score < 7;
      return a.risk_score < 4;
    });

    if (tierResults.length === 0) continue;

    const tierMetrics = tierResults.map(a => a.analysis.metrics);
    const tierIssues = tierResults.map(a => a.analysis.issues.length);
    const tierPersonalization = tierMetrics.map(m => m.personalization_score);

    console.log(`${tier} RISK (${tierResults.length} jobs):`);
    console.log(`  Avg summary: ${avg(tierMetrics.map(m => m.summary_word_count))}w`);
    console.log(`  Avg tasks: ${avg(tierMetrics.map(m => m.task_count))}`);
    console.log(`  Avg report size: ${avg(tierMetrics.map(m => m.total_chars / 1024))}KB`);
    console.log(`  Avg issues: ${avg(tierIssues)}`);
    console.log(`  Avg personalization: ${avg(tierPersonalization)}/3`);
    console.log(`  Jobs: ${tierResults.map(a => `${a.job} (${a.user_profile.country}, age ${a.user_profile.age})`).join(", ")}`);
    console.log();
  }
}

main().catch(console.error);
