"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Job {
  id: string;
  title: string;
  category: string;
  ai_risk_score: number;
  onet_code: string;
}

// Fallback jobs for when Supabase isn't connected yet
const FALLBACK_JOBS: Job[] = [
  { id: "1", title: "Software Engineer", category: "Technology", ai_risk_score: 4.8, onet_code: "15-1252.00" },
  { id: "2", title: "Accountant", category: "Finance & Accounting", ai_risk_score: 7.8, onet_code: "13-2011.00" },
  { id: "3", title: "Registered Nurse", category: "Healthcare", ai_risk_score: 2.1, onet_code: "29-1141.00" },
  { id: "4", title: "Financial Analyst", category: "Finance & Accounting", ai_risk_score: 7.4, onet_code: "13-2051.00" },
  { id: "5", title: "Graphic Designer", category: "Creative & Media", ai_risk_score: 6.5, onet_code: "27-1024.00" },
  { id: "6", title: "Data Entry Clerk", category: "Administrative", ai_risk_score: 9.2, onet_code: "43-9021.00" },
  { id: "7", title: "Marketing Manager", category: "Marketing & Sales", ai_risk_score: 5.2, onet_code: "11-2021.00" },
  { id: "8", title: "Truck Driver", category: "Transportation", ai_risk_score: 6.9, onet_code: "53-3032.00" },
  { id: "9", title: "Paralegal", category: "Legal", ai_risk_score: 7.6, onet_code: "23-2011.00" },
  { id: "10", title: "Radiologist", category: "Healthcare", ai_risk_score: 5.8, onet_code: "29-1224.00" },
  { id: "11", title: "Customer Service Representative", category: "Administrative", ai_risk_score: 8.5, onet_code: "43-4051.00" },
  { id: "12", title: "Project Manager", category: "Technology", ai_risk_score: 4.2, onet_code: "11-9199.00" },
  { id: "13", title: "Real Estate Agent", category: "Real Estate", ai_risk_score: 5.6, onet_code: "41-9022.00" },
  { id: "14", title: "Pharmacist", category: "Healthcare", ai_risk_score: 5.4, onet_code: "29-1051.00" },
  { id: "15", title: "Content Writer", category: "Creative & Media", ai_risk_score: 7.8, onet_code: "27-3043.00" },
  { id: "16", title: "Mechanical Engineer", category: "Engineering", ai_risk_score: 3.9, onet_code: "17-2141.00" },
  { id: "17", title: "Teacher (K-12)", category: "Education", ai_risk_score: 2.8, onet_code: "25-2031.00" },
  { id: "18", title: "HR Specialist", category: "Human Resources", ai_risk_score: 6.2, onet_code: "13-1071.00" },
  { id: "19", title: "Insurance Underwriter", category: "Insurance", ai_risk_score: 8.1, onet_code: "13-2053.00" },
  { id: "20", title: "Bookkeeper", category: "Finance & Accounting", ai_risk_score: 8.7, onet_code: "43-3031.00" },
  { id: "21", title: "Web Developer", category: "Technology", ai_risk_score: 5.5, onet_code: "15-1254.00" },
  { id: "22", title: "Lawyer", category: "Legal", ai_risk_score: 4.5, onet_code: "23-1011.00" },
  { id: "23", title: "Executive Assistant", category: "Administrative", ai_risk_score: 7.2, onet_code: "43-6011.00" },
  { id: "24", title: "Sales Representative", category: "Marketing & Sales", ai_risk_score: 5.8, onet_code: "41-4012.00" },
  { id: "25", title: "Supply Chain Manager", category: "Manufacturing", ai_risk_score: 5.1, onet_code: "11-3071.00" },
];

export default function JobSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchJobs = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch(`/api/jobs/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();

      if (data.jobs && data.jobs.length > 0) {
        setSuggestions(data.jobs);
      } else {
        const filtered = FALLBACK_JOBS.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
      }
    } catch {
      const filtered = FALLBACK_JOBS.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    }

    setIsSearching(false);
    setIsOpen(true);
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    setSelectedJob(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchJobs(value), 200);
  }

  function handleSelect(job: Job) {
    setSelectedJob(job);
    setQuery(job.title);
    setIsOpen(false);
  }

  function handleGetReport() {
    if (!selectedJob) return;
    window.location.href = `/checkout?job=${encodeURIComponent(selectedJob.id)}&title=${encodeURIComponent(selectedJob.title)}`;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder="Enter your job title..."
            className="w-full px-6 py-4 text-lg bg-card border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-muted"
            aria-label="Search for your job title"
            autoComplete="off"
          />
          {isSearching ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-[#1e1e22] border border-accent/30 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((job) => (
                <li key={job.id}>
                  <button
                    onClick={() => handleSelect(job)}
                    className="w-full text-left px-6 py-3 hover:bg-card-hover transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-foreground">{job.title}</span>
                      <span className="text-xs text-muted ml-2">
                        {job.category}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        job.ai_risk_score >= 7
                          ? "text-danger"
                          : job.ai_risk_score >= 4
                          ? "text-yellow-400"
                          : "text-success"
                      }`}
                    >
                      {job.ai_risk_score}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="mt-4 p-4 bg-card rounded-xl border border-border text-left">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{selectedJob.title}</span>
              <span className="text-sm text-muted ml-2">
                {selectedJob.category}
              </span>
            </div>
            <span
              className={`text-2xl font-bold ${
                selectedJob.ai_risk_score >= 7
                  ? "text-danger"
                  : selectedJob.ai_risk_score >= 4
                  ? "text-yellow-400"
                  : "text-success"
              }`}
            >
              {selectedJob.ai_risk_score}/10
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleGetReport}
        disabled={!selectedJob}
        className={`mt-6 w-full py-4 px-8 rounded-xl text-lg font-semibold transition-all ${
          selectedJob
            ? "bg-accent hover:bg-accent-hover text-white glow-orange cursor-pointer"
            : "bg-card text-muted cursor-not-allowed border border-border"
        }`}
      >
        {selectedJob
          ? "Get My AI Risk Report — $29.99 →"
          : "Select your job to continue"}
      </button>
    </div>
  );
}
