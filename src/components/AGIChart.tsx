"use client";

import { useState, useEffect, useRef } from "react";

// AI Acceleration Index data points (normalized 0-100)
// Composite of: Mag 7 CapEx, global AI spend, token consumption,
// AI user base, agent adoption, benchmark performance, compute scaling
const HISTORICAL_DATA = [
  { year: 2018, month: "Jan", index: 12, label: "GPT-1 era" },
  { year: 2019, month: "Jan", index: 18, label: "GPT-2" },
  { year: 2020, month: "Jun", index: 28, label: "GPT-3" },
  { year: 2021, month: "Jan", index: 33, label: "Codex / DALL-E" },
  { year: 2022, month: "Mar", index: 38, label: "PaLM / Stable Diffusion" },
  { year: 2022, month: "Nov", index: 48, label: "ChatGPT launch" },
  { year: 2023, month: "Mar", index: 55, label: "GPT-4" },
  { year: 2023, month: "Jul", index: 58, label: "Claude 2 / Llama 2" },
  { year: 2023, month: "Dec", index: 62, label: "Gemini / Mixtral" },
  { year: 2024, month: "Mar", index: 66, label: "Claude 3 Opus" },
  { year: 2024, month: "Jun", index: 69, label: "GPT-4o / Claude 3.5" },
  { year: 2024, month: "Sep", index: 72, label: "o1 reasoning" },
  { year: 2024, month: "Dec", index: 76, label: "Gemini 2.0 / o3" },
  { year: 2025, month: "Jan", index: 79, label: "DeepSeek R1" },
  { year: 2025, month: "May", index: 83, label: "GPT-4.5 / Gemini 2.5" },
  { year: 2025, month: "Aug", index: 86, label: "1B AI users milestone" },
  { year: 2025, month: "Nov", index: 88, label: "o3-pro / Agent era" },
  { year: 2026, month: "Feb", index: 91, label: "Claude 4.6 / $650B CapEx" },
];

// Projected trajectory
const PROJECTIONS = [
  { year: 2026, month: "Jun", index: 93 },
  { year: 2026, month: "Dec", index: 95 },
  { year: 2027, month: "Jun", index: 96 },
  { year: 2027, month: "Dec", index: 97 },
  { year: 2028, month: "Jun", index: 98 },
  { year: 2028, month: "Dec", index: 99 },
];

// Compound index metrics with sources
const METRICS = [
  { label: "Mag 7 AI CapEx", value: "$650B", change: "+68%", period: "2026 est. (Goldman)" },
  { label: "Global AI Spend", value: "$2.52T", change: "+44%", period: "2026 (Gartner)" },
  { label: "Tokens / Day", value: "50T+", change: "+20x", period: "global (Fireworks AI)" },
  { label: "AI Chat Users", value: "1.5B+", change: "+95%", period: "monthly (DataReportal)" },
  { label: "Agent Adoption", value: "79%", change: "+8x", period: "of enterprises (PwC)" },
  { label: "Paid Subscribers", value: "35M+", change: "+250%", period: "ChatGPT alone (OpenAI)" },
];

export default function AGIChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 15, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // All points
    const allPoints = [...HISTORICAL_DATA, ...PROJECTIONS];
    const totalPoints = allPoints.length;

    // Map data to coordinates
    const points = allPoints.map((d, i) => ({
      x: padding.left + (i / (totalPoints - 1)) * chartW,
      y: padding.top + chartH - (d.index / 100) * chartH,
      ...d,
    }));

    // Grid lines
    ctx.strokeStyle = "rgba(39, 39, 42, 0.6)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = "rgba(161, 161, 170, 0.5)";
      ctx.font = "9px system-ui";
      ctx.textAlign = "right";
      ctx.fillText(`${100 - i * 25}`, padding.left - 5, y + 3);
    }

    // X-axis labels (years)
    const yearLabels = [2018, 2020, 2022, 2024, 2026, 2028];
    ctx.textAlign = "center";
    yearLabels.forEach((year) => {
      const yearPoints = allPoints.filter((p) => p.year === year);
      if (yearPoints.length > 0) {
        const idx = allPoints.indexOf(yearPoints[0]);
        const x = padding.left + (idx / (totalPoints - 1)) * chartW;
        ctx.fillStyle = "rgba(161, 161, 170, 0.5)";
        ctx.font = "9px system-ui";
        ctx.fillText(year.toString(), x, h - 5);
      }
    });

    // Historical line gradient
    const historicalEnd = HISTORICAL_DATA.length - 1;

    // Draw filled area under historical line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    gradient.addColorStop(0, "rgba(249, 115, 22, 0.15)");
    gradient.addColorStop(1, "rgba(249, 115, 22, 0)");

    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartH);
    for (let i = 0; i <= historicalEnd; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[historicalEnd].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw historical line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i <= historicalEnd; i++) {
      // Smooth curve
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      ctx.quadraticCurveTo(prev.x + (cpx - prev.x) * 0.5, prev.y, cpx, (prev.y + curr.y) / 2);
      ctx.quadraticCurveTo(cpx + (curr.x - cpx) * 0.5, curr.y, curr.x, curr.y);
    }
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Projected line (dashed)
    ctx.beginPath();
    ctx.moveTo(points[historicalEnd].x, points[historicalEnd].y);
    for (let i = historicalEnd + 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw projected area (lighter)
    const projGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    projGradient.addColorStop(0, "rgba(249, 115, 22, 0.06)");
    projGradient.addColorStop(1, "rgba(249, 115, 22, 0)");

    ctx.beginPath();
    ctx.moveTo(points[historicalEnd].x, padding.top + chartH);
    for (let i = historicalEnd; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = projGradient;
    ctx.fill();

    // Draw data points on historical line
    for (let i = 0; i <= historicalEnd; i++) {
      const p = points[i];
      const isHovered = hoveredPoint === i;
      const radius = isHovered ? 5 : 3;

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? "#fb923c" : "#f97316";
      ctx.fill();

      if (isHovered) {
        ctx.strokeStyle = "rgba(249, 115, 22, 0.3)";
        ctx.lineWidth = 6;
        ctx.stroke();
      }
    }

    // "AGI" threshold line at 95
    const agiY = padding.top + chartH - (95 / 100) * chartH;
    ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, agiY);
    ctx.lineTo(w - padding.right, agiY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "rgba(239, 68, 68, 0.5)";
    ctx.font = "bold 8px system-ui";
    ctx.textAlign = "right";
    ctx.fillText("AGI THRESHOLD", w - padding.right, agiY - 4);

    // Current position marker
    const currentIdx = HISTORICAL_DATA.length - 1;
    const cp = points[currentIdx];
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#f97316";
    ctx.fill();
    ctx.strokeStyle = "rgba(249, 115, 22, 0.3)";
    ctx.lineWidth = 8;
    ctx.stroke();
  }, [hoveredPoint]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    const padding = { left: 35, right: 15 };
    const chartW = w - padding.left - padding.right;

    const allPoints = [...HISTORICAL_DATA, ...PROJECTIONS];
    const totalPoints = allPoints.length;

    // Find closest point
    let closest = -1;
    let closestDist = Infinity;
    for (let i = 0; i < HISTORICAL_DATA.length; i++) {
      const px = padding.left + (i / (totalPoints - 1)) * chartW;
      const dist = Math.abs(x - px);
      if (dist < closestDist && dist < 20) {
        closestDist = dist;
        closest = i;
      }
    }

    setHoveredPoint(closest >= 0 ? closest : null);
  };

  return (
    <div className={`transition-all duration-1000 ${animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">AI Acceleration Index</h3>
          <p className="text-xs text-muted">
            Compound index: CapEx, spend, tokens, users, agents, benchmarks
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">91</div>
          <div className="text-xs text-muted">/100</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl border border-border p-4 mb-4">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: "200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        />
        {hoveredPoint !== null && (
          <div className="text-center mt-2">
            <span className="text-xs text-accent font-medium">
              {HISTORICAL_DATA[hoveredPoint].label}
            </span>
            <span className="text-xs text-muted ml-2">
              Index: {HISTORICAL_DATA[hoveredPoint].index}/100
            </span>
          </div>
        )}
        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-accent inline-block" /> Historical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-accent/40 inline-block border-t border-dashed border-accent/40" /> Projected
          </span>
        </div>
      </div>

      {/* Compound Index Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="bg-card/60 border border-border/50 rounded-lg p-2.5"
          >
            <div className="text-[10px] text-muted">{m.label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold">{m.value}</span>
              <span className="text-[10px] text-accent font-medium">{m.change}</span>
            </div>
            <div className="text-[9px] text-muted/60">{m.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
