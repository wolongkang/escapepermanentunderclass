"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "Jobs in Database", target: 997, suffix: "" },
  { label: "AI Risk Score Accuracy", target: 94, suffix: "%" },
  { label: "Data Points Used", target: 14875, suffix: "+" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-2xl font-bold gradient-text">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-3 bg-card rounded-lg border border-border"
        >
          <AnimatedNumber target={stat.target} suffix={stat.suffix} />
          <p className="mt-1 text-xs text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
