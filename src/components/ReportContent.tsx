"use client";

interface Task {
  task: string;
  automation_risk: "high" | "medium" | "low";
  timeline: string;
  explanation: string;
}

interface AdjacentRole {
  title: string;
  why_safer: string;
  transition_difficulty: number;
}

interface Skill {
  skill: string;
  importance: number;
  resources?: string;
}

interface Report {
  id: string;
  slug: string;
  risk_score: number;
  executive_summary: string;
  task_analysis: Task[];
  career_pivot_plan: {
    immediate_actions?: string[];
    adjacent_roles?: AdjacentRole[];
    upskilling_path?: Skill[];
  };
  skills_roadmap: {
    current_strengths?: string[];
    skills_to_develop?: string[];
    timeline?: string;
  };
  asset_guidance: {
    general_principles?: string[];
    areas_of_focus?: string[];
    avoid?: string[];
  };
  industry_outlook: string;
  created_at: string;
  jobs: {
    title: string;
    category: string;
    median_salary: number;
    employment_count: number;
    growth_projection: number;
  };
}

function getRiskColor(score: number) {
  if (score >= 7) return "text-danger";
  if (score >= 4) return "text-yellow-400";
  return "text-success";
}

function getRiskLabel(score: number) {
  if (score >= 8) return "Critical Risk";
  if (score >= 7) return "High Risk";
  if (score >= 5) return "Elevated Risk";
  if (score >= 3) return "Moderate Risk";
  return "Low Risk";
}

function getRiskBg(risk: string) {
  if (risk === "high") return "bg-danger/10 text-danger";
  if (risk === "medium") return "bg-yellow-400/10 text-yellow-400";
  return "bg-success/10 text-success";
}

export default function ReportContent({ report }: { report: Report }) {
  const job = report.jobs;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-bold">
            <span className="gradient-text">ESCAPE</span>
          </a>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm bg-card border border-border rounded-lg hover:bg-card-hover transition-colors"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-sm text-accent font-medium mb-2">
            AI Job Displacement Report
          </p>
          <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
          <p className="text-muted">{job.category}</p>
        </div>

        {/* Score Card */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="text-center md:col-span-1">
              <div className={`text-6xl font-bold ${getRiskColor(report.risk_score)}`}>
                {report.risk_score}
              </div>
              <div className="text-sm text-muted mt-1">/10 Risk Score</div>
              <div
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  report.risk_score >= 7
                    ? "bg-danger/10 text-danger"
                    : report.risk_score >= 4
                    ? "bg-yellow-400/10 text-yellow-400"
                    : "bg-success/10 text-success"
                }`}
              >
                {getRiskLabel(report.risk_score)}
              </div>
            </div>
            <div className="md:col-span-3 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background rounded-xl">
                <div className="text-lg font-bold">
                  ${job.median_salary?.toLocaleString()}
                </div>
                <div className="text-xs text-muted">Median Salary</div>
              </div>
              <div className="text-center p-4 bg-background rounded-xl">
                <div className="text-lg font-bold">
                  {job.employment_count?.toLocaleString()}
                </div>
                <div className="text-xs text-muted">US Employment</div>
              </div>
              <div className="text-center p-4 bg-background rounded-xl">
                <div className="text-lg font-bold">
                  {job.growth_projection > 0 ? "+" : ""}
                  {job.growth_projection}%
                </div>
                <div className="text-xs text-muted">10-Year Growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
          <div className="prose prose-invert max-w-none">
            {report.executive_summary?.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Task Analysis */}
        {report.task_analysis && report.task_analysis.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Task-by-Task Analysis</h2>
            <div className="space-y-3">
              {report.task_analysis.map((task, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-medium">{task.task}</h3>
                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${getRiskBg(task.automation_risk)}`}
                    >
                      {task.automation_risk} risk
                    </span>
                  </div>
                  <p className="text-sm text-muted">{task.explanation}</p>
                  <p className="text-xs text-muted mt-2">
                    Timeline: ~{task.timeline} years
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Career Pivot Plan */}
        {report.career_pivot_plan && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Career Pivot Plan</h2>

            {report.career_pivot_plan.immediate_actions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Immediate Actions</h3>
                <ul className="space-y-2">
                  {report.career_pivot_plan.immediate_actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-accent mt-0.5 shrink-0">
                        {i + 1}.
                      </span>
                      <span className="text-muted">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.career_pivot_plan.adjacent_roles && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  AI-Resistant Adjacent Roles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.career_pivot_plan.adjacent_roles.map((role, i) => (
                    <div
                      key={i}
                      className="bg-card rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{role.title}</h4>
                        <span className="text-xs text-muted">
                          Difficulty: {role.transition_difficulty}/5
                        </span>
                      </div>
                      <p className="text-sm text-muted">{role.why_safer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Skills Roadmap */}
        {report.career_pivot_plan?.upskilling_path && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Skills to Develop</h2>
            <div className="space-y-3">
              {report.career_pivot_plan.upskilling_path.map((skill, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
                  >
                    <span className="text-accent font-bold text-sm">
                      {skill.importance}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{skill.skill}</h3>
                    {skill.resources && (
                      <p className="text-xs text-muted mt-1">
                        {skill.resources}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Asset Guidance */}
        {report.asset_guidance?.general_principles && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Strategic Asset Positioning
            </h2>
            <div className="bg-card rounded-2xl border border-accent/20 p-6">
              <p className="text-xs text-muted mb-4">
                Note: This is general strategic guidance, not financial advice.
              </p>
              <div className="space-y-4">
                {report.asset_guidance.general_principles.map((principle, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent shrink-0">&#x2022;</span>
                    <p className="text-sm text-muted">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Industry Outlook */}
        {report.industry_outlook && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Industry Outlook</h2>
            <div className="prose prose-invert max-w-none">
              {report.industry_outlook.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-muted leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="text-center py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-2">Ready to escape?</h2>
          <p className="text-muted mb-6">
            Join our community for ongoing AI career intelligence.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors"
          >
            Join the Community
          </a>
        </div>

        {/* Footer */}
        <div className="text-center py-6 text-xs text-muted">
          <p>
            Generated on{" "}
            {new Date(report.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-1">
            &copy; 2026 Escape the Permanent Underclass. Data updates
            continuously.
          </p>
        </div>
      </div>
    </div>
  );
}
