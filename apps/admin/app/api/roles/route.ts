import { NextResponse } from "next/server";

// mock 角色数据
let roles = [
  {
    id: 1,
    name: "管理员",
    description: "系统最高权限，可访问所有模块",
    permissions: ["dashboard:view", "users:edit", "settings:access"],
  },
  {
    id: 2,
    name: "开发者",
    description: "可访问开发者相关功能",
    permissions: ["dashboard:view", "settings:view"],
  },
  {
    id: 3,
    name: "访客",
    description: "仅能查看基础信息",
    permissions: ["dashboard:view"],
  },
];

// GET /api/roles
export async function GET() {
  return NextResponse.json({ code: 0, data: roles });
}

// POST /api/roles
export async function POST(req: Request) {
  const body = await req.json();
  const newRole = { id: Date.now(), ...body };
  roles.push(newRole);
  return NextResponse.json({
    code: 0,
    message: "success",
    data: newRole,
  });
}
