"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

export default function Reveal({
  children,
  delay = 0,
  stagger
}: {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mounted || reduceMotion) return;
    if (revealed) return;

    const el = rootRef.current;
    if (!el) {
      const t = window.setTimeout(() => setRevealed(true), 350);
      return () => window.clearTimeout(t);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.12, rootMargin: "-12% 0px -45% 0px" }
    );
    obs.observe(el);

    const fallback = window.setTimeout(() => {
      setRevealed(true);
      obs.disconnect();
    }, 2000);

    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, [mounted, reduceMotion, revealed]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    return <>{children}</>;
  }

  const containerVariants = {
    hidden: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ?? 0,
        delayChildren: delay,
      },
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ?? 0,
        delayChildren: delay,
      },
    },
  } as const;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 46,
      transform: "translate3d(0, 46px, 0) scale(0.965) rotateX(4deg)",
    },
    show: {
      opacity: 1,
      y: 0,
      transform: "translate3d(0, 0px, 0) scale(1) rotateX(0deg)",
    },
  } as const;

  const finalStyle = revealed ? { transform: "none" } : undefined;

  if (stagger && stagger > 0) {
    return (
      <motion.div
        key={reduceMotion ? "reduce" : "full"}
        ref={rootRef}
        data-reveal
        style={finalStyle}
        variants={containerVariants}
        initial={revealed ? false : "hidden"}
        animate={revealed ? "show" : "hidden"}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data-reveal
            style={finalStyle}
            variants={itemVariants}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={reduceMotion ? "reduce" : "full"}
      ref={rootRef}
      data-reveal
      style={finalStyle}
      initial={
        revealed
          ? { opacity: 1, y: 0 }
          : {
              opacity: 0,
              y: 46,
              transform: "translate3d(0, 46px, 0) scale(0.965) rotateX(4deg)",
            }
      }
      animate={
        revealed
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: 0,
              transform: "translate3d(0, 0px, 0) scale(1) rotateX(0deg)",
            }
      }
      transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}