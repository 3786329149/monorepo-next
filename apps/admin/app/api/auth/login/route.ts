import { NextResponse } from "next/server";

const users = [
  { username: "admin", password: "123456", token: "admin" },
  { username: "develop", password: "123456", token: "develop" },
  { username: "viewer", password: "123456", token: "viewer" },
  { username: "guest", password: "123456", token: "guest" },
  { username: "manager", password: "123456", token: "manager" },
];

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // 查找用户
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const res = NextResponse.json({
      token: `mock-token-${user.token}`,
    });

    // 登录成功后写入 Cookie
    res.cookies.set("user-token", `mock-token-${user.token}`, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1天
    });

    return res;
  }

  return NextResponse.json({ message: "用户名或密码错误" }, { status: 401 });
}
