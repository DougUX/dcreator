"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Pt = { x: number; y: number };

export default function CursorFollower() {
  const [pulsing, setPulsing] = useState(false);
  const pulseTimeoutRef = useRef<number | null>(null);
  const dotPosRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const mainPosRef = useRef<HTMLDivElement | null>(null);
  const mainBlobRef = useRef<HTMLDivElement | null>(null);
  const anchorPosRef = useRef<HTMLDivElement | null>(null);
  const anchorBlobRef = useRef<HTMLDivElement | null>(null);
  const aboutPosRef = useRef<HTMLDivElement | null>(null);
  const aboutRingRef = useRef<HTMLDivElement | null>(null);
  const aboutPtRef = useRef<Pt>({ x: -100, y: -100 });
  const anchorPtRef = useRef<Pt>({ x: -100, y: -100 });
  const interactiveRef = useRef(false);
  const aboutRef = useRef(false);

  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (isTouch) return;

    document.documentElement.classList.add("cursor-none");

    const edgeThreshold = 80;
    const edgeInset = 10;
    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const move = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const x = e.clientX;
      const y = e.clientY;

      const dLeft = x;
      const dRight = w - x;
      const dTop = y;
      const dBottom = h - y;

      const dEdge = Math.min(dLeft, dRight, dTop, dBottom);
      const edgeFactor = 1 - clamp(dEdge / edgeThreshold, 0, 1);

      const baseSize = interactiveRef.current ? 22 : 8;
      const mainSize = baseSize + edgeFactor * 10;
      const anchorSize = baseSize + edgeFactor * 22;

      const aboutPos = aboutPosRef.current;
      const aboutRing = aboutRingRef.current;
      if (aboutPos && aboutRing) {
        if (aboutRef.current) {
          aboutPos.style.opacity = "1";
          const prevAbout = aboutPtRef.current;
          const nextAboutX = lerp(prevAbout.x, x, 0.22);
          const nextAboutY = lerp(prevAbout.y, y, 0.22);
          aboutPtRef.current = { x: nextAboutX, y: nextAboutY };
          aboutPos.style.left = `${nextAboutX}px`;
          aboutPos.style.top = `${nextAboutY}px`;
        } else {
          aboutPos.style.opacity = "0";
          aboutPtRef.current = { x, y };
        }
      }

      const dotPos = dotPosRef.current;
      const dot = dotRef.current;
      if (dotPos && dot) {
        dotPos.style.left = `${x}px`;
        dotPos.style.top = `${y}px`;
        dot.style.width = `${mainSize}px`;
        dot.style.height = `${mainSize}px`;
      }

      const mainPos = mainPosRef.current;
      const mainBlob = mainBlobRef.current;
      if (mainPos && mainBlob) {
        mainPos.style.left = `${x}px`;
        mainPos.style.top = `${y}px`;
        mainBlob.style.width = `${mainSize}px`;
        mainBlob.style.height = `${mainSize}px`;
      }

      const anchorPos = anchorPosRef.current;
      const anchorBlob = anchorBlobRef.current;
      if (!anchorPos || !anchorBlob) return;

      if (edgeFactor <= 0.001) {
        anchorPos.style.opacity = "0";
        return;
      }

      anchorPos.style.opacity = "1";

      anchorBlob.style.width = `${anchorSize}px`;
      anchorBlob.style.height = `${anchorSize}px`;

      const minLR = Math.min(dLeft, dRight);
      const minTB = Math.min(dTop, dBottom);

      let ax = x;
      let ay = y;
      if (minLR < minTB) {
        ax = dLeft < dRight ? edgeInset : w - edgeInset;
        ay = y;
      } else {
        ax = x;
        ay = dTop < dBottom ? edgeInset : h - edgeInset;
      }

      const prev = anchorPtRef.current;
      const t = 0.18 + edgeFactor * 0.24;
      const nextAx = lerp(prev.x, ax, t);
      const nextAy = lerp(prev.y, ay, t);
      anchorPtRef.current = { x: nextAx, y: nextAy };

      anchorPos.style.left = `${nextAx}px`;
      anchorPos.style.top = `${nextAy}px`;

      const vx = x - nextAx;
      const vy = y - nextAy;
      const vlen = Math.hypot(vx, vy);

      const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
      const stretch = clamp(vlen / 240, 0, 1);
      const baseSy = 1 + edgeFactor * 0.35 + stretch * 0.35;
      const translate = clamp(vlen / 14, 0, 10);
      const xform = `rotate(${angle}deg) translateX(${translate}px) scaleY(${baseSy})`;

      anchorBlob.style.setProperty("--cursor-xform", xform);
      anchorBlob.style.transform = xform;
    };

    const down = () => {
      setPulsing(true);
      if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = window.setTimeout(() => setPulsing(false), 160);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const cursorEl = t.closest('[data-cursor]') as HTMLElement | null;
      const cursorMode = cursorEl?.getAttribute("data-cursor") ?? "";
      aboutRef.current = cursorMode === "about";

      const hit = t.closest('a,button,[role="button"],input,textarea,select,label');
      interactiveRef.current = Boolean(hit);
    };

    const out = () => {
      interactiveRef.current = false;
      aboutRef.current = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      if (pulseTimeoutRef.current) window.clearTimeout(pulseTimeoutRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const ringShadow =
    "0 0 0 1px rgb(var(--cursor-ring) / 0.85), 0 0 10px 3px rgb(var(--cursor-ring) / 0.30)";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={aboutPosRef}
        className="absolute left-0 top-0 z-[2] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 mix-blend-difference"
        style={{ opacity: 0 }}
      >
        <div
          ref={aboutRingRef}
          className="flex h-24 w-24 items-center justify-center rounded-full border border-white text-[11px] uppercase tracking-[0.24em] text-white"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.45), 0 0 24px 10px rgba(255,255,255,0.12)" }}
        >
          <span className="translate-x-[0.12em]">ABOUT</span>
        </div>
      </div>

      <div className="absolute inset-0 z-0" style={{ filter: "blur(4px) contrast(18)", transform: "translateZ(0)" }}>
        <div
          ref={anchorPosRef}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
          style={{ opacity: 0 }}
        >
          <div ref={anchorBlobRef} className="rounded-full bg-[rgb(var(--cursor))] opacity-90" style={{ boxShadow: ringShadow }} />
        </div>

        <div ref={mainPosRef} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
          <div
            ref={mainBlobRef}
            className={[
              "rounded-full bg-[rgb(var(--cursor))] opacity-90",
              "transition-transform duration-150",
              "scale-100"
            ].join(" ")}
            style={{ boxShadow: ringShadow }}
          />
        </div>
      </div>

      <div
        ref={dotPosRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          ref={dotRef}
          className={[
            "rounded-full bg-[rgb(var(--cursor))] opacity-90",
            "transition-transform duration-150",
            pulsing ? "scale-[2.2]" : "scale-100"
          ].join(" ")}
          style={{ boxShadow: ringShadow }}
        />
      </div>
    </div>
  );
}