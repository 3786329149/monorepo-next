import { NextResponse } from "next/server";

//   1 如果菜单项有 roles 字段，则用户至少有一个角色匹配才能显示。
//   2 如果菜单项有 permissions 字段，则用户至少有一个权限匹配才能显示。
//   3 都没有限制则默认显示。支持 递归子菜单。
export async function GET() {
  return NextResponse.json({
    code: 0,
    message: "success",
    data: [
      {
        id: "1",
        key: "1",
        title: "Dashboard",
        path: "/dashboard",
        icon: "Home",
        badgeColor: "",
        badge: "new",
        // 这里没有permission和role字段 所以都能显示
      },
      {
        id: "2",
        key: "2",
        title: "Users",
        icon: "Users",
        roles: ["admin", "develop"], // 这里采用了方法一 利用roles字段 只要用户 use.roles = ["develop" || "admin"]
        children: [
          {
            id: "2-1",
            key: "2-1",
            title: "Users List",
            path: "/users/list",
            badgeColor: "destructive",
            badge: "update",
            children: [
              {
                id: "2-1-1",
                key: "2-1-1",
                title: "Admin Role",
                path: "/users/list/admin",
                badgeColor: "default",
                badge: "10",
                roles: ["admin"],
              },
              {
                id: "2-1-2",
                key: "2-1-2",
                title: "Develop Role",
                path: "/users/list/develop",
                badgeColor: "outline",
                badge: "20",
                // 这里采用的是方式二 permission 所以只要让用户的permissions添加"users:view" 就可以显示菜单了
                // user.permission = [xxx,"dashboard:view",xxx]
                permission: ["users:view"],
              },
            ],
          },
          {
            id: "2-2",
            key: "2-2",
            title: "Permission",
            path: "/users/permissions",
          },
        ],
      },
      {
        id: "3",
        key: "3",
        title: "Settings",
        path: "/settings",
        icon: "Settings",
        roles: ["admin", "manager", "develop"],
      },
      {
        id: "4",
        key: "4",
        title: "Tailwind",
        icon: "Eclipse",
        path: "/tailwind",
        badge: "",
        roles: ["admin", "develop", "manager"],
      },
      {
        id: "5",
        key: "5",
        title: "Guest Page",
        path: "/guest",
        roles: ["guest"],
      },
    ],
  });
}
