import jwt, { JwtPayload } from "jsonwebtoken";
import { Public_Sans } from "next/font/google";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";
import getNewAccessToken from "./service/refreshToken";
import { getSubscriptionStatus } from "./app/(public group)/_actions/getSubscriptionStatus";

const AUTH_ROUTES = ["/login", "/register"];
// const PUBLIC_ROUTES = ["/", "/news", "/login", "/register"]
const PUBLIC_ROUTES = ["/", "/news"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  // kon path e jabe seta detect korar jonno
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodeAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;
  const decodeRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  let userRole = null;

  if (!decodeAccessToken?.success && decodeRefreshToken?.success) {
    //access token has expired but refresh token is valid, get new access token from backend
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodeAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  if (!decodeAccessToken?.success) {
    cookieStore.delete("accessToken");
    // return NextResponse.redirect(new URL("/login ", request.url));
  }

  if (decodeAccessToken?.success && decodeAccessToken.data) {
    userRole = (decodeAccessToken.data as JwtPayload).role;
    console.log(userRole);
  }

  //user is logged in and trying to access login or register page, redirect to dashboard or root home page

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    }
  }

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuth = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  // Authenticated page protection
  if (!accessToken && !isPublic && !isAuth) {
    return NextResponse.redirect(new URL("/login ", request.url));
  }

  //   Role Based Authorization

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found ", request.url));
  }
  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found ", request.url));
  }
  if (pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
    return NextResponse.redirect(new URL("/not-found ", request.url));
  }

  if (pathname === "/premium") {
    const subscribeStatus = await getSubscriptionStatus();
    const isActive = Boolean(
      subscribeStatus?.success && subscribeStatus.data?.isSubscribed,
    );

    if (!isActive) {
      return NextResponse.redirect(new URL("/payment ", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
};
