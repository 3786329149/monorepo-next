import { NextRequest, NextResponse } from "next/server";

/**
 * 📌 说明：
  1. 自动拦截未登录用户，重定向 /login。
  2. 如果已登录访问 /login，则跳转 /dashboard。
  3. 允许访问 /api/* 之类的公共接口。
*/

// 白名单路径
const publicPaths = ["/login", "/_next", "/api", "/favicon.ico"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //  白名单 公共路径放行
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("user-token")?.value || "";

  // 未登录 → 跳转到登录页
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 已登录但访问 /login → 自动跳转 dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
