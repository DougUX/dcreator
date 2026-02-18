"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function RgbScrollHeading({
  children,
  className,
  once = false,
  dataText
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  dataText?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const triggeredRef = useRef(false);
  const prevTopRef = useRef<number | null>(null);
  const inViewRef = useRef(false);
  const scrollOffTimeoutRef = useRef<number | null>(null);

  const resolvedText = useMemo(() => {
    if (typeof dataText === "string") return dataText;
    if (typeof children === "string") return children;
    return "";
  }, [children, dataText]);

  const observerOpts = useMemo(
    () => ({
      root: null,
      rootMargin: "0px 0px -35% 0px",
      threshold: 0.12
    }),
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let to = 0;

    const onTrigger = () => {
      if (once && triggeredRef.current) return;
      triggeredRef.current = true;
      setScrolling(true);
      window.clearTimeout(to);
      to = window.setTimeout(() => setScrolling(false), 1100);
    };

    const computeInView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const topGate = vh * 0.85;
      const bottomGate = vh * 0.15;
      return r.top < topGate && r.bottom > bottomGate;
    };

    const crossedTriggerLine = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const triggerY = vh * 0.62;

      const prevTop = prevTopRef.current;
      prevTopRef.current = r.top;

      if (prevTop === null) return false;
      return prevTop > triggerY && r.top <= triggerY;
    };

    let raf = 0;
    let pollRaf = 0;
    let lastPoll = 0;
    const check = () => {
      raf = 0;
      inViewRef.current = computeInView();
      if (crossedTriggerLine()) onTrigger();
    };

    const scheduleCheck = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(check);
    };

    prevTopRef.current = el.getBoundingClientRect().top;
    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    const w = window as unknown as {
      __lenis?: {
        on?: (evt: string, cb: () => void) => void;
        off?: (evt: string, cb: () => void) => void;
      };
    };

    const onLenisScroll = () => {
      scheduleCheck();
    };

    w.__lenis?.on?.("scroll", onLenisScroll);

    const poll = (t: number) => {
      if (t - lastPoll > 120) {
        lastPoll = t;
        check();
      }
      pollRaf = window.requestAnimationFrame(poll);
    };
    pollRaf = window.requestAnimationFrame(poll);

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(() => {
        scheduleCheck();
      }, observerOpts);
      io.observe(el);
    }

    return () => {
      window.clearTimeout(to);
      if (raf) window.cancelAnimationFrame(raf);
      if (pollRaf) window.cancelAnimationFrame(pollRaf);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      w.__lenis?.off?.("scroll", onLenisScroll);
      io?.disconnect();
    };
  }, [observerOpts, once, reduceMotion]);

  useEffect(() => {
    const next = hovered || (scrolling && inViewRef.current);
    setActive(next);
  }, [hovered, reduceMotion, scrolling]);

  useEffect(() => {
    if (!scrolling) return;

    if (scrollOffTimeoutRef.current) {
      window.clearTimeout(scrollOffTimeoutRef.current);
    }

    scrollOffTimeoutRef.current = window.setTimeout(() => {
      setScrolling(false);
    }, 170);

    return () => {
      if (scrollOffTimeoutRef.current) {
        window.clearTimeout(scrollOffTimeoutRef.current);
        scrollOffTimeoutRef.current = null;
      }
    };
  }, [scrolling]);

  return (
    <span
      ref={ref}
      data-text={resolvedText}
      onPointerEnter={() => {
        setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
      }}
      onFocus={() => {
        setHovered(true);
      }}
      onBlur={() => {
        setHovered(false);
      }}
      className={["rgb-glitch", active ? "rgb-glitch-active" : "", className ?? ""].join(" ")}
    >
      {children}
    </span>
  );
}
