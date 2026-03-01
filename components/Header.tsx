"use client";

import Link from "next/link";
import { Red_Hat_Display } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import LogoMark from "./LogoMark";
import { useI18n } from "@/components/I18nProvider";
import { locales, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

const logoFont = Red_Hat_Display({ subsets: ["latin"], weight: ["300"], display: "swap" });

export default function Header() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: t("nav.home"), href: `/${locale}` },
      { label: t("nav.about"), href: `/${locale}/about` },
      { label: t("nav.why"), href: `/${locale}/why` },
      { label: t("nav.expertise"), href: `/${locale}/expertise` },
      { label: t("nav.work"), href: `/${locale}/work` },
      { label: t("nav.contact"), href: `/${locale}/contact` }
    ],
    [t, locale]
  );

  const onLocaleChange = (next: Locale) => {
    // Basic locale swap on paths
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) parts[0] = next;
    const nextPath = `/${parts.join("/")}`;
    router.push(nextPath);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine active route
  // Default to checking exact match, or treating /:locale exactly like /:locale/
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  const isAboutPage = pathname.endsWith("/about");

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 transition-all duration-500",
        menuOpen ? "z-[10000]" : "z-50",
        !menuOpen && scrolled
          ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-md pb-8 pt-0"
          : "bg-transparent pointer-events-auto pb-0 pt-0"
      ].join(" ")}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          {/* LOGO */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="flex items-center text-[rgb(var(--muted))] opacity-90 transition-colors group-hover:text-white">
              <LogoMark size={62} className="shrink-0" />
            </span>
            <span
              className={[
                logoFont.className,
                "text-[20px] font-light leading-none tracking-[0.02em]"
              ].join(" ")}
            >
              d.Creator
            </span>
          </Link>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            <div className={[
              "flex items-center gap-3 transition-opacity duration-300",
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            ].join(" ")}>
              <ThemeToggle />

              <div className="relative hidden sm:inline-flex">
                <button
                  type="button"
                  aria-label="Language"
                  aria-expanded={localeOpen}
                  onClick={() => setLocaleOpen((v) => !v)}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 text-[12px] uppercase tracking-[0.14em] text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:opacity-80 active:scale-[0.98] transition focus-visible:outline-none"
                >
                  {locale}
                </button>

                <div
                  className={[
                    "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[120px] overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-[0_30px_120px_rgba(0,0,0,0.18)]",
                    "transition-all duration-300 origin-top",
                    localeOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
                  ].join(" ")}
                >
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
              </div>

              <MagneticButton>
                <Link
                  href={`/${locale}/contact`}
                  className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-[rgb(var(--fg))] px-5 text-[13px] font-medium text-[rgb(var(--bg))] hover:opacity-90 active:scale-[0.98] transition"
                >
                  {t("header.letsTalk")}
                </Link>
              </MagneticButton>
            </div>

            <MobileMenu
              nav={nav}
              activeHref={pathname}
              locale={locale}
              onLocaleChange={onLocaleChange}
              onNavigate={() => { }}
              open={menuOpen}
              onOpenChange={setMenuOpen}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}