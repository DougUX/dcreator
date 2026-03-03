"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Red_Hat_Display } from "next/font/google";

const logoFont = Red_Hat_Display({ subsets: ["latin"], weight: ["300"], display: "swap" });

export default function CursorFollower() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const style = document.createElement("style");
    style.id = "hide-system-cursor";
    style.textContent = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    let raf = 0;
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let hover = false;
    let cursorText = "";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const findCursorText = (x: number, y: number) => {
      // Find the element exactly under the cursor
      const el = document.elementFromPoint(x, y);
      if (!el) return "";

      // Look for data-cursor-text on this element or its closest parent
      const parentWithText = el.closest('[data-cursor-text]');
      if (parentWithText) {
        return parentWithText.getAttribute('data-cursor-text') || "";
      }
      return "";
    };

    const updateTextLabel = () => {
      const newText = findCursorText(target.x, target.y);
      if (newText !== cursorText) {
        cursorText = newText;
        if (textRef.current) {
          textRef.current.innerText = cursorText;
          // Smoothly toggle visibility based on if text exists
          textRef.current.style.opacity = cursorText ? "1" : "0";
          textRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y + 24}px, 0) translate(-50%, 0) scale(${cursorText ? 1 : 0.9})`;
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      updateTextLabel();

      // Check if cursor should be forcefully hidden
      const el = e.target as Element | null;
      const shouldHide = el && el.closest('[data-hide-cursor="true"]');

      if (dotRef.current) dotRef.current.style.opacity = shouldHide ? "0" : "1";
      if (ringRef.current) ringRef.current.style.opacity = shouldHide ? "0" : "0.65";
    };

    const onScroll = () => {
      // Re-evaluate the element under the static cursor when scrolling
      updateTextLabel();
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      hover = Boolean(t.closest('a,button,[role="button"],input,textarea,select,label'));
    };

    const onOut = () => {
      hover = false;
    };

    const loop = () => {
      pos.x = target.x;
      pos.y = target.y;
      ring.x = lerp(ring.x, target.x, 0.16);
      ring.y = lerp(ring.y, target.y, 0.16);

      const dot = dotRef.current;
      const ringEl = ringRef.current;
      const textEl = textRef.current;

      if (dot) {
        dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringEl) {
        const s = hover ? 1.25 : 1;
        ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${s})`;
      }
      if (textEl && cursorText) {
        textEl.style.transform = `translate3d(${pos.x}px, ${pos.y + 24}px, 0) translate(-50%, 0) scale(1)`;
      }

      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = window.requestAnimationFrame(loop);

    return () => {
      const s = document.getElementById("hide-system-cursor");
      if (s) s.remove();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div ref={rootRef} data-cursor-follower className="pointer-events-none fixed inset-0 z-[99999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border border-[rgb(var(--cursor-ring))] mix-blend-difference"
        style={{
          opacity: 0.65,
          boxShadow:
            "-1.5px 0 0 rgba(255,0,0,0.60), 1.5px 0 0 rgba(0,180,255,0.60), 0 0 12px rgba(255,0,0,0.18), 0 0 12px rgba(0,180,255,0.18), 0 0 22px rgba(255,0,0,0.08), 0 0 22px rgba(0,180,255,0.08), 0 0 40px rgba(255,255,255,0.04)",
          transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)"
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[rgb(var(--cursor))] mix-blend-difference"
        style={{ transform: "translate3d(-100px,-100px,0) translate(-50%,-50%)" }}
      />

      <span
        ref={textRef}
        className={[
          logoFont.className,
          "absolute left-0 top-0 text-[11px] font-medium uppercase tracking-[0.2em] text-white pointer-events-none drop-shadow-md transition-all duration-300 pointer-events-none whitespace-nowrap mix-blend-difference"
        ].join(" ")}
        style={{
          opacity: 0,
          transform: "translate3d(-100px,-100px,0) translate(-50%, 0) scale(0.9)",
          willChange: "transform, opacity"
        }}
      ></span>
    </div>
  );
}