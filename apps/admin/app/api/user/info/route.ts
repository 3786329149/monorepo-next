import { NextRequest, NextResponse } from "next/server";

const adminPermissions = [
  "dashboard:view",
  "dashboard:edit",
  "users:view",
  "users:edit",
  "users:add",
  "users:delete",
  "settings:access",
  "tailwind:view",
  "role:view",
  "menu:view",
  "department:view",
];

const developPermissions = [
  "dashboard:view",
  "users:view",
  "users:edit",
  "users:delete",
  "settings:view",
  "tailwind:view",
  "role:view",
  "menu:view",
  "department:view",
];

const managerPermissions = [
  "dashboard:view",
  "dashboard:edit",
  "users:view",
  "users:edit",
  "settings:access",
  "tailwind:view",
  "role:view",
  "menu:view",
  "department:view",
];

// 模拟用户数据表
const userInfo = [
  {
    id: "u001",
    name: "Ann",
    token: "mock-token-admin",
    role: ["admin"],
    permissions: adminPermissions,
  },
  {
    id: "u002",
    name: "AnnJimmy",
    token: "mock-token-develop",
    role: ["develop"],
    permissions: developPermissions,
  },
  {
    id: "u003",
    name: "AnnTom",
    token: "mock-token-viewer",
    role: ["viewer"],
    permissions: [
      "dashboard:view",
      "users:view",
      "users:edit",
      "settings:view",
    ],
  },
  {
    id: "u004",
    name: "AnnS",
    token: "mock-token-guest",
    role: ["guest"],
    permissions: ["dashboard:view"],
  },
  {
    id: "u005",
    name: "AnnT",
    token: "mock-token-manager",
    role: ["manager", "develop", "admin"],
    permissions: managerPermissions,
  },
];

export async function GET(req: NextRequest) {
  // const token = req.headers.get("authorization");

  const token = req.cookies.get("user-token")?.value || "";

  if (!token) {
    return NextResponse.json(
      { code: 401, message: "未登录或 token 无效" },
      { status: 401 }
    );
  }

  // 根据 token 查找用户信息
  const user = userInfo.find((u) => u.token === token);

  if (!user) {
    return NextResponse.json(
      { code: 401, message: "token 不存在或已过期" },
      { status: 401 }
    );
  }
  return NextResponse.json({
    code: 0,
    message: "success",
    data: {
      id: user.id,
      name: user.name,
      roles: user.role,
      permissions: user.permissions,
    },
  });
}
