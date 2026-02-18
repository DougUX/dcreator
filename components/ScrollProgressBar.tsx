"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const p = Math.max(0, Math.min(1, scrollTop / scrollable));

      bar.style.transform = `scaleX(${p})`;
      raf = window.requestAnimationFrame(update);
    };

    raf = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-[rgb(var(--fg))] opacity-80"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
