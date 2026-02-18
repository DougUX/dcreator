"use client";

import Link from "next/link";
import { Red_Hat_Display } from "next/font/google";
import { useEffect, useState } from "react";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import LogoMark from "./LogoMark";
import { useI18n } from "@/components/I18nProvider";
import { locales, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

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

export default function Header() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const [localeOpen, setLocaleOpen] = useState(false);

  const nav = [
    { label: t("nav.home"), href: "#top" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.why"), href: "#why" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.work"), href: "#work" },
    { label: t("nav.contact"), href: "#contact" }
  ];

  const onLocaleChange = (next: Locale) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) parts[0] = next;
    const nextPath = `/${parts.join("/")}${hash}`;
    router.push(nextPath);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = nav
      .map((n) => ({ href: n.href, el: document.getElementById(n.href.replace(/^#/, "")) }))
      .filter((x): x is { href: string; el: HTMLElement } => Boolean(x.el));

    if (items.length === 0) return;

    const setActive = (href: string) => {
      setActiveHref((prev) => (prev === href ? prev : href));
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0];
        if (!top?.target) return;

        const hit = items.find((x) => x.el === top.target);
        if (hit) setActive(hit.href);
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-88px 0px -55% 0px"
      }
    );

    items.forEach((x) => io.observe(x.el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur",
        scrolled
          ? "bg-[rgb(var(--bg))]/85 border-b border-[rgb(var(--border))]"
          : "bg-[rgb(var(--bg))]/60"
      ].join(" ")}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Link href="#top" className="flex items-center gap-2">
            <span className="flex items-center text-[rgb(var(--muted))] opacity-90">
              <LogoMark size={62} className="shrink-0" />
            </span>
            <span
              className={[logoFont.className, "text-[20px] font-light leading-none tracking-[0.02em]"].join(" ")}
            >
              d.Creator
            </span>
          </Link>

          <nav
            className={[
              "hidden md:flex items-center gap-8 text-[12px]",
              "text-[rgb(var(--muted))]",
              logoFont.className
            ].join(" ")}
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    scrollToHash(item.href);
                  }
                }}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={[
                  "group inline-flex items-start gap-2 uppercase tracking-[0.14em]",
                  "hover:text-[rgb(var(--fg))] transition-colors",
                  activeHref === item.href ? "text-[rgb(var(--fg))]" : ""
                ].join(" ")}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={[
                    "mt-[2px] h-1 w-1 rounded-full bg-current",
                    activeHref === item.href ? "opacity-100" : "opacity-0",
                    "transition-opacity duration-200"
                  ].join(" ")}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="relative hidden sm:inline-flex">
              <button
                type="button"
                aria-label="Language"
                aria-expanded={localeOpen}
                onClick={() => setLocaleOpen((v) => !v)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/60 px-4 text-[12px] uppercase tracking-[0.14em] text-[rgb(var(--muted))] backdrop-blur hover:bg-[rgb(var(--card))] transition"
              >
                {locale}
              </button>

              {localeOpen ? (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[120px] overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
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

            <MagneticButton>
              <a
                href="#contact"
                className="hidden sm:inline-flex h-11 items-center justify-center rounded-full bg-[rgb(var(--fg))] px-5 text-[13px] font-medium text-[rgb(var(--bg))] hover:opacity-90 transition"
              >
                {t("header.letsTalk")}
              </a>
            </MagneticButton>
            <MobileMenu
              nav={nav}
              activeHref={activeHref}
              locale={locale}
              onLocaleChange={onLocaleChange}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}