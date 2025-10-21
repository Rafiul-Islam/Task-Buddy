import {NextResponse, NextRequest} from 'next/server'
import {getToken} from "next-auth/jwt";
import {USER_ROUTES} from "@/constants/user";
import {AUTH_ROUTES} from "@/constants/auth";

export async function middleware(request: NextRequest) {

  const token = await getToken({req: request});
  const url = request.nextUrl;

  // If logged in and tries to access auth pages → redirect to dashboard
  if (token && (
    url.pathname === AUTH_ROUTES.SIGN_IN ||
    url.pathname === AUTH_ROUTES.SIGN_UP
  )) {
    return NextResponse.redirect(new URL(USER_ROUTES.DASHBOARD, url));
  }

  // If NOT logged in and tries to access protected routes → redirect to signin
  if (!token && (
    url.pathname.startsWith(USER_ROUTES.DASHBOARD) ||
    url.pathname.startsWith(USER_ROUTES.PROFILE)
  )) {
    return NextResponse.redirect(new URL(AUTH_ROUTES.SIGN_IN, request.url));
  }

  // Otherwise → allow request
  return NextResponse.next();

}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/signin",
    "/signin/:path*",
    "/signup",
    "/signup/:path*",
  ],
};
