"use client";

import type { SlideData } from "@/lib/slides";
import { clamp, mapRange } from "@/lib/math";

export type DepthMultipliers = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
};

type Slide4DProps = {
  slide: SlideData;
  index: number;
  stride: number;
  stageX: number;
  stageV: number;
  isActive: boolean;
  depth: DepthMultipliers;
  mouse: { x: number; y: number };
  mouseStrength: number;
};

export default function Slide4D({
  slide,
  index,
  stride,
  stageX,
  stageV,
  isActive,
  depth,
  mouse,
  mouseStrength,
}: Slide4DProps) {
  const cx = index * stride;
  const rel = (stageX - cx) / stride;
  const dist = Math.min(1.6, Math.abs(rel));

  const fall = clamp(1 - dist / 1.25, 0, 1);
  const bgBlur = mapRange(dist, 0, 1.2, 8, 14);
  const heroBlur = mapRange(dist, 0, 1.2, 0, 1.1);

  const heroScale = mapRange(dist, 0, 1.2, 1.0, 0.978);
  const bgOpacity = mapRange(dist, 0, 1.2, 0.55, 0.40);

  const parX = mouse.x * mouseStrength;
  const parY = mouse.y * mouseStrength;

  const tx = (m: number) => -stageX * m + cx * m;

  // Layer lag / catch-up: layers react with delay proportional to velocity.
  // stageV is px/sec; scale into a small pixel offset.
  const vPx = clamp(stageV / 2200, -1, 1) * 48;
  const lag = (m: number) => vPx * (1.15 - m);

  return (
    <div className="absolute inset-0">
      {/* Layer A — Deep background portrait */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${tx(depth.A) + lag(depth.A) + parX * 0.15}px, ${parY * 0.10}px, 0) scale(${1.05 + (1 - fall) * 0.02})`,
          opacity: bgOpacity,
          filter: `blur(${bgBlur}px)`,
          transition: "opacity 220ms ease",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_30%,rgba(255,255,255,0.10),rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_75%_55%,rgba(255,255,255,0.06),rgba(0,0,0,0)_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),rgba(0,0,0,0)_35%,rgba(255,255,255,0.03))]" />
      </div>

      {/* Layer B — Mid haze */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${tx(depth.B) + lag(depth.B) + parX * 0.25}px, ${parY * 0.16}px, 0)`,
          opacity: 0.30 + fall * 0.18,
          filter: `blur(${11 + (1 - fall) * 5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_60%_35%,rgba(255,255,255,0.10),rgba(0,0,0,0)_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_40%_70%,rgba(255,255,255,0.06),rgba(0,0,0,0)_65%)]" />
      </div>

      {/* Layer C — Hero card */}
      <div
        className="absolute left-1/2 top-1/2 z-10 w-[60%] max-w-[420px] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(calc(-50% + ${(tx(depth.C) + lag(depth.C)) * 0.55}px), calc(-50% + ${parY * 0.18}px), 0) scale(${heroScale})`,
          filter: `blur(${heroBlur}px)`,
          transition: "filter 240ms ease",
        }}
      >
        <div
          className={[
            "group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40",
            "shadow-[0_30px_90px_-55px_rgba(0,0,0,0.95)]",
          ].join(" ")}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -inset-[40%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.18),transparent)] bg-[length:200%_200%] animate-metal-sweep" />
          </div>

          <div
            className="relative aspect-[4/5]"
            style={{
              transform: isActive ? `rotateX(${mouse.y * 1.6}deg) rotateY(${-mouse.x * 2.2}deg)` : "none",
              transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0)_42%,rgba(255,255,255,0.06))]" />
            <div className="absolute inset-0 opacity-55 bg-[radial-gradient(closest-side_at_35%_30%,rgba(255,255,255,0.16),rgba(0,0,0,0)_64%)]" />

            {/* single minimal glass slab */}
            <div
              className="absolute left-10 top-12 h-24 w-44 rounded-3xl border border-white/18 bg-white/4"
              style={{
                transform: `translate3d(${parX * 0.14}px, ${parY * 0.12}px, 0) rotate(${parX * 0.18}deg)`,
                boxShadow: "0 55px 90px -70px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.10)",
                backdropFilter: "blur(14px)",
              }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side_at_50%_60%,rgba(255,255,255,0.08),rgba(0,0,0,0)_72%)]" />
        </div>
      </div>

      {/* Layer D — Big spaced title */}
      <div
        className="absolute right-10 top-10 z-30 max-w-[60%] text-right"
        style={{
          transform: `translate3d(${tx(depth.D) + lag(depth.D) + parX * 0.65}px, ${parY * 0.28}px, 0)`,
          opacity: 0.35 + fall * 0.65,
        }}
      >
        <div className="text-[clamp(22px,3.3vw,54px)] font-semibold uppercase tracking-[0.28em] text-white/90">
          {slide.titleLine1}
        </div>
        <div className="mt-2 text-[clamp(22px,3.3vw,54px)] font-semibold uppercase tracking-[0.28em] text-white/70">
          {slide.titleLine2}
        </div>
      </div>

      {/* Layer E — Details */}
      <div
        className="absolute left-10 bottom-16 z-30 max-w-[42%]"
        style={{
          transform: `translate3d(${tx(depth.E) + lag(depth.E) + parX * 0.35}px, ${parY * 0.18}px, 0)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 520ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="text-[11px] uppercase tracking-[0.34em] text-white/60">{slide.caption}</div>
        <div className="mt-3 h-px w-10 bg-white/35" />
        <div className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-white/70">{slide.description}</div>
        <a
          href="#work"
          className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.28em] text-white/70 hover:text-white transition"
        >
          <span>View</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
