"use client";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/Container";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/Reveal";

type Service = {
  id: string;
  number: string;
  title: string;
  caption: string;
  description: string;
  bullets: string[];
  images: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-5 w-5 items-center justify-center"
    >
      <span className="absolute h-[2px] w-4 rounded-full bg-[rgb(var(--fg))]" />
      <span
        className={[
          "absolute h-4 w-[2px] rounded-full bg-[rgb(var(--fg))] transition-transform duration-300 ease-in-out",
          open ? "scale-y-0" : "scale-y-100"
        ].join(" ")}
      />
    </span>
  );
}

function GradientFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-gradient-to-br from-neutral-100 via-neutral-100 to-neutral-200 shadow-sm dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_20%,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%)] opacity-60 dark:opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_70%_75%,rgba(0,0,0,0.18),rgba(0,0,0,0)_60%)]" />
    </div>
  );
}

function CloseIcon() {
  return (
    <span aria-hidden="true" className="relative block h-4 w-4">
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
    </span>
  );
}

function CarouselDots({
  serviceId,
  title,
  images,
  index,
  setIndex,
  imageOk,
  setImageOk,
  onOpen
}: {
  serviceId: string;
  title: string;
  images: string[];
  index: number;
  setIndex: (next: number) => void;
  imageOk: Record<string, boolean>;
  setImageOk: Dispatch<SetStateAction<Record<string, boolean>>>;
  onOpen: (src: string, alt: string) => void;
}) {
  const [prevSrc, setPrevSrc] = useState<string>("");
  const lastSrcRef = useRef<string>("");
  const prevTimerRef = useRef<number | null>(null);

  const safeIndex = clamp(index, 0, Math.max(0, images.length - 1));
  const src = images[safeIndex] ?? "";
  const key = `${serviceId}:${src}`;
  const ok = src && imageOk[key] !== false;
  const count = images.length;

  useEffect(() => {
    if (prevTimerRef.current) window.clearTimeout(prevTimerRef.current);

    const last = lastSrcRef.current;
    if (last && last !== src) setPrevSrc(last);
    lastSrcRef.current = src;

    prevTimerRef.current = window.setTimeout(() => {
      setPrevSrc("");
      prevTimerRef.current = null;
    }, 260);

    return () => {
      if (prevTimerRef.current) window.clearTimeout(prevTimerRef.current);
      prevTimerRef.current = null;
    };
  }, [src]);

  const go = (next: number) => {
    if (count <= 0) return;
    setIndex(clamp(next, 0, count - 1));
  };

  return (
    <div className="relative mt-6">
      <button
        type="button"
        onClick={() => {
          if (ok) onOpen(src, title);
        }}
        className={[
          "group relative w-full overflow-hidden rounded-2xl",
          "border border-[rgb(var(--border))] bg-[rgb(var(--card))]",
          "shadow-[0_20px_70px_-55px_rgba(0,0,0,0.55)]",
          "transition-transform duration-300 ease-out",
          "hover:-translate-y-[2px]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        ].join(" ")}
        aria-label="Open image"
      >
        <div className="relative aspect-[16/10] w-full bg-black/5 dark:bg-white/5">
          {ok ? (
            <>
              {prevSrc ? (
                <div className="absolute inset-0">
                  <Image
                    src={prevSrc}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className={[
                      "object-contain sm:object-cover",
                      "opacity-100",
                      "transition-opacity duration-200 ease-out",
                      "motion-reduce:transition-none"
                    ].join(" ")}
                  />
                </div>
              ) : null}
              <div className="absolute inset-0">
                <Image
                  src={src}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className={[
                    "object-contain sm:object-cover",
                    "transition-[transform,opacity] duration-500 ease-out",
                    "group-hover:scale-105",
                    prevSrc ? "opacity-0" : "opacity-100",
                    prevSrc ? "delay-[0ms]" : "delay-[0ms]",
                    "motion-reduce:transition-none"
                  ].join(" ")}
                  onError={() => setImageOk((p) => ({ ...p, [key]: false }))}
                />
              </div>
              {prevSrc ? (
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className={[
                      "absolute inset-0",
                      "bg-[rgb(var(--card))]",
                      "opacity-0",
                      "animate-[fadeout_260ms_ease-out_forwards]",
                      "motion-reduce:animate-none"
                    ].join(" ")}
                    style={{ animationName: "fadeout" }}
                  />
                </div>
              ) : null}
              {prevSrc ? (
                <div
                  className={[
                    "pointer-events-none absolute inset-0",
                    "bg-[rgb(var(--card))]",
                    "opacity-0",
                    "transition-opacity duration-200 ease-out"
                  ].join(" ")}
                />
              ) : null}
            </>
          ) : (
            <GradientFallback />
          )}

          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(255,255,255,0.34),rgba(255,255,255,0)_55%)] dark:bg-[radial-gradient(900px_500px_at_20%_10%,rgba(255,255,255,0.18),rgba(255,255,255,0)_55%)]" />
          </div>
        </div>
      </button>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(safeIndex - 1)}
            disabled={safeIndex === 0}
            className={[
              "absolute left-3 top-1/2 -translate-y-1/2",
              "rounded-full border border-[rgb(var(--border))]",
              "bg-[rgb(var(--bg))]/75 px-3 py-2",
              "text-xs font-medium text-[rgb(var(--fg))]",
              "shadow-sm backdrop-blur",
              "transition",
              "opacity-0 group-hover:opacity-100",
              "hover:bg-[rgb(var(--bg))]/90 disabled:opacity-40",
              "motion-reduce:transition-none motion-reduce:opacity-100"
            ].join(" ")}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(safeIndex + 1)}
            disabled={safeIndex === count - 1}
            className={[
              "absolute right-3 top-1/2 -translate-y-1/2",
              "rounded-full border border-[rgb(var(--border))]",
              "bg-[rgb(var(--bg))]/75 px-3 py-2",
              "text-xs font-medium text-[rgb(var(--fg))]",
              "shadow-sm backdrop-blur",
              "transition",
              "opacity-0 group-hover:opacity-100",
              "hover:bg-[rgb(var(--bg))]/90 disabled:opacity-40",
              "motion-reduce:transition-none motion-reduce:opacity-100"
            ].join(" ")}
            aria-label="Next image"
          >
            →
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/70 px-3 py-2 backdrop-blur">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "h-1.5 w-1.5 rounded-full transition",
                  i === safeIndex
                    ? "bg-[rgb(var(--fg))]"
                    : "bg-[rgb(var(--muted))]/35 hover:bg-[rgb(var(--muted))]/55"
                ].join(" ")}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === safeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function ServicesAccordion() {
  const { t } = useI18n();
  const services = useMemo<Service[]>(() => {
    const mk = (id: string, number: string, images: string[], bulletCount: number): Service => {
      const base = `services.items.${id}`;
      return {
        id,
        number,
        title: t(`${base}.title`),
        caption: t(`${base}.caption`),
        description: t(`${base}.description`),
        bullets: Array.from({ length: bulletCount }, (_, i) => t(`${base}.bullets.${i}`)),
        images
      };
    };

    return [
      mk(
        "digital-product-design",
        "01",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        6
      ),
      mk(
        "physical-luxury-product-design",
        "02",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "ai-product-strategy",
        "03",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "visiontyping",
        "04",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "ux-surgery",
        "05",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "design-systems",
        "06",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "ux-leadership",
        "07",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "brand-direction",
        "08",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      ),
      mk(
        "transformation-packages",
        "09",
        ["/placeholders/service.svg", "/placeholders/service.svg", "/placeholders/service.svg"],
        5
      )
    ];
  }, [t]);

  const [activeId, setActiveId] = useState<string>(services[0]?.id ?? "");
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const s of services) init[s.id] = 0;
    return init;
  });
  const [imageOk, setImageOk] = useState<Record<string, boolean>>({});

  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [panelHeights, setPanelHeights] = useState<Record<string, number>>({});

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string>("");
  const [lightboxAlt, setLightboxAlt] = useState<string>("");

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  useEffect(() => {
    const calc = () => {
      const next: Record<string, number> = {};
      for (const s of services) {
        const el = panelRefs.current[s.id];
        if (el) next[s.id] = el.scrollHeight;
      }
      setPanelHeights(next);
    };
    const raf = window.requestAnimationFrame(calc);
    return () => window.cancelAnimationFrame(raf);
  }, [activeId, carouselIndex, services]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <section
      id="services"
      className="bg-[rgb(var(--bg))] py-20 text-[rgb(var(--fg))]"
    >
      <Container>
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
            {t("services.kicker")}
          </div>
          <h2 className="rgb-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">
            {t("services.sub")}
          </p>

        </div>
      </Container>

      <div className="mx-auto mt-10 w-full">
        <div className="space-y-3">
          {services.map((s) => {
            const open = s.id === activeId;
            const panelId = `svc-panel-${s.id}`;
            const btnId = `svc-btn-${s.id}`;

            return (
              <div
                key={s.id}
                className={[
                  "relative",
                  "bg-[rgb(var(--card))]",
                  "shadow-[0_26px_90px_-80px_rgba(0,0,0,0.60)]",
                  "transition-shadow duration-300 ease-out",
                  "hover:shadow-[0_30px_110px_-88px_rgba(0,0,0,0.70)]",
                  "motion-reduce:transition-none",
                  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px",
                  "before:bg-[linear-gradient(90deg,rgba(var(--bg),0)_0%,rgba(var(--fg),0.16)_18%,rgba(var(--fg),0.16)_82%,rgba(var(--bg),0)_100%)]",
                  "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px",
                  "after:bg-[linear-gradient(90deg,rgba(var(--bg),0)_0%,rgba(var(--fg),0.16)_18%,rgba(var(--fg),0.16)_82%,rgba(var(--bg),0)_100%)]"
                ].join(" ")}
              >
                <div
                  className={[
                    "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12",
                    open ? "border-b border-[rgb(var(--border))]" : ""
                  ].join(" ")}
                >
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-selected={open}
                    onClick={() => toggle(s.id)}
                    className={[
                      "flex w-full items-center justify-between gap-6 py-5 text-start",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:focus-visible:ring-white/20"
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="pt-[2px] text-xs font-medium uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                          {s.number}
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
                    </div>

                    <ToggleIcon open={open} />
                  </button>
                </div>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={[
                    "overflow-hidden",
                    "will-change-[max-height,opacity]",
                    "transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "opacity-100" : "opacity-0"
                  ].join(" ")}
                  style={{ maxHeight: open ? (panelHeights[s.id] ?? 0) : 0 }}
                >
                  <div
                    ref={(el) => {
                      panelRefs.current[s.id] = el;
                    }}
                    className={[
                      open
                        ? "bg-[linear-gradient(180deg,rgba(var(--fg),0.018)_0%,rgba(var(--fg),0.006)_100%)]"
                        : "bg-transparent",
                      "will-change-transform",
                      "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open ? "translate-y-0" : "-translate-y-1",
                      "motion-reduce:transition-none motion-reduce:transform-none"
                    ].join(" ")}
                  >
                    <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-5 sm:px-8 lg:px-12">
                      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                        <div className="lg:col-span-7 lg:pt-3">
                          <div className="flex flex-col">
                            <div className="text-sm leading-relaxed text-[rgb(var(--fg))]">
                              {s.description}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                              {s.bullets.map((b) => (
                                <span
                                  key={b}
                                  className={[
                                    "inline-flex items-center rounded-full",
                                    "border border-[rgb(var(--border))]",
                                    "bg-[rgb(var(--bg))]",
                                    "px-3 py-1 text-xs text-[rgb(var(--fg))]",
                                    "shadow-[0_1px_0_rgba(0,0,0,0.04)]",
                                    "transition-colors duration-200",
                                    "hover:bg-[rgb(var(--card))]",
                                    "motion-reduce:transition-none"
                                  ].join(" ")}
                                >
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-5">
                          <CarouselDots
                            serviceId={s.id}
                            title={s.title}
                            images={s.images}
                            index={carouselIndex[s.id] ?? 0}
                            setIndex={(next: number) =>
                              setCarouselIndex((p) => ({
                                ...p,
                                [s.id]: clamp(next, 0, Math.max(0, s.images.length - 1))
                              }))
                            }
                            imageOk={imageOk}
                            setImageOk={setImageOk}
                            onOpen={openLightbox}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-md dark:bg-black/70" />

          <div className="relative z-10">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="absolute -right-2 -top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-sm transition hover:bg-neutral-50 dark:border-white/10 dark:bg-black dark:text-white dark:hover:bg-white/5"
            >
              <CloseIcon />
            </button>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-black">
              <div className="relative max-h-[85vh] max-w-[90vw]">
                <div className="relative h-[85vh] w-[90vw] max-w-5xl">
                  <Image
                    src={lightboxSrc}
                    alt={lightboxAlt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
