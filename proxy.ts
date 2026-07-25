import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: "/about/:path*",
};
