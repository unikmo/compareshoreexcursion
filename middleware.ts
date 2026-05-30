import { NextResponse, type NextRequest } from "next/server";
import { canAccessRoute, type Role } from "@/lib/auth/roles";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("sf_role")?.value as Role | undefined;
  const protectedPath =
    request.nextUrl.pathname.startsWith("/customer") ||
    request.nextUrl.pathname.startsWith("/operator") ||
    request.nextUrl.pathname.startsWith("/admin");

  if (!protectedPath) {
    return NextResponse.next();
  }

  if (!role) {
    return NextResponse.next();
  }

  if (!canAccessRoute(role, request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/operator/:path*", "/admin/:path*"],
};
