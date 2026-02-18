"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorVelocityVideo({
  src,
  className = "",
  speed = 0.015, // seconds per px moved
}: {
  src: string;
  className?: string;
  speed?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ready, setReady] = useState(false);
  const lastXRef = useRef<number | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      setReady(true);
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
    };

    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  const onPointerEnter = (e: React.PointerEvent) => {
    lastXRef.current = e.clientX;
    try {
      videoRef.current?.pause();
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const v = videoRef.current;
    if (!v || !ready) return;

    const lastX = lastXRef.current;
    lastXRef.current = e.clientX;

    if (lastX == null) return;
    const dx = e.clientX - lastX;

    const dur = v.duration || 0;
    if (!dur || Number.isNaN(dur)) return;

    // Move time forward/back based on dx
    const next = Math.min(dur, Math.max(0, (v.currentTime || 0) + dx * speed));
    try {
      v.currentTime = next;
    } catch {}
  };

  const onPointerLeave = () => {
    lastXRef.current = null;
  };

  return (
    <div
      ref={wrapRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={[
        "relative w-full overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]",
        className,
      ].join(" ")}
    >
      <video
        ref={videoRef}
        className="block h-auto w-full select-none"
        src={src}
        preload="metadata"
        playsInline
        muted
      />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-[rgb(var(--muted))]">
          Loading…
        </div>
      )}
    </div>
  );
}