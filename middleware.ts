import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";
import { countryToLocale, defaultLocale } from "./src/i18n/config";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // On Vercel, detect country from IP and set locale accordingly
  const country = request.headers.get("x-vercel-ip-country") || "";
  const detectedLocale = countryToLocale[country];

  // If we detected a non-English locale from IP, and user hasn't already chosen a locale
  // (no NEXT_LOCALE cookie), redirect to the detected locale
  if (detectedLocale && detectedLocale !== defaultLocale) {
    const hasLocaleCookie = request.cookies.get("NEXT_LOCALE");
    const pathname = request.nextUrl.pathname;

    // Check if URL already has a locale prefix
    const hasLocalePrefix = routing.locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!hasLocaleCookie && !hasLocalePrefix && pathname === "/") {
      // First visit from a non-English country — redirect to their locale
      const url = request.nextUrl.clone();
      url.pathname = `/${detectedLocale}`;
      const response = intlMiddleware(request);
      // Set cookie so we don't redirect again on subsequent visits
      response.cookies.set("NEXT_LOCALE", detectedLocale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except API routes, static files, Next.js internals, and test pages
    "/((?!api|_next|_vercel|test-report|.*\\..*).*)",
  ],
};
