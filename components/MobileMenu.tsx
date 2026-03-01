"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Red_Hat_Display } from "next/font/google";
import LogoMark from "./LogoMark";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "@/components/I18nProvider";
import { locales, type Locale } from "@/lib/i18n";

const logoFont = Red_Hat_Display({ subsets: ["latin"], weight: ["300"], display: "swap" });

export default function MobileMenu({
  nav,
  activeHref,
  locale,
  onLocaleChange,
  onNavigate,
  open,
  onOpenChange
}: {
  nav: { label: string; href: string }[];
  activeHref?: string;
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
  onNavigate?: (href: string) => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [renderOverlay, setRenderOverlay] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const { t } = useI18n();

  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const iconOpen = open || renderOverlay;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (open) {
      setRenderOverlay(true);
      setOverlayActive(false);
      const id = window.requestAnimationFrame(() => setOverlayActive(true));
      return () => window.cancelAnimationFrame(id);
    }

    setOverlayActive(false);
    const to = window.setTimeout(() => setRenderOverlay(false), 720);
    return () => window.clearTimeout(to);
  }, [mounted, open]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("menu-open", open);
    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [mounted, open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (open) return;
    toggleRef.current?.focus();
  }, [open]);

  const isActive = (href: string) => {
    if (!activeHref) return false;
    if (href === `/${locale}`) {
      return activeHref === `/${locale}` || activeHref === `/${locale}/`;
    }
    return activeHref.startsWith(href);
  };

  return (
    <div>
      <button
        type="button"
        ref={toggleRef}
        aria-label={open ? t("menu.close") : t("menu.open")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (!open) setRenderOverlay(true);
          onOpenChange(!open);
        }}
        className={[
          "relative inline-flex h-10 w-10 items-center justify-center rounded-lg",
          "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] active:scale-[0.98] transition-colors",
          "focus-visible:outline-none"
        ].join(" ")}
      >
        <span className="sr-only">{open ? t("menu.closeButton") : t("menu.open")}</span>
        <span aria-hidden="true" className="relative block h-[16px] w-[30px] pointer-events-none">
          <span
            className={[
              "absolute left-0 block h-[1.5px] bg-current transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              iconOpen ? "top-[7px] rotate-[30deg] w-[32px] -translate-x-1" : "top-0 rotate-0 w-full translate-x-0"
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 block h-[1.5px] bg-current transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              iconOpen ? "top-[7px] w-[26px] -rotate-[40deg] translate-x-2 translate-y-2 origin-left" : "top-[14px] w-full rotate-0 translate-x-0 translate-y-0 origin-center"
            ].join(" ")}
          />
        </span>
      </button>

      {portalEl && renderOverlay
        ? createPortal(
          <div className="fixed inset-0 z-[9999]">
            <button
              type="button"
              aria-label={t("menu.close")}
              onClick={() => onOpenChange(false)}
              className="fixed inset-2 z-0 transition-opacity duration-[720ms] ease-out"
              style={{
                opacity: overlayActive ? 1 : 0,
                pointerEvents: overlayActive ? "auto" : "none",
                backgroundColor: "rgba(0,0,0,0.42)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)"
              }}
            />

            <div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("menu.open")}
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === "Escape") onOpenChange(false);
              }}
              className={[
                "fixed right-0 top-0 bottom-0 w-[85vw] min-w-[320px] max-w-[500px]",
                "bg-[rgb(var(--bg))]/95 dark:bg-[rgb(var(--bg))]/90",
                "backdrop-blur-xl",
                "border-l border-[rgb(var(--border))]/50",
                "shadow-[0_30px_120px_rgba(0,0,0,0.5)]",
                "z-[9999]",
                "transform-gpu will-change-[transform,opacity]",
                "focus:outline-none flex flex-col justify-center"
              ].join(" ")}
              style={{
                transform: overlayActive ? "translate3d(0,0,0)" : "translate3d(100%,0,0)",
                opacity: overlayActive ? 1 : 0,
                pointerEvents: overlayActive ? "auto" : "none",
                transition:
                  "transform 720ms cubic-bezier(0.16,1,0.3,1), opacity 720ms cubic-bezier(0.16,1,0.3,1)"
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 dark:from-white/10 dark:to-black/30"
              />

              <div className="flex flex-col h-full overflow-y-auto z-10 relative">
                <div className="flex items-center justify-between px-6 md:px-12 h-[72px] border-b border-[rgb(var(--border))]/30">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center text-[rgb(var(--muted))] opacity-90">
                      <LogoMark size={70} className="shrink-0" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <ThemeToggle />
                    {/* Spacer taking up the same 40x40 footprint as the global morphing toggle button */}
                    <div className="w-10 h-10 shrink-0 pointer-events-none" />
                  </div>
                </div>

                <div className="px-6 md:px-12 pt-6 pb-10 flex flex-col gap-8 flex-1">
                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Language"
                      aria-expanded={localeOpen}
                      onClick={() => setLocaleOpen((v) => !v)}
                      className={[
                        "inline-flex items-center justify-between gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]",
                        "w-full px-4 py-3 text-[12px] uppercase tracking-[0.18em]",
                        "text-[rgb(var(--muted))]",
                        "hover:opacity-80 active:scale-[0.98] transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--fg))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]",
                        logoFont.className
                      ].join(" ")}
                    >
                      <span className="shrink-0">{locale}</span>
                      <span aria-hidden="true">{localeOpen ? "–" : "+"}</span>
                    </button>

                    <div
                      className={[
                        "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out",
                        localeOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
                          {locales
                            .filter((l) => l !== locale)
                            .map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => {
                                  setLocaleOpen(false);
                                  onLocaleChange(l);
                                }}
                                className={[
                                  "flex w-full items-center justify-between px-4 py-3 text-start text-[12px]",
                                  "uppercase tracking-[0.18em] text-[rgb(var(--muted))]",
                                  "hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg))] transition",
                                  logoFont.className
                                ].join(" ")}
                              >
                                <span>{l}</span>
                                <span aria-hidden="true">→</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={[
                      "mt-auto mb-auto",
                      "text-[48px] leading-[1.02] sm:text-[64px]",
                      "uppercase tracking-[0.02em]",
                      logoFont.className
                    ].join(" ")}
                  >
                    {nav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          onNavigate?.(item.href);
                          onOpenChange(false);
                        }}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={[
                          "block w-full",
                          "px-6 py-4 sm:py-5",
                          "text-[rgb(var(--fg))]",
                          "rgb-menu",
                          "hover:opacity-80 transition-opacity",
                          isActive(item.href) ? "opacity-100" : "opacity-85"
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          portalEl
        )
        : null}
    </div>
  );
}