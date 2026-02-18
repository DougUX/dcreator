"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { clamp, lerp } from "@/lib/math";

export type HorizontalInertiaOptions = {
  slideCount: number;
  slideW: number;
  gap: number;
  inertiaLerp: number;
  snapDelayMs: number;
  onIndexChange?: (index: number) => void;
};

export type HorizontalInertiaApi = {
  bindRef: (el: HTMLDivElement | null) => void;
  getX: () => number;
  getV: () => number;
  setXImmediate: (x: number) => void;
  goToIndex: (index: number) => void;
};

export function useHorizontalInertia({
  slideCount,
  slideW,
  gap,
  inertiaLerp,
  snapDelayMs,
  onIndexChange,
}: HorizontalInertiaOptions) {
  const stride = slideW + gap;
  const maxX = Math.max(0, (slideCount - 1) * stride);

  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lastT = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTarget = useRef(0);

  const pointerId = useRef<number | null>(null);

  const snapTimer = useRef<number | null>(null);
  const activeIndex = useRef(0);

  const setActiveIndex = useCallback(
    (x: number) => {
      const idx = Math.round(x / stride);
      const clamped = clamp(idx, 0, slideCount - 1);
      if (clamped !== activeIndex.current) {
        activeIndex.current = clamped;
        onIndexChange?.(clamped);
      }
    },
    [onIndexChange, slideCount, stride]
  );

  const applyTransform = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    // Store progress on a CSS var for layers to read.
    el.style.setProperty("--stage-x", String(currentX.current));
  }, []);

  const stopRaf = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const scheduleSnap = useCallback(() => {
    if (snapTimer.current) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      const idx = Math.round(targetX.current / stride);
      const x = clamp(idx * stride, 0, maxX);

      const tweenObj = { value: targetX.current };
      gsap.to(tweenObj, {
        value: x,
        duration: 1.25,
        ease: "expo.out",
        onUpdate: () => {
          targetX.current = tweenObj.value;
        }
      });
    }, snapDelayMs);
  }, [maxX, snapDelayMs, stride]);

  const tick = useCallback(
    (t: number) => {
      const dt = Math.min(0.05, (t - lastT.current) / 1000);
      lastT.current = t;

      const x = lerp(currentX.current, targetX.current, 1 - Math.pow(1 - inertiaLerp, dt * 60));
      currentX.current = x;

      const dx = x - lastX.current;
      lastX.current = x;
      // px/sec (smoothed)
      const v = dt > 0 ? dx / dt : 0;
      velocity.current = lerp(velocity.current, v, Math.min(1, dt * 10));

      applyTransform();
      setActiveIndex(x);

      rafRef.current = requestAnimationFrame(tick);
    },
    [applyTransform, inertiaLerp, setActiveIndex]
  );

  const startRaf = useCallback(() => {
    if (rafRef.current) return;
    lastT.current = performance.now();
    lastX.current = currentX.current;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const setTarget = useCallback(
    (x: number) => {
      targetX.current = clamp(x, 0, maxX);
      startRaf();
      scheduleSnap();
    },
    [maxX, scheduleSnap, startRaf]
  );

  const bindRef = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (!el) return;
      startRaf();
    },
    [startRaf]
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      const el = elRef.current;
      if (!el) return;

      // Convert vertical wheel to horizontal scrub, but keep trackpad horizontal too.
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dx) < 0.5) return;
      e.preventDefault();
      setTarget(targetX.current + dx * 1.0);
    },
    [setTarget]
  );

  const onPointerDown = useCallback((e: PointerEvent) => {
    const el = elRef.current;
    if (!el) return;

    // Only start drag when the pointer down happens on the stage container itself.
    // We still allow clicks on interactive elements inside to go through.
    const target = e.target as HTMLElement | null;
    const interactive = target?.closest?.("button,a,input,textarea,select,[role='tab']");
    if (interactive) return;

    dragging.current = true;
    pointerId.current = e.pointerId;
    dragStartX.current = e.clientX;
    dragStartTarget.current = targetX.current;
    el.setPointerCapture(e.pointerId);
    el.classList.add("is-grabbing");

    if (snapTimer.current) window.clearTimeout(snapTimer.current);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = elRef.current;
    if (!el) return;
    if (!dragging.current) return;
    if (pointerId.current !== e.pointerId) return;

    const dx = e.clientX - dragStartX.current;
    setTarget(dragStartTarget.current - dx * 1.25);
  }, [setTarget]);

  const endDrag = useCallback(() => {
    const el = elRef.current;
    dragging.current = false;
    pointerId.current = null;
    el?.classList.remove("is-grabbing");
    scheduleSnap();
  }, [scheduleSnap]);

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      if (pointerId.current !== e.pointerId) return;
      endDrag();
    },
    [endDrag]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const idx = clamp(Math.round(targetX.current / stride) + dir, 0, slideCount - 1);
      setTarget(idx * stride);
    },
    [setTarget, slideCount, stride]
  );

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("wheel", onWheel as any);
      el.removeEventListener("pointerdown", onPointerDown as any);
      window.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUp as any);
      window.removeEventListener("pointercancel", onPointerUp as any);
      window.removeEventListener("keydown", onKeyDown as any);
    };
  }, [onKeyDown, onPointerDown, onPointerMove, onPointerUp, onWheel]);

  useEffect(() => {
    return () => {
      stopRaf();
      if (snapTimer.current) window.clearTimeout(snapTimer.current);
    };
  }, [stopRaf]);

  const api: HorizontalInertiaApi = useMemo(
    () => ({
      bindRef,
      getX: () => currentX.current,
      getV: () => velocity.current,
      setXImmediate: (x: number) => {
        currentX.current = clamp(x, 0, maxX);
        targetX.current = currentX.current;
        applyTransform();
        setActiveIndex(currentX.current);
      },
      goToIndex: (index: number) => {
        const idx = clamp(index, 0, slideCount - 1);

        const tweenObj = { value: targetX.current };
        gsap.to(tweenObj, {
          value: idx * stride,
          duration: 1.25,
          ease: "expo.out",
          onUpdate: () => {
            targetX.current = tweenObj.value;
          }
        });
        startRaf();
      },
    }),
    [applyTransform, bindRef, maxX, setActiveIndex, slideCount, startRaf, stride]
  );

  return { api, stride };
}
