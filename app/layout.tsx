import "./globals.css";
import type { Metadata } from "next";
import { Cairo, Montez, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import { dir, isLocale } from "@/lib/i18n";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

const montez = Montez({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "d.creator — Creative Studio",
  description: "d.creator landing page (Next.js + Tailwind).",
  icons: {
    icon: [
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: light)", type: "image/svg+xml" },
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)", type: "image/svg+xml" }
    ]
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await cookies();
  const raw = c.get("NEXT_LOCALE")?.value ?? "en";
  const locale = isLocale(raw) ? raw : "en";

  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={`${manrope.className} ${manrope.variable} ${montez.variable} ${locale === "ar" ? cairo.className : ""}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
