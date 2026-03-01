"use client";

import { useEffect, useRef, useMemo } from "react";

/**
 * Olivier Larose–style parallax section.
 *
 * How it works:
 * - The outer wrapper uses `clip-path: inset(0 0 0 0)` so its background
 *   is clipped to the section bounds.
 * - Inside, a `position: fixed` background layer covers the full viewport.
 * - On scroll, the background layer translates vertically at a slower rate
 *   than the section, creating the parallax effect.
 * - When the section scrolls out, the clip-path hides the background,
 *   revealing the next section's background underneath.
 */
export default function ParallaxSection({
  children,
  className = "",
  bgClassName = "",
  bgStyle,
  speed = 0.3,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  bgStyle?: React.CSSProperties;
  speed?: number;
  id?: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const disabled = useMemo(() => {
    if (typeof window === "undefined") return true;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const coarse =
      window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    return reduce || coarse;
  }, []);

  useEffect(() => {
    if (disabled) return;

    const bg = bgRef.current;
    if (!bg) return;

    let raf = 0;

    const loop = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      bg.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [disabled, speed]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={"relative " + className}
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* parallax background — fixed to viewport, clipped by parent */}
      <div
        ref={bgRef}
        className={"fixed left-0 top-0 h-screen w-full will-change-transform " + bgClassName}
        style={{
          zIndex: -1,
          ...bgStyle,
        }}
      />

      {/* section content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
