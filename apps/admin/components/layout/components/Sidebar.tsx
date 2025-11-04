"use client";

import { Home, Users, Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";
import { ScrollArea } from "@repo/shadcn/components/ui/scroll-area";
import { SidebarItem, type MenuItem } from "./SidebarItem";
import { Button } from "@repo/shadcn/components/ui/button";

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
  const { collapsed, mode, toggleCollapsed } = useLayoutStore();

  const mix = mode === "mix";

  // sidebar 基础样式
  const base =
    "fixed left-0 h-screen border-r border-border bg-background overflow-x-visible overflow-y-hidden transition-[width] duration-300 ease-in-out";

  //TODO: 明天修复
  const layout = mix
    ? `top-[${HEADER_HEIGHT}px] h-[calc(100vh-${HEADER_HEIGHT}px)]`
    : "top-0 h-screen z-50";

  const width = collapsed
    ? `w-[${SIDEBAR_COLLAPSED}px]`
    : `w-[${SIDEBAR_WIDTH}px]`;

  return (
    <aside className={cn(base, layout, width, "flex flex-col")}>
      {/* 顶部栏 */}
      {mode === "side" && (
        <div className="h-[56px] flex items-center justify-center border-b border-border shrunk-0">
          {collapsed ? "🌀" : "My Admin"}
        </div>
      )}

      {/* 中间菜单滚动区 */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col p-2">
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

      <div className="h-14 flex items-center justify-center border-t text-xs text-muted-foreground shrink-0">
        {!collapsed ? "v1.0.0 • 管理系统" : "v1.0"}
        {mode === "mix" && (
          <Button variant="ghost" size="icon" onClick={toggleCollapsed}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>
    </aside>
  );
}
