import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ne"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // 1. Try to read locale cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Try Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    if (acceptLanguage.includes("ne") || acceptLanguage.includes("np")) {
      return "ne";
    }
  }

  // 3. Fallback to default
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Set response headers to preserve path
  const response = NextResponse.redirect(request.nextUrl);
  // Persist locale in cookie
  response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static assets, pdf docs)
    "/((?!api|_next/static|_next/image|images|documents|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
