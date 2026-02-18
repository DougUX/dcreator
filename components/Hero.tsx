"use client";

import { useEffect, useMemo, useRef } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import IntroBackgroundVideo from "./IntroBackgroundVideo";
import LogoMark from "./LogoMark";
import { useI18n } from "@/components/I18nProvider";

export default function Hero() {
  const { t } = useI18n();
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (isTouch) return;

    let raf = 0;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    const update = () => {
      const bg = bgRef.current;
      const h1 = headlineRef.current;

      if (!bg || !h1) return;

      const vh = window.innerHeight || 1;
      const y = window.scrollY || 0;
      const p = clamp(y / vh, 0, 1);

      const bgY = -p * 60;
      bg.style.transform = `translate3d(0, ${bgY}px, 0)`;

      const lines = h1.querySelectorAll<HTMLElement>("[data-hero-line]");
      lines.forEach((line, i) => {
        const lineY = p * (12 + i * 10);
        line.style.transform = `translate3d(0, ${lineY}px, 0)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const h1 = headlineRef.current;
    const disp = dispRef.current;
    if (!h1 || !disp) return;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf = 0;
    let px = 0;
    let py = 0;
    let lastPX = 0;
    let lastPY = 0;
    let scale = 0;
    let targetScale = 0;

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
    };

    const loop = () => {
      const r = h1.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.5;

      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.hypot(dx, dy);

      const influence = clamp(1 - dist / 520, 0, 1);
      const v = Math.hypot(px - lastPX, py - lastPY);
      lastPX = px;
      lastPY = py;

      targetScale = influence * (18 + clamp(v * 0.45, 0, 34));
      scale = lerp(scale, targetScale, 0.12);

      disp.setAttribute("scale", scale.toFixed(2));

      raf = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = window.requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="hero-warp" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" seed="2" result="noise" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div ref={bgRef} className="absolute inset-0 -z-10">
        <IntroBackgroundVideo src="/intro.mp4" />
      </div>
      <Container className="relative z-10">
        <Reveal>
          <div className="grid min-h-[calc(100svh-72px)] items-center gap-10 pt-16 sm:pt-20 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative">
                <h1
                  ref={headlineRef}
                  className="relative z-10 rgb-heading rgb-heading-strong text-[15vw] font-semibold leading-[0.92] tracking-tight will-change-transform sm:text-[96px] lg:text-[110px] xl:text-[128px]"
                  style={isTouch ? undefined : { filter: "url(#hero-warp)" }}
                >
                  <span data-hero-line className="block will-change-transform">
                    {t("hero.h1.l1")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4">
                    {t("hero.h1.l2")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4">
                    {t("hero.h1.l3")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4">
                    {t("hero.h1.l4")}
                  </span>
                </h1>

                <div className="mt-10 flex flex-wrap gap-3">
                  <MagneticButton>
                    <a
                      href="#work"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-[rgb(var(--fg))] px-6 text-[13px] font-medium text-[rgb(var(--bg))] hover:opacity-90 transition"
                    >
                      {t("hero.cta.work")}
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <a
                      href="#contact"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/60 px-6 text-[13px] font-medium hover:bg-[rgb(var(--card))] transition backdrop-blur"
                    >
                      {t("hero.cta.talk")}
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:pt-6">
              <div className="grid gap-6">
                <div className="text-[13px] leading-relaxed text-[rgb(var(--fg))] max-w-[320px]">
                  {t("hero.blurb1")}
                </div>

                <div className="text-[13px] leading-relaxed text-[rgb(var(--fg))] max-w-[360px]">
                  {t("hero.blurb2")}
                </div>

                <div className="-mt-3 text-[rgb(var(--fg))] opacity-85">
                  <LogoMark size={90} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}