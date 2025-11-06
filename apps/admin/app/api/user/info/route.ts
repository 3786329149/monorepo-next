import { NextResponse } from "next/server";

export async function GET() {
  // 模拟后端返回
  return NextResponse.json({
    code: 0,
    message: "success",
    data: {
      id: "u001",
      name: "Ann",
      role: "admin",
      permissions: ["dashboard:view", "users:edit", "settings:access"],
    },
  });
}
