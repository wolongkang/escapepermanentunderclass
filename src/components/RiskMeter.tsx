"use client";

import { useEffect, useState } from "react";

export default function RiskMeter() {
  const [score, setScore] = useState(0);
  const targetScore = 7.4;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval);
            return targetScore;
          }
          return Math.min(prev + 0.1, targetScore);
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const percentage = (score / 10) * 100;
  const getColor = () => {
    if (score < 3) return "#22c55e";
    if (score < 6) return "#fbbf24";
    return "#ef4444";
  };

  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#27272a"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={getColor()}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.64} 264`}
            className="transition-all duration-100"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: getColor() }}>
            {score.toFixed(1)}
          </span>
          <span className="text-sm text-muted">/10 risk</span>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">Sample: Financial Analyst</p>
    </div>
  );
}
