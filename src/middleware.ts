// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(req: NextRequest) {
  // শুধুমাত্র cookie বা token check করি
  const token = req.cookies.get("token")?.value;

  // যদি token না থাকে, /login এ redirect কর
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // token আছে মানে login, route allow কর
  return NextResponse.next();
}

// কোন routes এ middleware apply হবে
export const config = {
  matcher: [
    "/dashboard/:path*", // /dashboard এবং এর nested routes
  ],
};