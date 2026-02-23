"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TestContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [jobQuery, setJobQuery] = useState("");
  const [jobs, setJobs] = useState<{ id: string; title: string; category: string }[]>([]);
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string } | null>(null);
  const [email, setEmail] = useState("test@test.com");
  const [status, setStatus] = useState<"idle" | "searching" | "generating" | "done" | "error">("idle");
  const [reportUrl, setReportUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (key !== "escape2024test") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Not found</p>
      </div>
    );
  }

  async function searchJobs(q: string) {
    setJobQuery(q);
    if (q.length < 1) {
      setJobs([]);
      return;
    }
    setStatus("searching");
    try {
      const res = await fetch(`/api/jobs/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch {
      setJobs([]);
    }
    setStatus("idle");
  }

  async function generateReport() {
    if (!selectedJob) return;
    setStatus("generating");
    setErrorMsg("");

    try {
      const res = await fetch("/api/report/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          email,
          paymentId: `test_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (data.reportUrl) {
        setReportUrl(data.reportUrl);
        setStatus("done");
      } else {
        setErrorMsg(data.error || "Failed to generate report");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg(String(err));
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-2">Test Report Generator</h1>
        <p className="text-sm text-muted mb-6">Free testing only — no payment required</p>

        <div className="mb-4">
          <label className="block text-sm mb-1">Search job</label>
          <input
            type="text"
            value={jobQuery}
            onChange={(e) => searchJobs(e.target.value)}
            placeholder="Type a job title..."
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-accent"
          />
          {jobs.length > 0 && !selectedJob && (
            <div className="mt-2 bg-card border border-border rounded-xl max-h-48 overflow-y-auto">
              {jobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    setJobQuery(job.title);
                    setJobs([]);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors text-sm"
                >
                  {job.title} <span className="text-muted">— {job.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedJob && (
          <div className="mb-4 p-3 bg-card border border-accent/30 rounded-xl text-sm">
            Selected: <strong>{selectedJob.title}</strong>
            <button
              onClick={() => { setSelectedJob(null); setJobQuery(""); }}
              className="ml-2 text-accent text-xs"
            >
              (change)
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-accent"
          />
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
            {errorMsg}
          </div>
        )}

        {status === "done" && reportUrl ? (
          <a
            href={reportUrl}
            className="block text-center w-full py-4 bg-accent hover:bg-accent-hover rounded-xl text-white font-semibold transition-colors"
          >
            View Report →
          </a>
        ) : (
          <button
            onClick={generateReport}
            disabled={!selectedJob || status === "generating"}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              !selectedJob || status === "generating"
                ? "bg-card text-muted cursor-not-allowed border border-border"
                : "bg-accent hover:bg-accent-hover text-white cursor-pointer"
            }`}
          >
            {status === "generating" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating report...
              </span>
            ) : (
              "Generate Free Test Report"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TestReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TestContent />
    </Suspense>
  );
}
