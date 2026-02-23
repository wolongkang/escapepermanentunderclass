"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "Jobs Analyzed", target: 1247, suffix: "+" },
  { label: "AI Risk Score Accuracy", target: 94, suffix: "%" },
  { label: "Reports Generated", target: 3842, suffix: "+" },
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
    <span className="text-3xl font-bold gradient-text">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 bg-card rounded-xl border border-border"
        >
          <AnimatedNumber target={stat.target} suffix={stat.suffix} />
          <p className="mt-2 text-sm text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
