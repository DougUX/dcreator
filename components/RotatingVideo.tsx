"use client";

import { useEffect, useRef, useState } from "react";

type RotatingVideoProps = {
  src?: string;
  size?: number;
  className?: string;
  speedDegPerSec?: number;
};

export default function RotatingVideo({
  src,
  size = 180,
  className,
  speedDegPerSec = 18,
}: RotatingVideoProps) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const loop = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;

      angleRef.current = (angleRef.current + dt * speedDegPerSec) % 360;
      setAngle(angleRef.current);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speedDegPerSec]);

  return (
    <div
      className={
        "relative grid place-items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden" +
        (className ? ` ${className}` : "")
      }
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {src ? (
          <video
            className="h-full w-full object-cover"
            src={src}
            muted
            playsInline
            autoPlay
            loop
          />
        ) : (
          <div className="h-full w-full bg-[rgb(var(--bg))]" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/5 dark:ring-white/10" />
    </div>
  );
}
