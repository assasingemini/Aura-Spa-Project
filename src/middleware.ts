import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight middleware — only checks for NextAuth session cookie.
 * Full role/permission checks happen in server components/API routes.
 * This avoids bundling NextAuth/Prisma/bcryptjs into the Edge Function.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for NextAuth session cookie
  const sessionToken =
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("__Secure-next-auth.session-token");

  if (pathname.startsWith("/admin")) {
    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
