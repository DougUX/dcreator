"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string; // e.g. "/images/about.jpg"
  alt?: string;
  className?: string;
  strength?: number; // watery distortion strength (default 32)
  radius?: number; // reveal blob radius in % (default 20)
};

export default function AboutMeWaterReveal({
  src,
  alt = "About me",
  className = "",
  strength = 22,
  radius = 7,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // current & target for smooth follow
  const pos = useRef({ x: 50, y: 45 });
  const target = useRef({ x: 50, y: 45 });

  const [xy, setXy] = useState({ x: 50, y: 45 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      setIsHover(inside);
      if (!inside) return;

      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;

      target.current.x = Math.max(0, Math.min(100, x));
      target.current.y = Math.max(0, Math.min(100, y));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      // smooth follow
      pos.current.x += (target.current.x - pos.current.x) * 0.10;
      pos.current.y += (target.current.y - pos.current.y) * 0.10;

      setXy({ x: pos.current.x, y: pos.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[
        "absolute inset-0",
        "pointer-events-none",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={alt}
        >
          <defs>
            {/* Water distortion for the mask edge (more watery + animated) */}
            <filter id="water">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018"
                numOctaves="3"
                seed="12"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.018;0.022;0.018"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={strength}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <filter id="waterMask" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.038 0.016"
                numOctaves="3"
                seed="9"
                result="n1"
                stitchTiles="stitch"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.030 0.012;0.050 0.022;0.030 0.012"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="seed"
                  values="9;10;11;12;13;14;15"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed="21"
                result="n2"
                stitchTiles="stitch"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.010;0.016;0.010"
                  dur="4.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="seed"
                  values="21;22;23;24;25;26;27"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feBlend in="n1" in2="n2" mode="multiply" result="noise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={Math.max(18, strength * 1.35)}
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  attributeName="scale"
                  values="0.85;1.2;0.85"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>

            {/* Invert (negative) filter for the overlay image */}
            <filter id="invert">
              <feComponentTransfer>
                <feFuncR type="table" tableValues="1 0" />
                <feFuncG type="table" tableValues="1 0" />
                <feFuncB type="table" tableValues="1 0" />
              </feComponentTransfer>
            </filter>

            <filter id="waterRipple" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.012"
                numOctaves="2"
                seed="4"
                result="rip"
              >
                <animate
                  attributeName="seed"
                  values="4;5;6;7;8;9;10"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="baseFrequency"
                  values="0.010;0.014;0.010"
                  dur="4.8s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="rip"
                scale="8"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  attributeName="scale"
                  values="6;10;6"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>

            {/* Mask: distorted circle follows cursor */}
            <mask
              id="revealMask"
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="140"
              height="140"
            >
              <rect x="-20" y="-20" width="140" height="140" fill="black" />
              <g filter="url(#waterMask)">
                <circle
                  cx={xy.x}
                  cy={xy.y}
                  r={radius}
                  fill="white"
                  opacity={isHover ? 1 : 0}
                />
              </g>
            </mask>

            {/* Vignette */}
            <radialGradient id="v" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
            </radialGradient>
          </defs>

          {/* Base image (normal) */}
          <image href={src} x="0" y="0" width="100" height="100" opacity="0" />

          <g mask="url(#revealMask)" style={{ mixBlendMode: "difference" }}>
            <rect x="-20" y="-20" width="140" height="140" fill="white" opacity="0.68" />
          </g>

          {/* Overlay image (negative) revealed through watery mask */}
          <g mask="url(#revealMask)">
            <image
              href={src}
              x="0"
              y="0"
              width="100"
              height="100"
              filter="url(#invert)"
              opacity="0.82"
            />
          </g>

          {/* Darken the reveal area slightly */}
          <g mask="url(#revealMask)">
            <rect x="-20" y="-20" width="140" height="140" fill="black" opacity="0.18" />
          </g>

          {/* Subtle vignette */}
          <rect x="0" y="0" width="100" height="100" fill="url(#v)" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}