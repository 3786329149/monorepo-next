import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "123456") {
    const res = NextResponse.json({ token: "mock-token-123" });
    // 登录成功后写入 Cookie
    res.cookies.set("user-token", "mock-token-123", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1天
    });
    return res;
  }

  return NextResponse.json({ message: "用户名或密码错误" }, { status: 401 });
}
