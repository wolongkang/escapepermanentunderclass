"use client";

import { useState, useRef, useEffect } from "react";

// Placeholder jobs until we seed the real database
const SAMPLE_JOBS = [
  "Software Engineer",
  "Accountant",
  "Registered Nurse",
  "Financial Analyst",
  "Graphic Designer",
  "Data Entry Clerk",
  "Marketing Manager",
  "Truck Driver",
  "Paralegal",
  "Radiologist",
  "Customer Service Representative",
  "Project Manager",
  "Real Estate Agent",
  "Pharmacist",
  "Content Writer",
  "Mechanical Engineer",
  "Teacher (K-12)",
  "HR Specialist",
  "Insurance Underwriter",
  "Bookkeeper",
  "Web Developer",
  "Lawyer",
  "Executive Assistant",
  "Sales Representative",
  "Supply Chain Manager",
];

export default function JobSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  function handleInputChange(value: string) {
    setQuery(value);
    setSelectedJob(null);
    if (value.length > 0) {
      const filtered = SAMPLE_JOBS.filter((job) =>
        job.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }

  function handleSelect(job: string) {
    setSelectedJob(job);
    setQuery(job);
    setIsOpen(false);
  }

  function handleGetReport() {
    if (!selectedJob) return;
    // TODO: Navigate to checkout with selected job
    window.location.href = `/checkout?job=${encodeURIComponent(selectedJob)}`;
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
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((job) => (
                <li key={job}>
                  <button
                    onClick={() => handleSelect(job)}
                    className="w-full text-left px-6 py-3 hover:bg-card-hover transition-colors text-foreground"
                  >
                    {job}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleGetReport}
        disabled={!selectedJob}
        className={`mt-6 w-full py-4 px-8 rounded-xl text-lg font-semibold transition-all ${
          selectedJob
            ? "bg-accent hover:bg-accent-hover text-white glow-orange cursor-pointer"
            : "bg-card text-muted cursor-not-allowed border border-border"
        }`}
      >
        {selectedJob ? "Get My AI Risk Report →" : "Select your job to continue"}
      </button>
    </div>
  );
}
