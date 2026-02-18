"use client";

import { useEffect, useRef } from "react";

type IntroBackgroundVideoProps = {
  src: string;
  className?: string;
  maxRotateDeg?: number;
};

export default function IntroBackgroundVideo({
  src,
  className,
  maxRotateDeg = 8,
}: IntroBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Keep the background video in a fixed position (no cursor/hover tilt).
    // maxRotateDeg is kept for API compatibility but intentionally unused.
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1.06)";
  }, [maxRotateDeg]);

  return (
    <div className={"absolute inset-0 overflow-hidden" + (className ? ` ${className}` : "")}>
      <div ref={containerRef} className="absolute inset-[-10%] will-change-transform">
        <video
          className="h-full w-full object-cover"
          src={src}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[rgb(var(--bg))]/65 dark:bg-[rgb(var(--bg))]/55" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.05)_45%,rgba(0,0,0,0.10)_100%)] dark:[background:radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
