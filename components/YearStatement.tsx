"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Container from "./Container";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import ImageParticlesHover from "@/components/webgl/ImageParticlesHover";
import { useI18n } from "@/components/I18nProvider";

export default function YearStatement() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the scroll progress of the entire About container.
  // 0 = top of About section hits bottom of screen
  // 1 = bottom of About section hits top of screen
  // To keep the effect stable over the whole section height, we use "start start" to "end end" offsets.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a smooth spring so the values don't stutter if the user's mouse wheel is jerky (Apple-style polish)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.5
  });

  /*
    SCROLL ANIMATION MAP:
    We have 3 sections ("About", "Philosophy", "Awards"). The total scroll distance is 1.0.
    Section 1 (About): Active roughly from 0.0 to 0.33
    Section 2 (Philosophy): Active roughly from 0.33 to 0.66
    Section 3 (Awards): Active from 0.66 to 1.0
  */

  // Background 1: About image
  const bg1Opacity = useTransform(smoothProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const bg1Scale = useTransform(smoothProgress, [0, 0.35], [1, 1.1]);
  const bg1Y = useTransform(smoothProgress, [0, 0.35], ["0%", "-10%"]);

  // Background 2: Philosophy video
  const bg2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const bg2Scale = useTransform(smoothProgress, [0.25, 0.7], [0.95, 1.05]);
  const bg2Y = useTransform(smoothProgress, [0.25, 0.7], ["10%", "-5%"]);

  // Background 3: Awards image
  const bg3Opacity = useTransform(smoothProgress, [0.6, 0.7, 1], [0, 1, 1]);
  const bg3Scale = useTransform(smoothProgress, [0.6, 1], [0.95, 1]);
  const bg3Y = useTransform(smoothProgress, [0.6, 1], ["5%", "0%"]);

  // Scroll hint opacity fades out as user begins scrolling
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  const sections = [
    {
      id: "about" as const,
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

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-black"
    >
      {/* 
        STICKY BACKGROUND CONTAINER 
        These images stay locked to the screen while the user scrolls down through the tall container below.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: About image */}
        <motion.div
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{ opacity: bg1Opacity, scale: bg1Scale, y: bg1Y }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/about-about.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%"
            }}
          />
          <ImageParticlesHover src="/about-about.png" />
        </motion.div>

        {/* Layer 2: Philosophy video */}
        <motion.div
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{ opacity: bg2Opacity, scale: bg2Scale, y: bg2Y }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/about-about.png"
          >
            <source src="/about-philosophy.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Layer 3: Awards image */}
        <motion.div
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{ opacity: bg3Opacity, scale: bg3Scale, y: bg3Y }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/about-awards.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%"
            }}
          />
        </motion.div>

        {/* Heavy Vignette Overlay to ensure text stays legible */}
        <div className="pointer-events-none absolute inset-0 bg-black/45 sm:bg-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

        {/* Mouse Scroll Hint Indicator */}
        <motion.div
          className="absolute bottom-8 left-8 md:bottom-12 md:left-24 z-30 flex flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <div className="w-[30px] h-[46px] rounded-full border-2 border-white/30 flex justify-center p-1.5">
            <motion.div
              className="w-1.5 h-3 bg-white/70 rounded-full"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        </motion.div>

      </div>

      {/* 
        SCROLLING CONTENT OVERLAY 
        Creating tall padding around these blocks allows the user to scroll through the container, driving the 'smoothProgress' value above.
      */}
      <div className="relative z-20 pb-32">
        {/* Negative margin pulls the first card back over the sticky header initially */}
        <Container className="-mt-[85vh]">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Empty space on left for visual balance, aligning content right over the backgrounds dark portions */}
            <div className="hidden lg:block lg:col-span-5 relative pointer-events-none" />

            <div className="lg:col-span-7 lg:pr-[50px]">
              {sections.map((sec, i) => (
                <div
                  key={sec.id}
                  data-cursor-text={
                    sec.id === "about" ? "About" :
                      sec.id === "philosophy" ? "My Philosophy" : "Awards & Recognition"
                  }
                  className="min-h-[100vh] flex flex-col justify-center"
                >
                  <Reveal delay={0.1}>
                    <div className="rounded-2xl bg-black/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md border border-white/5 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

                      <div className="relative z-10">
                        {i === 0 && (
                          <div
                            className="rgb-heading rgb-heading-strong text-[14vw] leading-[0.9] font-semibold tracking-tight text-white mb-12 lg:text-[120px] will-change-transform"
                            style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.65))" }}
                          >
                            {t("about.title")}
                          </div>
                        )}

                        <h2 className="heading-strategy text-[28px] text-white/95 mb-6">
                          {sec.title}
                        </h2>

                        <div className="space-y-6 text-[16px] leading-relaxed text-white/80" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}>
                          {sec.body.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}

              <div className="py-20 flex">
                <Reveal delay={0.2}>
                  <MagneticButton>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-[14px] uppercase text-black hover:bg-gray-200 transition shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                    >
                      {t("about.cta")}
                    </a>
                  </MagneticButton>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
