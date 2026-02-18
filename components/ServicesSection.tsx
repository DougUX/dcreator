"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";

type Service = {
  no: string;
  title: string;
  caption: string;
  body: string;
  bullets: string[];
  microCaption: string;
  images: string[];
};

export default function ServicesSection() {
  const services = useMemo<Service[]>(
    () => [
      {
        no: "01",
        title: "Digital Product Design",
        caption: "Enterprise-grade thinking. Human-centred execution.",
        body:
          "I design complex digital products that feel simple. From AI-native platforms to SaaS ecosystems, internal tools to customer-facing applications — I bring structure to complexity.",
        bullets: [
          "UX strategy & product architecture",
          "Design systems (scalable, token-driven)",
          "AI-integrated interfaces",
          "Web & mobile product design",
          "Cross-platform experiences",
          "Rapid prototyping & validation"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Designed with Soul. Powered by Intelligence.",
      },
      {
        no: "02",
        title: "Physical Luxury Product Design",
        caption: "Where aesthetics meet precision.",
        body:
          "Luxury is not decoration. It is discipline. From perfume bottles to packaging systems, I craft physical products with material intelligence, proportion control, and premium finish direction.",
        bullets: [
          "Material intelligence & finish direction",
          "Proportion & form refinement",
          "Packaging systems & unboxing",
          "Manufacturing-ready detailing",
          "Premium visual language"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Where aesthetics meet precision.",
      },
      {
        no: "03",
        title: "AI Product Strategy",
        caption: "Designing for intelligence, not just interface.",
        body:
          "AI is not a feature. It’s a behavioural layer. I help brands integrate AI meaningfully — with strategy before screens, and logic before layout.",
        bullets: [
          "Conversational UX architecture",
          "AI workflow integration",
          "Personalisation systems",
          "Automation logic design",
          "Human–AI interaction models"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Designing for intelligence, not just interface.",
      },
      {
        no: "04",
        title: "Visiontyping™",
        caption: "From idea to visual reality — fast.",
        body:
          "Visiontyping is my process of turning abstract thinking into visible direction. It blends strategic framing, rapid visual exploration, narrative positioning, and future-state prototyping.",
        bullets: [
          "Strategic framing",
          "Rapid visual exploration",
          "Narrative positioning",
          "Future-state prototyping",
          "Brand tone articulation"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "From idea to visual reality — fast.",
      },
      {
        no: "05",
        title: "User Experience Surgery",
        caption: "Diagnose. Cut. Refine. Elevate.",
        body:
          "When products feel heavy, confusing or fragmented — I operate. Precision intervention. Measured improvement.",
        bullets: [
          "UX audits & friction mapping",
          "Flow reconstruction",
          "Interaction refinement",
          "Design system repair",
          "Conversion optimisation"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Precision intervention. Measured improvement.",
      },
      {
        no: "06",
        title: "Design System Architecture",
        caption: "Design systems that survive scale.",
        body:
          "Token-driven, component-led design systems built for real teams. I’ve built and scaled systems across enterprise environments and post-acquisition design language shifts.",
        bullets: [
          "Token strategy & governance",
          "Component architecture",
          "MUI / React integration guidance",
          "Multi-brand harmonisation",
          "Post-acquisition alignment"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Token-driven. Component-led. Built to last.",
      },
      {
        no: "07",
        title: "Enterprise UX Leadership",
        caption: "Principal-level thinking. Hands-on delivery.",
        body:
          "Not just screens — structure. I align stakeholders, lead cross-functional delivery, and elevate design quality across teams.",
        bullets: [
          "Stakeholder alignment",
          "Agile design ops",
          "Product vision articulation",
          "Mentoring & coaching",
          "Delivery leadership"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Principal-level thinking. Hands-on delivery.",
      },
      {
        no: "08",
        title: "Brand & Experience Direction",
        caption: "Elegance with intelligence.",
        body:
          "Luxury + Technology rarely meet well. I make them speak the same language — across identity, digital, and physical touchpoints.",
        bullets: [
          "Brand experience alignment",
          "Digital–physical cohesion",
          "High-end visual direction",
          "AI-enhanced brand ecosystems"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Elegance with intelligence.",
      },
      {
        no: "09",
        title: "Product Transformation Consulting",
        caption: "Transformation, without drama.",
        body:
          "For companies ready to modernise — from legacy to modern, from fragmented to unified, from static to AI-driven.",
        bullets: [
          "Legacy modernisation",
          "System unification",
          "AI-native uplift",
          "UX simplification",
          "Roadmap-ready outputs"
        ],
        images: ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        microCaption: "Transformation, without drama.",
      }
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [imageOk, setImageOk] = useState<Record<number, boolean>>({});

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = services[activeIndex];
  const visual = services[visualIndex];

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 767px)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (activeIndex === visualIndex) return;

    setFading(true);
    const t = window.setTimeout(() => {
      setVisualIndex(activeIndex);
      setFading(false);
    }, 180);

    return () => window.clearTimeout(t);
  }, [activeIndex, visualIndex]);

  useEffect(() => {
    if (!isMobile) return;
    const el = itemRefs.current[activeIndex];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeIndex, isMobile]);

  const setActive = (next: number) => {
    const clamped = Math.max(0, Math.min(services.length - 1, next));
    setActiveIndex(clamped);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive(activeIndex + 1);
      itemRefs.current[Math.min(activeIndex + 1, services.length - 1)]?.focus();
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive(activeIndex - 1);
      itemRefs.current[Math.max(activeIndex - 1, 0)]?.focus();
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      itemRefs.current[0]?.focus();
    }

    if (e.key === "End") {
      e.preventDefault();
      setActive(services.length - 1);
      itemRefs.current[services.length - 1]?.focus();
    }
  };

  const Grain = () => (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.22]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 4px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 5px)",
        mixBlendMode: "overlay"
      }}
    />
  );

  const GradientFallback = () => (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[rgb(var(--border))] shadow-[0_30px_80px_-50px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(255,255,255,0.12),transparent_55%),radial-gradient(900px_circle_at_80%_70%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,rgba(0,0,0,0.30),rgba(0,0,0,0.10))] dark:bg-[radial-gradient(1200px_circle_at_20%_15%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_70%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
      <Grain />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="inline-flex rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/55 px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase text-[rgb(var(--fg))] backdrop-blur">
          {visual.title}
        </div>
      </div>
    </div>
  );

  const showImage = imageOk[visualIndex] !== false;

  return (
    <section id="services" className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="text-xs font-medium tracking-[0.18em] uppercase text-[rgb(var(--muted))]">
                Services
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Designed with Soul. Powered by Intelligence.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">
                I don’t just design products. I design clarity, systems, and impact.
              </p>

              <div className="mt-10">
                <div
                  role="listbox"
                  aria-label="Services"
                  onKeyDown={onKeyDown}
                  className="space-y-2"
                >
                  {services.map((s, idx) => {
                    const selected = idx === activeIndex;

                    return (
                      <button
                        key={s.title}
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => setActive(idx)}
                        className={[
                          "w-full text-start",
                          "rounded-2xl border border-[rgb(var(--border))]",
                          "px-5 py-4",
                          "transition",
                          selected
                            ? "bg-[rgb(var(--card))] shadow-[0_20px_60px_-45px_rgba(0,0,0,0.55)]"
                            : "bg-transparent hover:bg-[rgb(var(--card))]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--fg))]/30"
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-start gap-4">
                              <div className="pt-[2px] text-xs font-medium tracking-[0.18em] text-[rgb(var(--muted))]">
                                {s.no} —
                              </div>
                              <div className="min-w-0">
                                <div className="text-[15px] font-semibold tracking-tight">
                                  {s.title}
                                </div>
                                <div className="mt-1 text-sm leading-snug text-[rgb(var(--muted))]">
                                  {s.caption}
                                </div>
                              </div>
                            </div>

                            {selected ? (
                              <div className="mt-4 pl-[calc(0.75rem+3.25rem)]">
                                <div className="text-sm leading-relaxed text-[rgb(var(--fg))]">
                                  {s.body}
                                </div>

                                <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--muted))]">
                                  {s.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-3">
                                      <span className="mt-[7px] h-1 w-1 rounded-full bg-[rgb(var(--fg))]" />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                                  {s.microCaption}
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div
                            aria-hidden="true"
                            className={[
                              "mt-1 h-2 w-2 shrink-0 rounded-full border border-[rgb(var(--border))]",
                              selected ? "bg-[rgb(var(--fg))]" : "bg-transparent"
                            ].join(" ")}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 hidden items-center justify-between lg:flex">
                  <div className="text-xs text-[rgb(var(--muted))]">
                    {activeIndex + 1} / {services.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActive(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      className="rounded-full border border-[rgb(var(--border))] px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card))] transition disabled:opacity-40 disabled:hover:bg-transparent"
                      aria-label="Previous service"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive(activeIndex + 1)}
                      disabled={activeIndex === services.length - 1}
                      className="rounded-full border border-[rgb(var(--border))] px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card))] transition disabled:opacity-40 disabled:hover:bg-transparent"
                      aria-label="Next service"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:sticky lg:top-[96px]">
              <div className="relative aspect-[4/3] w-full">
                <div
                  className={[
                    "absolute inset-0",
                    "transition-all duration-300 ease-out",
                    fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  ].join(" ")}
                >
                  {showImage ? (
                    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[rgb(var(--border))] shadow-[0_30px_80px_-50px_rgba(0,0,0,0.55)]">
                      <Image
                        src={visual.images[0] ?? "/placeholders/service.svg"}
                        alt={visual.title}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover"
                        onError={() => {
                          setImageOk((prev) => ({ ...prev, [visualIndex]: false }));
                        }}
                        priority={visualIndex === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                      <Grain />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="inline-flex rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/55 px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase text-[rgb(var(--fg))] backdrop-blur">
                          {visual.title}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <GradientFallback />
                  )}
                </div>
              </div>

              <div className="mt-4 text-xs text-[rgb(var(--muted))] lg:hidden">
                Tap a service to view details.
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
