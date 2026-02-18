"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  src: string; // e.g. "/videos/perfume.mp4"
  durationSec?: number; // optional; video metadata used if omitted
};

export default function InteractivePerfumeVideo({ src, durationSec }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [ready, setReady] = useState(false);
  const [metaDuration, setMetaDuration] = useState<number>(durationSec ?? 30);

  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [hover, setHover] = useState(false);

  // Tweak these to taste:
  const config = useMemo(
    () => ({
      // How tall the scroll “track” is (more = finer control)
      scrollTrackVh: 220,
      // Smoothness: higher = smoother but slower to catch up
      lerp: 0.12,
      // Keep video from fighting with user interactions
      clampStart: 0.001,
      clampEnd: 0.999,
    }),
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      const d = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : metaDuration;
      setMetaDuration(d);
      setReady(true);

      // Start at 0 to show first frame
      try {
        video.pause();
        video.currentTime = 0;
      } catch {}
    };

    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [metaDuration]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let current = 0;
    let target = 0;

    const tick = () => {
      // Scroll progress within wrapper
      const rect = wrap.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // When wrapper is in view, map progress from 0..1
      // start when top hits center-ish; end when bottom hits center-ish
      const start = viewportH * 0.15;
      const end = viewportH * 0.85;

      const total = rect.height - (end - start);
      const y = (start - rect.top) / Math.max(1, total);
      const p = Math.min(1, Math.max(0, y));

      const clamped = config.clampStart + p * (config.clampEnd - config.clampStart);
      target = clamped * metaDuration;

      // Lerp for smoothness
      current = current + (target - current) * config.lerp;

      // Seek only if ready
      if (ready && Number.isFinite(current)) {
        try {
          video.currentTime = current;
        } catch {}
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [ready, metaDuration, config]);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setCursor({ x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) });
  };

  return (
    <section
      ref={wrapRef}
      className="relative w-full bg-black"
      style={{ minHeight: `${config.scrollTrackVh}vh` }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl">
          {/* Video frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <video
              ref={videoRef}
              className="block w-full h-auto bg-black"
              src={src}
              muted
              playsInline
              preload="metadata"
            />
            {/* Subtle vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.55))]" />

            {/* Cursor light sweep (luxury “studio light” feeling) */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: hover ? 0.9 : 0.45,
                background: `radial-gradient(700px 500px at ${cursor.x * 100}% ${cursor.y *
                  100}%, rgba(255,255,255,0.14), rgba(255,255,255,0.06) 35%, rgba(0,0,0,0) 70%)`,
                mixBlendMode: "screen",
              }}
            />

            {/* Very subtle grain (premium texture) */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.9%22/%3E%3C/svg%3E')",
              }}
            />
          </div>

          {/* Micro label */}
          <div className="mt-4 flex items-center justify-between text-white/70 text-sm">
            <span className="tracking-wide">dCreator — Interactive Product Film</span>
            <span className="text-white/50">Scroll to scrub • Move cursor for light</span>
          </div>
        </div>
      </div>
    </section>
  );
}