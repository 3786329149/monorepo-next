import { NextResponse } from "next/server";

let users = [
  { id: 1, name: "Ann", department: "技术部", role: "管理员" },
  { id: 2, name: "Jimmy", department: "前端组", role: "开发者" },
  { id: 3, name: "Tom", department: "市场部", role: "访客" },
];

export async function GET() {
  return NextResponse.json({ code: 0, data: users });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newUser = { id: Date.now(), ...body };
  users.push(newUser);
  return NextResponse.json({ code: 0, message: "success", data: newUser });
}
