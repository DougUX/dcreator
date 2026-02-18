"use client";

import { useRef, useState } from "react";

export default function MagneticButton({
  children,
  className = "",
  strength = 18
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setXy({
      x: dx / (r.width / strength),
      y: dy / (r.height / strength)
    });
  };

  const onLeave = () => setXy({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate3d(${xy.x}px, ${xy.y}px, 0)` }}
      className={"inline-block transition-transform duration-200 " + className}
    >
      {children}
    </div>
  );
}