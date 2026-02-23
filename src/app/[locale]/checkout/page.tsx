"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";

function CheckoutContent() {
  const t = useTranslations("checkout");
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const jobTitle = searchParams.get("title");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !jobId) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, jobTitle, email }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  }

  if (!jobId || !jobTitle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("noJobSelected")}</h1>
          <a
            href="/#get-report"
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {t("goBack")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-bold">
            <span className="gradient-text">ESCAPE</span>
          </a>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">{t("getYourReport")}</h1>
          <p className="text-muted">
            {t("assessmentFor")}{" "}
            <span className="text-foreground font-medium">{jobTitle}</span>
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="font-semibold mb-4">{t("orderSummary")}</h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted">{t("reportName")}</span>
            <span className="font-medium">$29.99</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted mb-3">
            <span>{t("job")}: {jobTitle}</span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between font-bold">
            <span>{t("total")}</span>
            <span className="gradient-text text-xl">$29.99</span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="font-semibold mb-3">{t("whatsIncluded")}</h2>
          <ul className="space-y-2 text-sm text-muted">
            {[t("item1"), t("item2"), t("item3"), t("item4"), t("item5"), t("item6")].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-accent">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
              className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted"
            />
            <p className="text-xs text-muted mt-2">{t("emailHelper")}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email}
            className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
              isLoading || !email
                ? "bg-card text-muted cursor-not-allowed border border-border"
                : "bg-accent hover:bg-accent-hover text-white glow-orange cursor-pointer"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("redirecting")}
              </span>
            ) : (
              `${t("payButton")} →`
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <svg className="w-4 h-4 text-muted" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            <p className="text-xs text-muted">{t("securePayment")}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
