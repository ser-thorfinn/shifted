import { NextRequest, NextResponse } from "next/server";

const VALID_PASSWORD = process.env.SITE_PASSWORD || "sideshift2026";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("shift-auth");
  if (authCookie?.value === VALID_PASSWORD) return NextResponse.next();
  if (request.nextUrl.pathname === "/api/auth") return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/favicon")) return NextResponse.next();
  if (request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
