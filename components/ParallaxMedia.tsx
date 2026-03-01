"use client";

import { useEffect, useMemo, useRef } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
}

export default function ParallaxMedia({
  children,
  className = "",
  strength = 40
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const disabled = useMemo(() => {
    if (typeof window === "undefined") return true;
    return prefersReducedMotion() || isCoarsePointer();
  }, []);

  useEffect(() => {
    if (disabled) return;

    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    let raf = 0;

    const loop = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // progress 0 when top hits bottom of viewport, 1 when bottom hits top
      const total = vh + r.height;
      const raw = (vh - r.top) / Math.max(1, total);
      const p = clamp(raw, 0, 1);

      const y = (p - 0.5) * strength;
      inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;

      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [disabled, strength]);

  return (
    <div ref={wrapRef} className={"relative overflow-hidden " + className}>
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
