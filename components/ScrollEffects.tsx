"use client";

import { useEffect, useRef } from "react";

export default function ScrollEffects({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const isTouch = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    if (isTouch) return;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    let lastY = window.scrollY || 0;
    let v = 0;
    let skew = 0;

    const loop = () => {
      const y = window.scrollY || 0;
      const dy = y - lastY;
      lastY = y;

      v = lerp(v, dy, 0.12);

      const targetSkew = clamp(v * 0.08, -5, 5);
      skew = lerp(skew, targetSkew, 0.14);

      el.style.transform = `translate3d(0, 0, 0) skewY(${skew.toFixed(3)}deg)`;

      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      <div ref={wrapRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
