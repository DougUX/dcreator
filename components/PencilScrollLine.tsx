"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function mulberry32(seed: number) {
  return function rand() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildFreehandPath(seed: string, width = 1000, height = 26) {
  const rand = mulberry32(seedFromString(seed));
  const mid = height * (0.55 + (rand() - 0.5) * 0.18);
  const amp = height * (0.18 + rand() * 0.18);
  const rough = 0.35 + rand() * 0.35;
  const steps = 26;

  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const n = (rand() - 0.5) * 2;
    const wave = Math.sin((i / steps) * Math.PI * (2.2 + rand() * 1.4));
    const y = mid + wave * amp * 0.45 + n * amp * rough;
    pts.push({ x, y });
  }

  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const cx = (p0.x + p1.x) * 0.5;
    const cy = (p0.y + p1.y) * 0.5;
    d += ` Q ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)}`;
  }

  const tailJitter = (rand() - 0.5) * amp * 0.55;
  d += ` T ${width.toFixed(2)} ${(mid + tailJitter).toFixed(2)}`;

  return { d, width, height };
}

export default function PencilScrollLine({ seed = "section", className = "" }: { seed?: string; className?: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const lengthRef = useRef(1);
  const scrollingRef = useRef(false);
  const hideTimerRef = useRef<number | null>(null);

  const shape = useMemo(() => buildFreehandPath(seed), [seed]);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;

    const len = p.getTotalLength();
    lengthRef.current = len;

    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  }, [shape.d]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = hostRef.current;
      const p = pathRef.current;
      if (!el || !p) return;

      const wrapper = (el.closest("div[id]") ?? el.parentElement ?? el) as HTMLElement;
      const top = wrapper.offsetTop;
      const h = wrapper.offsetHeight || 1;
      const y = window.scrollY || 0;

      const progress = clamp((y - top) / h, 0, 1);
      const t = clamp((progress - 0.55) / 0.42, 0, 1);

      const shouldShow = scrollingRef.current && t > 0.001 && t < 0.999;
      el.style.opacity = shouldShow ? "1" : "0";

      const len = lengthRef.current || 1;
      p.style.strokeDashoffset = reduceMotion ? "0" : `${(1 - t) * len}`;
    };

    const onScroll = () => {
      scrollingRef.current = true;
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        scrollingRef.current = false;
        update();
      }, 140);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      if (hideTimerRef.current != null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      className={["pointer-events-none absolute inset-x-0 bottom-4 z-20", className].join(" ")}
      aria-hidden="true"
      style={{ opacity: 0, transition: "opacity 220ms ease" }}
    >
      <svg
        viewBox={`0 0 ${shape.width} ${shape.height}`}
        className="h-7 w-full"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path ref={pathRef} d={shape.d} className="pencil-line" style={{ filter: "blur(0.15px)" }} />
      </svg>
    </div>
  );
}
