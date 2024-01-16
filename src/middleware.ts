import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse | void {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/kommitteer")) {
    return NextResponse.redirect(
      new URL(
        pathname.replace("kommitteer", "student-division/committees"),
        request.url,
      ),
    );
  }
}

export const config = {
  matcher: ["/kommitteer/:path*"],
};
