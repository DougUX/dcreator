"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mqReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia?.("(pointer: coarse)");
    const mqSmall = window.matchMedia?.("(max-width: 1023px)");

    let reduceMotion = mqReduce?.matches ?? false;
    let coarse = mqCoarse?.matches ?? false;
    let small = mqSmall?.matches ?? false;

    const updateFlags = () => {
      reduceMotion = mqReduce?.matches ?? false;
      coarse = mqCoarse?.matches ?? false;
      small = mqSmall?.matches ?? false;
    };

    mqReduce?.addEventListener?.("change", updateFlags);
    mqCoarse?.addEventListener?.("change", updateFlags);
    mqSmall?.addEventListener?.("change", updateFlags);
    window.addEventListener("resize", updateFlags);
    updateFlags();

    let lenis: Lenis | null = null;
    let raf = 0;

    const startLenisIfAllowed = () => {
      if (lenis) return;
      if (reduceMotion || coarse) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9
      });

      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      const loop = (time: number) => {
        if (lenis) lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    startLenisIfAllowed();

    return () => {
      mqReduce?.removeEventListener?.("change", updateFlags);
      mqCoarse?.removeEventListener?.("change", updateFlags);
      mqSmall?.removeEventListener?.("change", updateFlags);
      window.removeEventListener("resize", updateFlags);

      cancelAnimationFrame(raf);
      const w = window as unknown as { __lenis?: Lenis };
      if (lenis && w.__lenis === lenis) delete w.__lenis;
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}