import { useTranslations } from "next-intl";
import JobSearch from "@/components/JobSearch";
import RiskMeter from "@/components/RiskMeter";
import Stats from "@/components/Stats";
import XFeed from "@/components/XFeed";
import AGIChart from "@/components/AGIChart";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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
  const t = useTranslations();

  const sampleInsights = [
    { job: "Data Entry Clerk", score: 9.2, label: t("samples.criticalRisk"), trend: "up" },
    { job: "Software Engineer", score: 4.8, label: t("samples.moderateRisk"), trend: "stable" },
    { job: "Registered Nurse", score: 2.1, label: t("samples.lowRisk"), trend: "down" },
    { job: "Financial Analyst", score: 7.4, label: t("samples.highRisk"), trend: "up" },
    { job: "Truck Driver", score: 6.9, label: t("samples.elevatedRisk"), trend: "up" },
  ];

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
              {t("nav.tagline")}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-muted hover:text-foreground transition-colors">
              {t("nav.howItWorks")}
            </a>
            <a href="#pricing" className="text-muted hover:text-foreground transition-colors">
              {t("nav.pricing")}
            </a>
            <a
              href="#get-report"
              className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
            >
              {t("nav.getReport")}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 pt-4">
              <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                {t("hero.titlePre")}{" "}
                <span className="gradient-text">{t("hero.titleHighlight")}</span>
                <br />
                {t("hero.titlePost")}
              </h1>
              <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="mt-8">
                <Stats />
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <RiskMeter />
            </div>
            <div className="lg:col-span-4">
              <XFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-10 px-6 border-y border-border bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-lg sm:text-xl italic text-muted leading-relaxed">
            &ldquo;{t("quote.text")}&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-accent font-medium">
            &mdash; {t("quote.source")}
          </p>
          <p className="mt-4 text-xs text-muted max-w-2xl mx-auto">
            {t("quote.detail")}
          </p>
        </div>
      </section>

      {/* Job Search */}
      <section id="get-report" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("search.heading")} <span className="gradient-text">{t("search.headingHighlight")}</span>
          </h2>
          <p className="text-muted mb-10 max-w-md mx-auto">
            {t("search.subheading")}
          </p>
          <JobSearch />
        </div>
      </section>

      {/* AGI Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <AGIChart />
            </div>
            <div className="pt-4">
              <h2 className="text-3xl font-bold mb-4">
                {t("agi.heading")} <span className="gradient-text">{t("agi.headingHighlight")}</span> {t("agi.headingPost")}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {t("agi.description")}
              </p>
              <div className="space-y-4">
                {[
                  { stat: t("agi.stat1"), detail: t("agi.stat1detail") },
                  { stat: t("agi.stat2"), detail: t("agi.stat2detail") },
                  { stat: t("agi.stat3"), detail: t("agi.stat3detail") },
                  { stat: t("agi.stat4"), detail: t("agi.stat4detail") },
                  { stat: t("agi.stat5"), detail: t("agi.stat5detail") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-danger text-sm mt-0.5">&#9679;</span>
                    <p className="text-sm text-muted">
                      <span className="text-foreground font-medium">{item.stat}</span>{" "}
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("data.heading")} <span className="gradient-text">{t("data.headingHighlight")}</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              {t("data.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {[
              { value: "997", label: t("data.occupations") },
              { value: "15,000+", label: t("data.dataPoints") },
              { value: "12", label: t("data.sources") },
              { value: "6", label: t("data.dimensions") },
              { value: "55", label: t("data.economies") },
            ].map((item) => (
              <div key={item.label} className="text-center p-5 bg-card rounded-xl border border-border">
                <div className="text-3xl font-bold text-accent">{item.value}</div>
                <div className="text-xs text-muted mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {[
              { label: t("data.taskAutomation"), desc: t("data.taskAutomationDesc"), color: "text-red-400" },
              { label: t("data.cognitiveExposure"), desc: t("data.cognitiveExposureDesc"), color: "text-orange-400" },
              { label: t("data.physicalRequirement"), desc: t("data.physicalRequirementDesc"), color: "text-green-400" },
              { label: t("data.creativityScore"), desc: t("data.creativityScoreDesc"), color: "text-blue-400" },
              { label: t("data.socialIntelligence"), desc: t("data.socialIntelligenceDesc"), color: "text-purple-400" },
              { label: t("data.regulatoryBarriers"), desc: t("data.regulatoryBarriersDesc"), color: "text-cyan-400" },
            ].map((dim) => (
              <div key={dim.label} className="p-4 bg-card/60 rounded-lg border border-border/50">
                <div className={`text-sm font-semibold ${dim.color}`}>{dim.label}</div>
                <div className="text-xs text-muted mt-1">{dim.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dataSources.map((source) => (
              <div key={source.name} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
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
            {t("samples.heading")} <span className="gradient-text">{t("samples.headingHighlight")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sampleInsights.map((item) => (
              <div key={item.job} className="p-5 bg-card rounded-xl border border-border hover:border-accent/30 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold ${item.score >= 7 ? "text-danger" : item.score >= 4 ? "text-yellow-400" : "text-success"}`}>
                    {item.score}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${item.score >= 7 ? "bg-danger/10 text-danger" : item.score >= 4 ? "bg-yellow-400/10 text-yellow-400" : "bg-success/10 text-success"}`}>
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-medium">{item.job}</p>
                <p className="text-xs text-muted mt-1">
                  {t("samples.trend")}:{" "}
                  {item.trend === "up" ? `↑ ${t("samples.trendUp")}` : item.trend === "down" ? `↓ ${t("samples.trendDown")}` : `→ ${t("samples.trendStable")}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Cards */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-xl border border-danger/20">
              <div className="text-danger text-xs font-semibold uppercase tracking-wider mb-3">{t("threat.threatLabel")}</div>
              <p className="text-sm text-muted leading-relaxed">&ldquo;{t("threat.threatText")}&rdquo;</p>
              <p className="mt-2 text-xs text-muted/60">&mdash; {t("threat.threatSource")}</p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-accent/20">
              <div className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">{t("threat.scaleLabel")}</div>
              <p className="text-sm text-muted leading-relaxed">{t("threat.scaleText")}</p>
              <p className="mt-2 text-xs text-muted/60">&mdash; {t("threat.scaleSource")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("howItWorks.heading")} <span className="gradient-text">{t("howItWorks.headingHighlight")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: t("howItWorks.step1"), desc: t("howItWorks.step1desc"), detail: t("howItWorks.step1detail") },
              { step: "02", title: t("howItWorks.step2"), desc: t("howItWorks.step2desc"), detail: t("howItWorks.step2detail") },
              { step: "03", title: t("howItWorks.step3"), desc: t("howItWorks.step3desc"), detail: t("howItWorks.step3detail") },
            ].map((item) => (
              <div key={item.step} className="text-center p-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                <p className="text-xs text-accent/70 font-medium mt-3">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("features.heading")} <span className="gradient-text">{t("features.headingHighlight")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: t("features.f1title"), desc: t("features.f1desc") },
              { icon: "📋", title: t("features.f2title"), desc: t("features.f2desc") },
              { icon: "🗺️", title: t("features.f3title"), desc: t("features.f3desc") },
              { icon: "📈", title: t("features.f4title"), desc: t("features.f4desc") },
              { icon: "🏛️", title: t("features.f5title"), desc: t("features.f5desc") },
              { icon: "🔭", title: t("features.f6title"), desc: t("features.f6desc") },
            ].map((feature) => (
              <div key={feature.title} className="p-6 bg-card rounded-xl border border-border hover:border-accent/30 transition-all">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card/50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("pricing.heading")} <span className="gradient-text">{t("pricing.headingHighlight")}</span>
          </h2>
          <p className="text-muted mb-8">{t("pricing.subheading")}</p>
          <div className="p-8 bg-card rounded-2xl border border-accent/30 glow-orange">
            <div className="text-5xl font-bold mb-2">
              {t("pricing.price")}<span className="text-lg text-muted">{t("pricing.priceCents")}</span>
            </div>
            <p className="text-sm text-muted mb-6">{t("pricing.oneTime")}</p>
            <ul className="text-left space-y-3 mb-8">
              {[
                t("pricing.item1"), t("pricing.item2"), t("pricing.item3"),
                t("pricing.item4"), t("pricing.item5"), t("pricing.item6"), t("pricing.item7"),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-accent mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#get-report" className="block w-full py-4 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors">
              {t("pricing.cta")} →
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">{t("pricing.secure")}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">
            &copy; {t("footer.copyright")}
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
            <a href="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
            <a href="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
