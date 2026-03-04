import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "ar", "it"] as const;

type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function middleware(req: NextRequest) {
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

  // Base locale redirects if missing locale prefix
  if (!isLocale(seg)) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    url.search = search;
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", "en");
    return res;
  }

  // --- CONFIDENTIAL ROUTE PROTECTION ---
  // Protect all paths INSIDE /confidential/ (e.g. /en/confidential/item-1)
  // But strictly EXCLUDE the base route /en/confidential (which is the login page)
  const isConfidentialItem = pathname.match(/^\/[a-z]{2}\/confidential\/(.+)$/);

  if (isConfidentialItem) {
    const sessionCookie = req.cookies.get("confidential_session")?.value;

    let isAuthorized = false;
    if (sessionCookie) {
      try {
        const JWT_SECRET = new TextEncoder().encode(
          process.env.JWT_SECRET || "fallback_local_secret_for_development_only_12345"
        );
        // Edge runtime compatible verification
        const jose = await import('jose');
        await jose.jwtVerify(sessionCookie, JWT_SECRET);
        isAuthorized = true;
      } catch (err) {
        console.warn("Invalid JWT Session Token in middleware.");
      }
    }

    if (!isAuthorized) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${seg}/confidential`;
      const res = NextResponse.redirect(loginUrl);
      return res;
    }
  }

  const res = NextResponse.next();
  res.cookies.set("NEXT_LOCALE", seg);
  return res;
}

export const config = {
  matcher: ["/:path*"]
};
