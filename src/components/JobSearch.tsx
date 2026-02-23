"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

interface Job {
  id: string;
  title: string;
  category: string;
  onet_code: string;
}

// Fallback jobs for when Supabase isn't connected yet
const FALLBACK_JOBS: Job[] = [
  { id: "1", title: "Software Engineer", category: "Technology", onet_code: "15-1252.00" },
  { id: "2", title: "Accountant", category: "Finance & Accounting", onet_code: "13-2011.00" },
  { id: "3", title: "Registered Nurse", category: "Healthcare", onet_code: "29-1141.00" },
  { id: "4", title: "Financial Analyst", category: "Finance & Accounting", onet_code: "13-2051.00" },
  { id: "5", title: "Graphic Designer", category: "Creative & Media", onet_code: "27-1024.00" },
  { id: "6", title: "Data Entry Clerk", category: "Administrative", onet_code: "43-9021.00" },
  { id: "7", title: "Marketing Manager", category: "Marketing & Sales", onet_code: "11-2021.00" },
  { id: "8", title: "Truck Driver", category: "Transportation", onet_code: "53-3032.00" },
  { id: "9", title: "Paralegal", category: "Legal", onet_code: "23-2011.00" },
  { id: "10", title: "Radiologist", category: "Healthcare", onet_code: "29-1224.00" },
  { id: "11", title: "Customer Service Representative", category: "Administrative", onet_code: "43-4051.00" },
  { id: "12", title: "Project Manager", category: "Technology", onet_code: "11-9199.00" },
  { id: "13", title: "Real Estate Agent", category: "Real Estate", onet_code: "41-9022.00" },
  { id: "14", title: "Pharmacist", category: "Healthcare", onet_code: "29-1051.00" },
  { id: "15", title: "Content Writer", category: "Creative & Media", onet_code: "27-3043.00" },
  { id: "16", title: "Mechanical Engineer", category: "Engineering", onet_code: "17-2141.00" },
  { id: "17", title: "Teacher (K-12)", category: "Education", onet_code: "25-2031.00" },
  { id: "18", title: "HR Specialist", category: "Human Resources", onet_code: "13-1071.00" },
  { id: "19", title: "Insurance Underwriter", category: "Insurance", onet_code: "13-2053.00" },
  { id: "20", title: "Bookkeeper", category: "Finance & Accounting", onet_code: "43-3031.00" },
  { id: "21", title: "Web Developer", category: "Technology", onet_code: "15-1254.00" },
  { id: "22", title: "Lawyer", category: "Legal", onet_code: "23-1011.00" },
  { id: "23", title: "Executive Assistant", category: "Administrative", onet_code: "43-6011.00" },
  { id: "24", title: "Sales Representative", category: "Marketing & Sales", onet_code: "41-4012.00" },
  { id: "25", title: "Supply Chain Manager", category: "Manufacturing", onet_code: "11-3071.00" },
];

export default function JobSearch() {
  const t = useTranslations("search");
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
    if (searchQuery.length < 1) {
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
            placeholder={t("placeholder")}
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
            className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden"
            style={{
              backgroundColor: "#1a1a2e",
              border: "1px solid rgba(249, 115, 22, 0.4)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.15)",
            }}
          >
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((job) => (
                <li key={job.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={() => handleSelect(job)}
                    className="w-full text-left px-6 py-3 transition-colors flex items-center justify-between"
                    style={{ color: "#fafafa" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#27272a")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div>
                      <span style={{ color: "#fafafa" }}>{job.title}</span>
                      <span className="text-xs ml-2" style={{ color: "#a1a1aa" }}>
                        {job.category}
                      </span>
                    </div>
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
            <span className="text-sm text-accent font-medium">
              {t("selected")}
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
          ? `${t("getReport")} →`
          : t("selectJob")}
      </button>
    </div>
  );
}
