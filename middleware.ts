import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoute = pathname.startsWith("/dashboard");
  const authRoute = pathname.startsWith("/auth");

  // Get the cookie from the request
  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );
  const session = await response.json();

  /**
   * If not authenticated don't allow /dashboard pages
   * Redirect to /auth/sign-in
   */
  if (protectedRoute) {
    return session
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  /**
   * If authenticated don't allow /auth pages
   * Redirect to /dashboard
   */
  if (authRoute) {
    return session
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
