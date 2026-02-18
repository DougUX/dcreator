"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { whyMeTimelineSteps } from "@/lib/timelineData";
import TimelineCard from "@/components/TimelineCard";
import EnergyLineScene from "@/components/webgl/EnergyLineScene";

export default function WhyMeWebGLTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const registeredRef = useRef(false);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const [reduceMotionLive, setReduceMotionLive] = useState(reducedMotion);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduceMotionLive(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotionLive) return;

    if (!registeredRef.current) {
      gsap.registerPlugin(ScrollTrigger);
      registeredRef.current = true;
    }

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self: ScrollTrigger) => {
          const p = self.progress;
          progressRef.current = p;

          const idx = Math.min(
            whyMeTimelineSteps.length - 1,
            Math.max(0, Math.floor(p * whyMeTimelineSteps.length))
          );
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        }
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-timeline-card]");
      cards.forEach((el: HTMLElement) => {
        const i = Number(el.dataset.index ?? "0");
        gsap.set(el, { transformPerspective: 900, transformOrigin: "50% 50%" });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "top 50%",
            scrub: true
          },
          rotateX: 0,
          rotateY: 0,
          z: 0
        });

        gsap.fromTo(
          el,
          { rotateX: 8, rotateY: i % 2 === 0 ? -6 : 6, z: -40 },
          {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: true
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotionLive]);

  useEffect(() => {
    if (!reduceMotionLive) return;

    const section = sectionRef.current;
    if (!section) return;

    const calc = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      const total = rect.height - viewportH;
      const raw = total > 0 ? (-rect.top / total) : 0;
      const p = Math.max(0, Math.min(1, raw));
      progressRef.current = p;

      const idx = Math.min(
        whyMeTimelineSteps.length - 1,
        Math.max(0, Math.floor(p * whyMeTimelineSteps.length))
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [reduceMotionLive]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[rgb(var(--bg))] text-[rgb(var(--fg))]"
      style={{ minHeight: "220vh" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 20%, rgba(255,255,255,0.06), rgba(255,255,255,0) 60%), radial-gradient(900px 520px at 50% 80%, rgba(0,0,0,0.04), rgba(0,0,0,0) 60%)"
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 6px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background:
              "radial-gradient(1200px 800px at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 90%)"
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <div>
          <div>
            <div className="text-xs font-medium tracking-[0.22em] uppercase text-[rgba(var(--fg),0.55)]">
              Why me
            </div>
            <h2 className="rgb-heading mt-3 whitespace-nowrap text-3xl font-semibold tracking-tight sm:text-4xl">
              A process built for premium outcomes
            </h2>
            <div className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(var(--fg),0.55)]">
              A restrained, end-to-end approach — where strategy, craft, and intelligence move in one line.
            </div>
          </div>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[1px] bg-[rgba(var(--fg),0.12)] md:block" />

          <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
            <div className="sticky top-0 h-screen">
              <div className="absolute left-1/2 top-0 h-full w-[220px] -translate-x-1/2">
                <EnergyLineScene progressRef={progressRef} reducedMotion={reduceMotionLive} />
              </div>
            </div>
          </div>

          <div className="relative grid gap-8 md:gap-10">
            {whyMeTimelineSteps.map((step, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              const active = i === activeIndex;

              return (
                <div
                  key={step.id}
                  className={[
                    "relative",
                    "md:grid md:grid-cols-12 md:items-start",
                    side === "left" ? "md:text-right" : "md:text-left"
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative",
                      "md:col-span-5",
                      side === "left" ? "md:pr-10" : "md:col-start-8 md:pl-10",
                      "pl-10 md:pl-0"
                    ].join(" ")}
                  >
                    <div
                      aria-hidden="true"
                      className={[
                        "absolute left-4 top-8 h-3 w-3 rounded-full",
                        "border border-[rgba(var(--fg),0.20)]",
                        active ? "bg-[rgba(var(--fg),0.55)]" : "bg-[rgba(var(--fg),0.10)]",
                        "shadow-[0_0_0_6px_rgba(0,0,0,0.04)] dark:shadow-[0_0_0_6px_rgba(255,255,255,0.03)]"
                      ].join(" ")}
                      style={{
                        transform: "translateX(-50%)",
                      }}
                    />

                    <TimelineCard
                      step={step}
                      index={i}
                      active={active}
                      side={side}
                      reducedMotion={reduceMotionLive}
                    />

                    <div
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute inset-0 rounded-3xl",
                        "transition-opacity duration-700",
                        active ? "opacity-100" : "opacity-0"
                      ].join(" ")}
                      style={{
                        background:
                          "radial-gradient(700px 260px at 50% 30%, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)"
                      }}
                    />
                  </div>

                  <div className="hidden md:col-span-2 md:block" />
                </div>
              );
            })}
          </div>

          <div className="relative z-20 mt-20 flex justify-center">
            <div className="max-w-2xl text-center">
              <div className="rounded-3xl border border-[rgba(var(--border),0.9)] bg-[rgb(var(--card))] px-8 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[rgba(var(--fg),0.55)]">
                  Final note
                </div>
                <div className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  You don’t hire me to design something.
                  <br />
                  You hire me to transform vision into reality.
                </div>
                <div className="mt-6 h-px w-full bg-[rgba(var(--fg),0.12)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
