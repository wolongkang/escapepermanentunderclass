"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { useTranslations } from "next-intl";

const MAX_POLLS = 40; // ~2 minutes max polling (40 * 3s)
const REPORT_SECRET = process.env.NEXT_PUBLIC_REPORT_SECRET || "";

function SuccessContent() {
  const t = useTranslations("success");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "generating" | "ready" | "error" | "timeout">("loading");
  const [reportUrl, setReportUrl] = useState("");
  const pollCount = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function checkReport() {
      pollCount.current += 1;

      if (pollCount.current > MAX_POLLS) {
        setStatus("timeout");
        return;
      }

      try {
        const res = await fetch(`/api/stripe/status?session_id=${sessionId}`);
        const data = await res.json();

        if (data.reportUrl) {
          setReportUrl(data.reportUrl);
          setStatus("ready");
        } else if (data.status === "generating") {
          setStatus("generating");
          timeoutRef.current = setTimeout(checkReport, 3000);
        } else if (data.status === "pending") {
          setStatus("generating");
          // Trigger report generation server-side (status route handles it now)
          await fetch(`/api/stripe/status?session_id=${sessionId}&trigger=1`);
          timeoutRef.current = setTimeout(checkReport, 3000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    checkReport();

    // Cleanup timeouts on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-bold">
            <span className="gradient-text">ESCAPE</span>
          </a>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">{t("processing")}</h1>
            <p className="text-muted">{t("verifying")}</p>
          </>
        )}

        {status === "generating" && (
          <>
            <div className="w-16 h-16 border-3 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">{t("generating")}</h1>
            <p className="text-muted mb-4">{t("generatingDesc")}</p>
            <div className="bg-card rounded-xl border border-border p-4 text-left">
              <div className="space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span> {t("paymentConfirmed")}
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" />
                  {t("analyzingTasks")}
                </p>
                <p className="flex items-center gap-2 opacity-50">
                  <span className="text-muted">&#9679;</span> {t("buildingPlan")}
                </p>
                <p className="flex items-center gap-2 opacity-50">
                  <span className="text-muted">&#9679;</span> {t("generatingRoadmap")}
                </p>
              </div>
            </div>
          </>
        )}

        {status === "ready" && (
          <>
            <div className="w-16 h-16 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-success text-3xl">&#10003;</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{t("ready")}</h1>
            <p className="text-muted mb-8">{t("readyDesc")}</p>
            <a
              href={reportUrl}
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors glow-orange"
            >
              {t("viewReport")} &rarr;
            </a>
          </>
        )}

        {status === "timeout" && (
          <>
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-400 text-3xl">&#9203;</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Taking Longer Than Expected</h1>
            <p className="text-muted mb-4">
              Your report is still being generated. This can sometimes take a few extra minutes.
              We&apos;ll email you at the address you provided once it&apos;s ready.
            </p>
            <p className="text-sm text-muted mb-8">
              You can also refresh this page to check again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors"
            >
              Refresh Page
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-danger text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{t("errorTitle")}</h1>
            <p className="text-muted mb-8">{t("errorDesc")}</p>
            <a href="/" className="text-accent hover:text-accent-hover transition-colors">
              {t("backHome")}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
