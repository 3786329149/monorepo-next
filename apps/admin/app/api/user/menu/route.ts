import { NextResponse } from "next/server";

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
        permission: "dashboard:view",
      },
      {
        id: "4",
        key: "4",
        title: "Tailwind",
        icon: "Eclipse",
        path: "/tailwind",
        badge: "",
      },
      {
        id: "2",
        key: "2",
        title: "Users",
        icon: "Users",
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
              },
              {
                id: "2-1-2",
                key: "2-1-2",
                title: "Develop Role",
                path: "/users/list/develop",
                badgeColor: "outline",
                badge: "20",
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
        permission: "setting:access",
      },
    ],
  });
}
