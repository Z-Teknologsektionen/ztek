import type { AccountRoles } from "@prisma/client";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { activeRoutes } from "./data/routes";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;
    const isAdmin = request.nextauth.token?.admin;

    const hasRoleOrIsAdmin = (role: AccountRoles | undefined): boolean => {
      return (
        role === undefined || token?.roles.includes(role) || isAdmin || false
      );
    };

    if (pathname.startsWith("/admin") && !isAdmin) {
      // Handles all admin routes
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (pathname.startsWith("/active") && !hasRoleOrIsAdmin(undefined)) {
      //Handles /active route(s). Everybody that is signed in can by default view all /active pages
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    const UNAUTHORIZED = activeRoutes.some(
      ({ requiredRole, route }) =>
        //Handles all routes with special roles
        pathname.startsWith(route) && !hasRoleOrIsAdmin(requiredRole),
    );

    if (UNAUTHORIZED)
      return NextResponse.rewrite(new URL("/denied", request.url));
  },
  {
    callbacks: {
      authorized: ({ token: _token }) => true, // TODO: Detta borde vara !!token. Just nu behandlas alla som inloggade men fungerar konstigt nog för tillfället
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/active/:path*"],
};