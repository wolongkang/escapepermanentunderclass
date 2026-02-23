import JobSearch from "@/components/JobSearch";
import RiskMeter from "@/components/RiskMeter";
import Stats from "@/components/Stats";

const features = [
  {
    icon: "🎯",
    title: "AI Risk Score",
    description:
      "Proprietary 1-10 scoring based on task automation potential, AI capability benchmarks, and labor market data.",
  },
  {
    icon: "📊",
    title: "Data-Driven Analysis",
    description:
      "Built on O*NET occupational data, BLS statistics, AI research papers, and real-time industry signals.",
  },
  {
    icon: "🗺️",
    title: "Career Pivot Plan",
    description:
      "Personalized roadmap with skills to develop, adjacent roles to target, and strategic asset positioning.",
  },
  {
    icon: "⚡",
    title: "Instant Delivery",
    description:
      "Your comprehensive report is generated and delivered within minutes of purchase.",
  },
];

const sampleInsights = [
  { job: "Data Entry Clerk", score: 9.2, trend: "up", label: "Critical Risk" },
  { job: "Software Engineer", score: 4.8, trend: "stable", label: "Moderate Risk" },
  { job: "Registered Nurse", score: 2.1, trend: "down", label: "Low Risk" },
  { job: "Financial Analyst", score: 7.4, trend: "up", label: "High Risk" },
  { job: "Truck Driver", score: 6.9, trend: "up", label: "Elevated Risk" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="gradient-text">ESCAPE</span>
            </span>
            <span className="text-xs text-muted hidden sm:block">
              the permanent underclass
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-muted hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-muted hover:text-foreground transition-colors">
              Pricing
            </a>
            <a
              href="#get-report"
              className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
            >
              Get Report
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
                AI is coming for white-collar jobs
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Will AI{" "}
                <span className="gradient-text">replace</span>
                <br />
                your job?
              </h1>
              <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">
                Get a data-driven risk assessment for your specific role. Know your
                score. Build your escape plan. Don&apos;t become part of the permanent
                underclass.
              </p>
              <div className="mt-8">
                <Stats />
              </div>
            </div>
            <div className="flex justify-center">
              <RiskMeter />
            </div>
          </div>
        </div>
      </section>

      {/* Job Search */}
      <section id="get-report" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find your <span className="gradient-text">risk score</span>
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto">
            Search for your job title below. We cover 1,200+ occupations across every
            industry.
          </p>
          <JobSearch />
        </div>
      </section>

      {/* Sample Scores */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sample <span className="gradient-text">Risk Scores</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sampleInsights.map((item) => (
              <div
                key={item.job}
                className="p-5 bg-card rounded-xl border border-border hover:border-accent/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-2xl font-bold ${
                      item.score >= 7
                        ? "text-danger"
                        : item.score >= 4
                        ? "text-yellow-400"
                        : "text-success"
                    }`}
                  >
                    {item.score}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.score >= 7
                        ? "bg-danger/10 text-danger"
                        : item.score >= 4
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-medium">{item.job}</p>
                <p className="text-xs text-muted mt-1">
                  Trend:{" "}
                  {item.trend === "up"
                    ? "↑ Increasing"
                    : item.trend === "down"
                    ? "↓ Decreasing"
                    : "→ Stable"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How it <span className="gradient-text">works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Job",
                desc: "Search from 1,200+ occupations in our comprehensive database.",
              },
              {
                step: "02",
                title: "Get Your Score",
                desc: "Our AI analyzes your role against 50+ automation risk factors.",
              },
              {
                step: "03",
                title: "Build Your Plan",
                desc: "Receive a personalized career pivot strategy and asset guide.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What&apos;s in your <span className="gradient-text">report</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-card rounded-xl border border-border hover:border-accent/30 transition-all"
              >
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card/50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your <span className="gradient-text">escape plan</span>
          </h2>
          <p className="text-muted mb-8">
            One report. Everything you need to stay ahead of AI.
          </p>
          <div className="p-8 bg-card rounded-2xl border border-accent/30 glow-orange">
            <div className="text-5xl font-bold mb-2">
              $29<span className="text-lg text-muted">.99</span>
            </div>
            <p className="text-sm text-muted mb-6">One-time payment</p>
            <ul className="text-left space-y-3 mb-8">
              {[
                "Personalized AI risk score (1-10)",
                "Detailed task-by-task automation analysis",
                "Career pivot roadmap with timelines",
                "Skills development priorities",
                "Asset positioning guidance",
                "Industry trend analysis",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-accent mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#get-report"
              className="block w-full py-4 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors"
            >
              Get My Report →
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">
            Secure payment via Stripe. Instant delivery.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">
            &copy; 2026 Escape the Permanent Underclass. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
