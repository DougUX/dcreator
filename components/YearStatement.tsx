"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import ImageParticlesHover from "@/components/webgl/ImageParticlesHover";
import { useI18n } from "@/components/I18nProvider";

export default function YearStatement() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const sigRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "philosophy" | "awards">("about");

  type Bg = { kind: "image"; src: string } | { kind: "video"; src: string; poster?: string };

  const bgByTab = useMemo<Record<typeof activeTab, Bg>>(
    () => ({
      about: { kind: "image", src: "/about-about.png" },
      philosophy: { kind: "video", src: "/about-philosophy.mp4", poster: "/about-about.png" },
      awards: { kind: "image", src: "/about-awards.png" }
    }),
    []
  );

  const [activeBg, setActiveBg] = useState<Bg>({ kind: "image", src: "/about-about.png" });
  const [prevBg, setPrevBg] = useState<Bg | null>(null);
  const [prevBgOpacity, setPrevBgOpacity] = useState<0 | 1>(0);
  const [activeBgOpacity, setActiveBgOpacity] = useState<0 | 1>(1);

  const contentWrapRef = useRef<HTMLDivElement | null>(null);
  const contentMeasureRef = useRef<HTMLDivElement | null>(null);
  const [contentH, setContentH] = useState<number | null>(null);
  const [prevTab, setPrevTab] = useState<typeof activeTab | null>(null);
  const [contentPhase, setContentPhase] = useState<"idle" | "swap">("idle");
  const [prevContentOpacity, setPrevContentOpacity] = useState<0 | 1>(0);
  const [contentOpacity, setContentOpacity] = useState<0 | 1>(1);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const heading = headingRef.current;
    const sig = sigRef.current;
    if (!section || !bg) return;

    let raf = 0;
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let vel = 0;

    let bgY = 0;
    let bgX = 0;
    let bgR = 0;
    let hY = 0;
    let sY = 0;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      vel = lerp(vel, dy, 0.18);

      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = clamp((vh * 0.5 - r.top) / (vh * 0.9), -1, 1);

      const targetBgY = progress * 16;
      const targetBgX = clamp(vel * 0.35, -10, 10);
      const targetBgR = clamp(vel * 0.03, -0.6, 0.6);

      const targetHY = progress * -8;
      const targetSY = progress * 10;

      bgY = lerp(bgY, targetBgY, 0.10);
      bgX = lerp(bgX, targetBgX, 0.10);
      bgR = lerp(bgR, targetBgR, 0.10);
      hY = lerp(hY, targetHY, 0.12);
      sY = lerp(sY, targetSY, 0.12);

      bg.style.transform = `translate3d(${bgX}px, ${bgY}px, 0) rotate(${bgR}deg) scale(1.03)`;
      if (heading) heading.style.transform = `translate3d(0, ${hY}px, 0)`;
      if (sig) sig.style.transform = `translate3d(0, ${sY}px, 0) rotate(180deg)`;

      raf = window.requestAnimationFrame(update);
    };

    raf = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const next = bgByTab[activeTab];

    setPrevBg(activeBg);
    setPrevBgOpacity(1);
    setActiveBg(next);
    setActiveBgOpacity(0);

    setContentOpacity(0);
    setPrevContentOpacity(1);

    const raf = window.requestAnimationFrame(() => {
      setPrevBgOpacity(0);
      setActiveBgOpacity(1);
      setContentOpacity(1);
      setPrevContentOpacity(0);
    });
    const to = window.setTimeout(() => {
      setPrevBg(null);
      setPrevTab(null);
      setContentPhase("idle");
    }, 760);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useLayoutEffect(() => {
    const measure = contentMeasureRef.current;
    if (!measure) return;

    const update = () => {
      const h = measure.getBoundingClientRect().height;
      setContentH(h);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(measure);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeTab]);

  const tabs = [
    {
      id: "about" as const,
      label: "About",
      title: "About",
      body: [
        "I am Douglas Herbert, an award winning Digital and Physical Product Designer based in the United Kingdom, with over 25 years of experience shaping distinctive, high value products.",
        "My career spans luxury fashion and brand design, niche perfume bottle creation, premium packaging, and complex digital ecosystems including AI powered applications, SaaS platforms, websites, and scalable enterprise systems.",
        "I operate confidently across both physical and digital worlds, designing refined luxury objects that command presence while also architecting sophisticated digital infrastructures for industries such as aviation, maritime, telecommunications, and IT.",
        "This dual expertise allows me to merge aesthetic excellence with engineering precision.",
        "From prestigious retail shelves to enterprise grade SaaS platforms, my work is grounded in strategic clarity, systems thinking, and a deep understanding of how design influences perception, value, and experience.",
        "Over the years, I have navigated technological evolution, corporate acquisitions, industry transformation, and high performance environments. Each challenge has strengthened my strategic approach, refined my craft, and reinforced my commitment to continuous growth.",
        "Today, I design at the intersection of creativity and intelligence, integrating emerging technologies and refined physical craftsmanship into purposeful, future ready products."
      ]
    },
    {
      id: "philosophy" as const,
      label: "My Philosophy",
      title: "My Philosophy",
      body: [
        "Design is not decoration. It is responsibility.",
        "Every product carries the reputation of the brand behind it.",
        "Every detail communicates value.",
        "Every decision shapes perception.",
        "If you place your trust in me, I commit fully with clarity, ownership, and long term thinking. I approach every project with care, discipline, and strategic intent.",
        "True luxury is not loud. It is intentional. It is controlled. It is precise.",
        "Whether sketching a niche perfume bottle, defining brand positioning, or designing a complex AI driven SaaS platform, my objective remains consistent.",
        "To create products that feel inevitable, refined, and built with purpose.",
        "I do not simply design products.",
        "I design with commitment, intelligence, and integrity."
      ]
    },
    {
      id: "awards" as const,
      label: "Awards",
      title: "Awards and Recognition",
      body: [
        "My work has competed alongside globally recognised luxury fragrance brands including Chloé Love Story, KENZO Jeu d’Amour, L’Amour Lalique, and Ralph and Russo, securing award victories within the same distinguished competition.",
        "I am a two time winner at the Luxury Packaging Awards in London for The Spirit of Dubai, recognised for both Luxury Packaging Design and Luxury Bag Design.",
        "In addition to international recognition, I have received multiple internal awards and commendations across organisations for innovation, design leadership, system thinking, and product excellence.",
        "These recognitions reflect a consistent commitment to craftsmanship, originality, strategic thinking, and refined execution across both luxury physical products and complex digital systems.",
        "Recognition is not the goal.",
        "It is the result of disciplined thinking, precision, and uncompromising standards."
      ]
    }
  ];

  const currentTab = tabs.find((x) => x.id === activeTab) ?? tabs[0];
  const prevTabData = prevTab ? tabs.find((x) => x.id === prevTab) : null;

  const switchTab = (next: typeof activeTab) => {
    if (next === activeTab) return;

    const h = contentMeasureRef.current?.getBoundingClientRect().height;
    if (typeof h === "number" && Number.isFinite(h)) setContentH(h);

    setPrevTab(activeTab);
    setContentPhase("swap");
    setActiveTab(next);
  };

  const BgLayer = ({ bg, opacity, variant }: { bg: Bg; opacity: 0 | 1; variant: "in" | "out" }) => {
    const transformIn =
      opacity === 1
        ? "translate3d(0,0,0) scale(1.03) rotateX(0deg) rotateY(0deg)"
        : "translate3d(0, -10px, -80px) scale(1.06) rotateX(2.25deg) rotateY(-2deg)";
    const transformOut =
      opacity === 1
        ? "translate3d(0,0,0) scale(1.03) rotateX(0deg) rotateY(0deg)"
        : "translate3d(0, 10px, -60px) scale(0.985) rotateX(-2deg) rotateY(1.5deg)";
    const t = variant === "in" ? transformIn : transformOut;

    if (bg.kind === "video") {
      return (
        <div
          className="absolute inset-0"
          style={{
            opacity,
            transform: t,
            transformOrigin: "center",
            backfaceVisibility: "hidden",
            transition:
              "opacity 960ms cubic-bezier(0.22, 1, 0.36, 1), transform 960ms cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={bg.poster}
          >
            <source src={bg.src} type="video/mp4" />
          </video>
        </div>
      );
    }

    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity,
          transform: t,
          transformOrigin: "center",
          backfaceVisibility: "hidden",
          transition:
            "opacity 960ms cubic-bezier(0.22, 1, 0.36, 1), transform 960ms cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      />
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden py-6 sm:py-10"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {prevBg ? <BgLayer bg={prevBg} opacity={prevBgOpacity} variant="out" /> : null}
        <BgLayer bg={activeBg} opacity={activeBgOpacity} variant="in" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/45 sm:bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {activeBg.kind === "image" ? (
        <ImageParticlesHover src={activeBg.src} />
      ) : null}
      <Container>
        <Reveal>
          <div className="relative z-30 grid min-h-[calc(100svh-8rem)] items-center gap-10 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <div
                data-cursor="about"
                className="pointer-events-none absolute inset-0 lg:pointer-events-auto"
                aria-label="About image"
              />
            </div>

            <div className="lg:col-span-7 lg:pr-[100px]">
              <div className="flex flex-col gap-8">
                <div
                  ref={headingRef}
                  className="rgb-heading rgb-heading-strong text-[14vw] leading-[0.9] font-semibold tracking-tight text-white will-change-transform lg:text-[120px]"
                  style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.65))" }}
                >
                  {t("about.title")}
                </div>

                <div className="group relative">
                  <div
                    className="rounded-2xl bg-black/25 p-4 text-[13px] leading-relaxed text-white/85 backdrop-blur-sm sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}
                  >
                    <div
                      role="tablist"
                      aria-label="About tabs"
                      className="relative z-30 flex flex-wrap gap-2"
                      style={{ perspective: "900px" }}
                    >
                      {tabs.map((tab) => {
                        const selected = tab.id === activeTab;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => switchTab(tab.id)}
                            className={[
                              "relative z-30 inline-flex items-center rounded-full border px-4 py-2",
                              "text-[12px] font-medium uppercase tracking-[0.14em]",
                              selected
                                ? "border-white/35 bg-white/10 text-white shadow-[0_18px_60px_-30px_rgba(0,0,0,0.75)]"
                                : "border-white/15 bg-transparent text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5",
                              "transition"
                            ].join(" ")}
                            style={
                              selected
                                ? {
                                    transform: "translate3d(0,-1px,24px) rotateX(10deg)",
                                  }
                                : {
                                    transform: "translate3d(0,0,0) rotateX(0deg)",
                                  }
                            }
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      ref={contentWrapRef}
                      className="relative mt-5 overflow-hidden"
                      style={{
                        height: contentH ?? undefined,
                        transition: "height 680ms cubic-bezier(0.22, 1, 0.36, 1)",
                        willChange: "height"
                      }}
                    >
                      <div ref={contentMeasureRef} className="relative">
                        <div
                          className="relative"
                          style={{
                            opacity: contentOpacity,
                            transform:
                              contentOpacity === 1
                                ? "translate3d(0,0,0)"
                                : "translate3d(0, -10px, 0)",
                            transition:
                              "opacity 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 720ms cubic-bezier(0.22, 1, 0.36, 1), filter 720ms cubic-bezier(0.22, 1, 0.36, 1)",
                            filter: contentOpacity === 1 ? "blur(0px)" : "blur(10px)"
                          }}
                        >
                          <div className="text-[15px] font-semibold tracking-tight text-white">{currentTab.title}</div>
                          {currentTab.body.map((p, idx) => (
                            <p key={idx} className={idx === 0 ? "mt-3" : "mt-4"}>
                              {p}
                            </p>
                          ))}
                        </div>

                        {contentPhase === "swap" && prevTabData ? (
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              opacity: prevContentOpacity,
                              transform:
                                prevContentOpacity === 1
                                  ? "translate3d(0,0,0)"
                                  : "translate3d(0, 10px, 0)",
                              filter: prevContentOpacity === 1 ? "blur(0px)" : "blur(10px)",
                              transition:
                                "opacity 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 720ms cubic-bezier(0.22, 1, 0.36, 1), filter 720ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          >
                            <div className="text-[15px] font-semibold tracking-tight text-white">{prevTabData.title}</div>
                            {prevTabData.body.map((p, idx) => (
                              <p key={idx} className={idx === 0 ? "mt-3" : "mt-4"}>
                                {p}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <MagneticButton>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--fg))] px-6 py-3 text-[13px] font-medium text-[rgb(var(--bg))] hover:opacity-90 transition"
                  >
                    {t("about.cta")}
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
