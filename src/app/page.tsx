import JobSearch from "@/components/JobSearch";
import RiskMeter from "@/components/RiskMeter";
import Stats from "@/components/Stats";
import XFeed from "@/components/XFeed";
import AGIChart from "@/components/AGIChart";

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

const dataSources = [
  { name: "U.S. Dept. of Labor O*NET", detail: "997 occupations, task descriptions, skill profiles", icon: "🏛️" },
  { name: "Bureau of Labor Statistics", detail: "Median salaries, employment counts for all occupations", icon: "📈" },
  { name: "BLS Employment Projections", detail: "10-year growth rates across all sectors", icon: "🔮" },
  { name: "Frey & Osborne (Oxford)", detail: "702 occupations, automation probability scores", icon: "🎓" },
  { name: "OpenAI GPTs are GPTs", detail: "Task-level LLM exposure analysis", icon: "🤖" },
  { name: "Felten AIOE Index", detail: "AI occupational exposure by SOC code", icon: "📊" },
  { name: "World Economic Forum", detail: "Future of Jobs Report 2025, 55 economies", icon: "🌍" },
  { name: "McKinsey Global Institute", detail: "800+ occupations, 46 countries analyzed", icon: "📋" },
  { name: "OECD Employment Outlook", detail: "G20 labor market analysis, 27% automation risk", icon: "🌐" },
  { name: "ILO Global Index", detail: "30,000 tasks, 50,000 human assessments", icon: "🏢" },
  { name: "IMF GenAI Analysis", detail: "40% global employment exposure, 108 countries", icon: "💰" },
  { name: "Brookings Institution", detail: "36M U.S. workers highly exposed analysis", icon: "🏫" },
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

      {/* Hero - 3 column: Text | Risk Meter | X Feed */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left - Copy */}
            <div className="lg:col-span-4 pt-4">
              <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
                AI is coming for white-collar jobs
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
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

            {/* Center - Risk Meter */}
            <div className="lg:col-span-4 flex justify-center">
              <RiskMeter />
            </div>

            {/* Right - X Feed */}
            <div className="lg:col-span-4">
              <XFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Quote Banner */}
      <section className="py-10 px-6 border-y border-border bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-lg sm:text-xl italic text-muted leading-relaxed">
            &ldquo;Labor&apos;s share of GDP declined from 64% in 1974 to 56% in 2024&hellip;
            then dropped to 46%.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-accent font-medium">
            &mdash; Citrini Research, &ldquo;2028&rdquo; Scenario Analysis
          </p>
          <p className="mt-4 text-xs text-muted max-w-2xl mx-auto">
            The research paints a picture where AI-driven displacement creates interconnected
            economic crises through job loss, wage compression, and financial system stress.
            White-collar layoffs increase as AI capabilities improve. The question isn&apos;t
            if &mdash; it&apos;s when.
          </p>
        </div>
      </section>

      {/* Job Search */}
      <section id="get-report" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Find your <span className="gradient-text">risk score</span>
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto">
            Search from 997 occupations across every industry in the U.S. economy.
          </p>
          <JobSearch />
        </div>
      </section>

      {/* AGI Advancement Index */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <AGIChart />
            </div>
            <div className="pt-4">
              <h2 className="text-3xl font-bold mb-4">
                The <span className="gradient-text">acceleration</span> is real
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Our AGI Advancement Index tracks the pace of AI capability progression
                using data from benchmark performance, compute scaling, research velocity,
                and real-world task automation breadth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-danger text-sm mt-0.5">&#9679;</span>
                  <p className="text-sm text-muted">
                    <span className="text-foreground font-medium">47% of all worker tasks</span> could
                    be completed faster with LLM-powered tools (OpenAI, 2024)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-danger text-sm mt-0.5">&#9679;</span>
                  <p className="text-sm text-muted">
                    <span className="text-foreground font-medium">300 million jobs globally</span> exposed
                    to automation by generative AI (Goldman Sachs, 2023)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-danger text-sm mt-0.5">&#9679;</span>
                  <p className="text-sm text-muted">
                    <span className="text-foreground font-medium">92 million jobs displaced</span> by
                    2030, only 78M net new created (WEF Future of Jobs, 2025)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-danger text-sm mt-0.5">&#9679;</span>
                  <p className="text-sm text-muted">
                    <span className="text-foreground font-medium">27% of OECD jobs</span> at high risk
                    of automation across G20 economies (OECD, 2023)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-danger text-sm mt-0.5">&#9679;</span>
                  <p className="text-sm text-muted">
                    <span className="text-foreground font-medium">40% of global employment</span> exposed
                    to AI, rising to 60% in advanced economies (IMF, 2024)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Credibility Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Powered by <span className="gradient-text">real data</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              Our scoring model synthesizes data from 12 institutional sources, 7 peer-reviewed
              research papers, and 15,000+ data points to score every occupation in the
              U.S. Department of Labor database.
            </p>
          </div>

          {/* Data points counter row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="text-center p-5 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">997</div>
              <div className="text-xs text-muted mt-1">Occupations Covered</div>
            </div>
            <div className="text-center p-5 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">15,000+</div>
              <div className="text-xs text-muted mt-1">Data Points</div>
            </div>
            <div className="text-center p-5 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">12</div>
              <div className="text-xs text-muted mt-1">Institutional Sources</div>
            </div>
            <div className="text-center p-5 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">6</div>
              <div className="text-xs text-muted mt-1">Risk Dimensions</div>
            </div>
            <div className="text-center p-5 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent">55</div>
              <div className="text-xs text-muted mt-1">Economies Analyzed</div>
            </div>
          </div>

          {/* 6 Risk Dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              { label: "Task Automation", desc: "How automatable are core job tasks", color: "text-red-400" },
              { label: "Cognitive Exposure", desc: "AI's ability to handle analytical work", color: "text-orange-400" },
              { label: "Physical Requirement", desc: "Hands-on work that protects from AI", color: "text-green-400" },
              { label: "Creativity Score", desc: "Creative & innovative thinking needs", color: "text-blue-400" },
              { label: "Social Intelligence", desc: "Interpersonal & emotional labor", color: "text-purple-400" },
              { label: "Regulatory Barriers", desc: "Licensing & legal protections", color: "text-cyan-400" },
            ].map((dim) => (
              <div key={dim.label} className="p-4 bg-card/60 rounded-lg border border-border/50">
                <div className={`text-sm font-semibold ${dim.color}`}>{dim.label}</div>
                <div className="text-xs text-muted mt-1">{dim.desc}</div>
              </div>
            ))}
          </div>

          {/* Data Sources */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
              >
                <span className="text-xl shrink-0">{source.icon}</span>
                <div>
                  <div className="text-sm font-medium">{source.name}</div>
                  <div className="text-xs text-muted">{source.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Scores */}
      <section className="py-20 px-6 bg-card/50">
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

      {/* Second Quote - Urgency */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-xl border border-danger/20">
              <div className="text-danger text-xs font-semibold uppercase tracking-wider mb-3">
                The Threat
              </div>
              <p className="text-sm text-muted leading-relaxed">
                &ldquo;AI capabilities improved, companies needed fewer workers,
                white collar layoffs increased.&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted/60">
                &mdash; Citrini Research Scenario Analysis
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-accent/20">
              <div className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">
                The Scale
              </div>
              <p className="text-sm text-muted leading-relaxed">
                McKinsey estimates 30% of work hours could be automated by 2030.
                That&apos;s 12 million occupational transitions in the US alone.
                The window to prepare is closing.
              </p>
              <p className="mt-2 text-xs text-muted/60">
                &mdash; McKinsey Global Institute
              </p>
            </div>
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
                desc: "Search from 997 occupations in our comprehensive O*NET database.",
              },
              {
                step: "02",
                title: "Get Your Score",
                desc: "Our AI analyzes your role across 6 risk dimensions and 50+ automation factors.",
              },
              {
                step: "03",
                title: "Build Your Plan",
                desc: "Receive a personalized career pivot strategy and asset positioning guide.",
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
                "6-dimension risk breakdown",
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
