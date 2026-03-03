"use client";

import { useEffect, useMemo, useRef } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import AnimatedButton from "./AnimatedButton";
import IntroBackgroundVideo from "./IntroBackgroundVideo";
import LogoMark from "./LogoMark";
import { useI18n } from "@/components/I18nProvider";
import { Caveat } from "next/font/google";

const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

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

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10 bg-[rgb(var(--bg))]">
        <IntroBackgroundVideo src="/intro.mp4" />
      </div>
      <Container className="relative z-10">
        <Reveal>
          <div className="grid min-h-[calc(100svh-72px)] items-center gap-12 sm:gap-16 pt-28 sm:pt-32 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative">
                <h1
                  ref={headlineRef}
                  className="relative z-10 rgb-heading rgb-heading-strong text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tighter font-black uppercase will-change-transform"
                >
                  <span data-hero-line className="block will-change-transform text-white">
                    {t("hero.h1.l1")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4 text-white">
                    {t("hero.h1.l2")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4 text-white">
                    {t("hero.h1.l3")}
                  </span>
                  <span data-hero-line className="mt-3 block will-change-transform sm:mt-4 text-[rgb(var(--fg))]">
                    {t("hero.h1.l4")}
                  </span>
                </h1>
              </div>
            </div>

            <div className="lg:col-span-4 lg:pt-6 mt-4 lg:mt-0">
              <div className="grid gap-8">
                <div className="text-[13px] leading-relaxed text-[rgb(var(--fg))] max-w-[320px]">
                  {t("hero.blurb1")}
                </div>

                <div className="text-[13px] leading-relaxed text-[rgb(var(--fg))] max-w-[360px]">
                  {t("hero.blurb2")}
                </div>

                <div className="-mt-2 mb-4 text-[rgb(var(--fg))] opacity-85">
                  <LogoMark size={90} />
                </div>

                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <AnimatedButton
                      href="#work"
                      variant="primary"
                    >
                      {t("hero.cta.work")}
                    </AnimatedButton>
                  </MagneticButton>

                  <div className="relative group">
                    <MagneticButton>
                      <AnimatedButton
                        href="#book"
                        variant="secondary"
                      >
                        {t("hero.cta.talk")}
                      </AnimatedButton>
                    </MagneticButton>

                    <div
                      className="absolute top-[calc(100%+8px)] right-[50%] w-[320px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-50 flex items-start justify-end gap-2 pr-6"
                    >
                      <div className={`text-white text-[22px] md:text-[26px] transform -rotate-[10deg] mt-10 whitespace-nowrap ${caveatFont.className} leading-none tracking-wide text-right`}>
                        Book a 15-min call to <br />
                        <span className="inline-block mt-2">explore your needs.</span>
                      </div>
                      <svg width="60" height="80" viewBox="0 0 100 100" className="opacity-90 transform -translate-y-4 flex-shrink-0">
                        <path d="M10,80 C 40,80 60,60 85,15" stroke="white" fill="transparent" strokeWidth="2" strokeLinecap="round" />
                        <path d="M70,25 L85,15 L90,30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}