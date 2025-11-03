"use client";

import { Home, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";
import { ScrollArea } from "@repo/shadcn/components/ui/scroll-area";
import { SidebarItem, type MenuItem } from "./SidebarItem";

const HEADER_HEIGHT = 56;
const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED = 64;

const menus: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/",
    badgeColor: "destructive",
    badge: "NEW",
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
    badgeColor: "destructive",
    badge: "NEW",
    children: [
      {
        key: "user-list",
        label: "User List",
        href: "/users/list",
        badgeColor: "destructive",
        badge: "update",
        children: [
          {
            key: "user-list-admin",
            label: "Admin Role",
            href: "/users/list/admin",
            badgeColor: "default",
            badge: "10",
          },
          {
            key: "user-list-developer",
            label: "Develop Role",
            href: "/users/list/develop",
            badgeColor: "outline",
            badge: "20",
          },
        ],
      },
      {
        key: "user-permission",
        label: "Permissions",
        href: "/users/permissions",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { key: "general", label: "General", href: "/settings/general" },
      { key: "profile", label: "Profile", href: "/settings/profile" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, mode } = useLayoutStore();

  const mix = mode === "mix";

  const base =
    "fixed left-0 h-screen border-r border-border bg-background overflow-x-visible overflow-y-hidden transition-[width] duration-300 ease-in-out";

  const layout = mix
    ? `top-[${HEADER_HEIGHT}px] h-[calc(100vh-${HEADER_HEIGHT}px)]`
    : "top-0 h-screen z-50";

  const width = collapsed
    ? `w-[${SIDEBAR_COLLAPSED}px]`
    : `w-[${SIDEBAR_WIDTH}px]`;

  return (
    <aside className={cn(base, layout, width)}>
      {mode === "side" && (
        <div className="h-[56px] flex items-center justify-center border-b border-border">
          {collapsed ? "🌀" : "My Admin"}
        </div>
      )}

      <ScrollArea className="flex-1 overflow-y-auto">
        <nav className="flex flex-col p-2 min-h-full">
          {menus.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              collapsed={collapsed}
              pathname={pathname}
            />
          ))}
        </nav>
      </ScrollArea>

      <div className="h-14 flex items-center justify-center border-t text-xs text-muted-foreground">
        {!collapsed ? "v1.0.0 • 管理系统" : "v1.0"}
      </div>
    </aside>
  );
}
