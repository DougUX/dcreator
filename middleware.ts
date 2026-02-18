import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "ar"] as const;

type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Ignore next internals / assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    url.search = search;
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", "en");
    return res;
  }

  const seg = pathname.split("/")[1] ?? "";
  if (!isLocale(seg)) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    url.search = search;
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", "en");
    return res;
  }

  const res = NextResponse.next();
  res.cookies.set("NEXT_LOCALE", seg);
  return res;
}

export const config = {
  matcher: ["/:path*"]
};
