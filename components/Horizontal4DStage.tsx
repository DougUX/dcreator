"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import StageFrame from "@/components/StageFrame";
import Slide4D, { type DepthMultipliers } from "@/components/Slide4D";
import TimelineNav from "@/components/TimelineNav";
import { slides } from "@/lib/slides";
import { clamp } from "@/lib/math";
import { useHorizontalInertia } from "@/lib/useHorizontalInertia";

// ===== Tuning constants (requested) =====
export const SLIDE_W = 980;
export const GAP = 90;
export const INERTIA_LERP = 0.105;
export const SNAP_DELAY_MS = 150;
export const DEPTH_MULTIPLIERS: DepthMultipliers = {
  A: 0.25,
  B: 0.45,
  C: 0.75,
  D: 1.1,
  E: 0.9,
};
export const MOUSE_PARALLAX_STRENGTH = 14;

export default function Horizontal4DStage() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const years = useMemo(() => slides.map((s) => s.year), []);

  // Responsive slideW based on the stage frame width.
  const [slideW, setSlideW] = useState(SLIDE_W);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      // Keep it weighty, but responsive.
      setSlideW(clamp(Math.round(w * 0.84), 720, SLIDE_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { api, stride } = useHorizontalInertia({
    slideCount: slides.length,
    slideW,
    gap: GAP,
    inertiaLerp: INERTIA_LERP,
    snapDelayMs: SNAP_DELAY_MS,
    onIndexChange: setActive,
  });

  const [stageX, setStageX] = useState(0);
  const [stageV, setStageV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setStageX(api.getX());
      setStageV(api.getV());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [api]);

  return (
    <section
      className="relative w-full bg-black py-20"
      style={{
        backgroundColor: "#000",
      }}
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-[0.34em] text-white/55">From Vision to Reality</div>
          <div className="mt-3 text-[28px] font-semibold tracking-tight text-white">
            Crafted With Intelligence &amp; Soul.
          </div>
        </div>

        <div
          ref={(el) => {
            stageRef.current = el;
            api.bindRef(el);
          }}
          className="stage-root relative"
          style={{
            cursor: "grab",
          }}
          onPointerMove={(e) => {
            const el = stageRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const nx = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1;
            const ny = ((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1;
            setMouse({ x: nx, y: ny });
          }}
          onPointerLeave={() => setMouse({ x: 0, y: 0 })}
        >
          <StageFrame className="h-[70vh] min-h-[520px]">
            <div className="relative h-[70vh] min-h-[520px]">
              {slides.map((slide, i) => {
                const isActive = i === active;
                return (
                  <Slide4D
                    key={slide.year}
                    slide={slide}
                    index={i}
                    stride={stride}
                    stageX={stageX}
                    stageV={stageV}
                    isActive={isActive}
                    depth={DEPTH_MULTIPLIERS}
                    mouse={mouse}
                    mouseStrength={MOUSE_PARALLAX_STRENGTH}
                  />
                );
              })}

              {/* Bottom timeline nav (inside stage) */}
              <div className="absolute inset-x-10 bottom-6">
                <TimelineNav years={years} activeIndex={active} onSelect={(i) => api.goToIndex(i)} />
              </div>

              {/* Edge fade inside stage */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-[linear-gradient(to_right,rgba(0,0,0,0.95),rgba(0,0,0,0))]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-[linear-gradient(to_left,rgba(0,0,0,0.95),rgba(0,0,0,0))]" />
            </div>
          </StageFrame>

          <style jsx>{`
            .stage-root.is-grabbing {
              cursor: grabbing;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
