"use client";

import { useState } from "react";
import { Red_Hat_Display } from "next/font/google";
import LogoMark from "./LogoMark";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "@/components/I18nProvider";
import { locales, type Locale } from "@/lib/i18n";

const logoFont = Red_Hat_Display({ subsets: ["latin"], weight: ["300"], display: "swap" });

function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: unknown) => void } }).__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(target, { offset: -84 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function MobileMenu({
  nav
  ,
  activeHref,
  locale,
  onLocaleChange
}: {
  nav: { label: string; href: string }[];
  activeHref?: string;
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? t("menu.close") : t("menu.open")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--card))] transition"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={t("menu.close")}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          <div className="relative h-full bg-[rgb(var(--bg))]">
            <div className="flex items-center justify-between px-5 py-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center text-[rgb(var(--muted))] opacity-90">
                  <LogoMark size={70} className="shrink-0" />
                </span>
                <div className={[logoFont.className, "text-[22px] font-light leading-none tracking-[0.02em]"].join(" ")}>d.Creator</div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  aria-label={t("menu.close")}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[rgb(var(--border))] px-3 py-2 text-sm"
                >
                  {t("menu.closeButton")}
                </button>
              </div>
            </div>

            <div className="relative px-5 pb-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-full rounded-3xl bg-gradient-to-b from-black/5 via-transparent to-black/10" />

              <div className="relative pt-4">
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Language"
                    aria-expanded={localeOpen}
                    onClick={() => setLocaleOpen((v) => !v)}
                    className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-[rgb(var(--muted))]"
                  >
                    <span className="shrink-0">{locale}</span>
                    <span aria-hidden="true">{localeOpen ? "–" : "+"}</span>
                  </button>

                  {localeOpen ? (
                    <div className="mt-2 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
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
                            className="flex w-full items-center justify-between px-4 py-3 text-start text-[12px] uppercase tracking-[0.14em] text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg))] transition"
                          >
                            <span>{l}</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className={[
                "relative space-y-3 pt-4 text-[13px]",
                "uppercase tracking-[0.14em]",
                logoFont.className
              ].join(" ")}>
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToHash(item.href);
                      }
                      setOpen(false);
                    }}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    className={[
                      "flex items-center gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-4",
                      "hover:opacity-90 transition",
                      activeHref === item.href ? "text-[rgb(var(--fg))]" : ""
                    ].join(" ")}
                  >
                    <span className="inline-flex items-start gap-2 leading-none">
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={[
                          "mt-[2px] h-1 w-1 rounded-full bg-current",
                          activeHref === item.href ? "opacity-100" : "opacity-0",
                          "transition-opacity duration-200"
                        ].join(" ")}
                      />
                    </span>
                  </a>
                ))}
              </div>

              <div className="relative mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 text-sm text-[rgb(var(--muted))]">
                <div className="font-medium text-[rgb(var(--fg))]">{t("nav.contact")}</div>
                <div className="mt-2">3891 Ranchview Dr. Richardson</div>
                <div>hello@d.creator</div>
                <div>(505) 555-0125</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}