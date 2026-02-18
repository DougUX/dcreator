"use client";

import type { TimelineStep } from "@/lib/timelineData";

export default function TimelineCard({
  step,
  index,
  active,
  side,
  reducedMotion = false
}: {
  step: TimelineStep;
  index: number;
  active: boolean;
  side: "left" | "right";
  reducedMotion?: boolean;
}) {
  const stateClass = reducedMotion
    ? "opacity-100 translate-y-0"
    : active
      ? "opacity-100 translate-y-0"
      : "opacity-25 translate-y-[40px]";

  return (
    <article
      data-timeline-card
      data-index={index}
      className={[
        "group relative",
        "rounded-3xl border border-[rgba(var(--border),0.9)] bg-[rgba(var(--card),0.72)]",
        "px-6 py-6 sm:px-7 sm:py-7",
        "shadow-[0_30px_120px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_120px_rgba(0,0,0,0.75)]",
        "backdrop-blur-md",
        "transition",
        "will-change-transform",
        stateClass,
        "hover:opacity-100 hover:translate-y-0",
        "hover:scale-[1.02] hover:border-[rgba(var(--fg),0.20)]"
      ].join(" ")}
      style={{
        transformOrigin: side === "left" ? "100% 50%" : "0% 50%",
        boxShadow: active
          ? "0 40px 140px rgba(0,0,0,0.20)"
          : "0 18px 70px rgba(0,0,0,0.16)",
      }}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-3xl",
          "opacity-0 transition-opacity duration-700",
          active ? "opacity-100" : "group-hover:opacity-50"
        ].join(" ")}
        style={{
          background:
            "radial-gradient(800px 420px at 18% 20%, rgba(255,255,255,0.14), rgba(255,255,255,0) 62%), radial-gradient(900px 520px at 80% 20%, rgba(255,255,255,0.08), rgba(255,255,255,0) 58%)"
        }}
      />

      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <div
              className={[
                "text-[12px] font-semibold uppercase tracking-[0.22em]",
                "bg-[linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0.85),rgba(255,255,255,0.15))]",
                "bg-[length:260%_100%]",
                "bg-clip-text text-transparent",
                active ? "animate-metal-sweep" : "opacity-80"
              ].join(" ")}
            >
              {step.number}
            </div>
            <div className="h-[1px] flex-1 bg-[rgba(var(--fg),0.12)]" />
          </div>

          <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-[20px]">
            {step.title}
          </h3>
          <div className="mt-2 text-[13px] leading-relaxed text-[rgba(var(--fg),0.70)]">
            {step.caption}
          </div>

          <div className="mt-4 space-y-2 text-[13px] leading-relaxed text-[rgba(var(--fg),0.75)]">
            {step.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.02), 0 0 80px rgba(255,255,255,0.04)",
        }}
      />
    </article>
  );
}
