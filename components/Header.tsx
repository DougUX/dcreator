"use client";

import Link from "next/link";
import { Red_Hat_Display, Caveat } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import MagneticButton from "./MagneticButton";
import LogoMark from "./LogoMark";
import { useI18n } from "@/components/I18nProvider";
import { locales, type Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import AnimatedButton from "./AnimatedButton";

const logoFont = Red_Hat_Display({ subsets: ["latin"], weight: ["300"], display: "swap" });
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

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
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

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
          <div className="flex items-center gap-4 md:gap-[40px]">
            <div className={[
              "flex items-center gap-4 md:gap-[40px] transition-opacity duration-300",
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            ].join(" ")}>
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

              {!isHomePage && (
                <div className="relative group flex items-center">
                  <AnimatedButton
                    href="#book"
                    variant="primary"
                    className="!px-3 !py-1.5 !min-w-[80px] !text-[10px] sm:!px-4 sm:!py-2 sm:!min-w-[100px] sm:!text-xs"
                  >
                    {t("header.letsTalk")}
                  </AnimatedButton>

                  <div
                    className="hidden sm:flex absolute top-[calc(100%+8px)] right-[50%] w-[320px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-50 items-start justify-end gap-2 pr-6"
                  >
                    <div className={`text-white text-[22px] md:text-[26px] transform -rotate-[10deg] mt-10 whitespace-nowrap ${caveatFont.className} leading-none tracking-wide`}>
                      Book a 15-min call to <br />
                      <span className="inline-block mt-2">explore your needs.</span>
                    </div>
                    <svg width="60" height="80" viewBox="0 0 100 100" className="opacity-90 transform -translate-y-4 flex-shrink-0">
                      <path d="M10,80 C 40,80 60,60 85,15" stroke="white" fill="transparent" strokeWidth="2" strokeLinecap="round" />
                      <path d="M70,25 L85,15 L90,30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
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