"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "generating" | "ready" | "error">("loading");
  const [reportUrl, setReportUrl] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Poll for report completion
    async function checkReport() {
      try {
        const res = await fetch(`/api/stripe/status?session_id=${sessionId}`);
        const data = await res.json();

        if (data.reportUrl) {
          setReportUrl(data.reportUrl);
          setStatus("ready");
        } else if (data.status === "generating") {
          setStatus("generating");
          // Poll again in 3 seconds
          setTimeout(checkReport, 3000);
        } else if (data.status === "pending") {
          setStatus("generating");
          // Trigger report generation
          if (data.jobId && data.email) {
            await fetch("/api/report/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                jobId: data.jobId,
                email: data.email,
                paymentId: data.paymentId,
              }),
            });
            setTimeout(checkReport, 2000);
          }
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    checkReport();
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
            <h1 className="text-2xl font-bold mb-2">Processing payment...</h1>
            <p className="text-muted">Verifying your purchase.</p>
          </>
        )}

        {status === "generating" && (
          <>
            <div className="w-16 h-16 border-3 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">Generating your report...</h1>
            <p className="text-muted mb-4">
              Our AI is analyzing your job across 6 risk dimensions. This takes about 30 seconds.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 text-left">
              <div className="space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span> Payment confirmed
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" />
                  Analyzing task automation potential
                </p>
                <p className="flex items-center gap-2 opacity-50">
                  <span className="text-muted">&#9679;</span> Building career pivot plan
                </p>
                <p className="flex items-center gap-2 opacity-50">
                  <span className="text-muted">&#9679;</span> Generating skills roadmap
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
            <h1 className="text-2xl font-bold mb-2">Your report is ready!</h1>
            <p className="text-muted mb-8">
              Your personalized AI risk assessment has been generated.
            </p>
            <a
              href={reportUrl}
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors glow-orange"
            >
              View My Report →
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-danger text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted mb-8">
              Don&apos;t worry — your payment was processed. Please contact us and we&apos;ll get your report to you.
            </p>
            <a
              href="/"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Back to home
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
