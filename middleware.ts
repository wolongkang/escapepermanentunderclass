import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  matcher: [
    // Match all paths except API routes, static files, Next.js internals, and test pages
    "/((?!api|_next|_vercel|test-report|.*\\..*).*)",
  ],
};
