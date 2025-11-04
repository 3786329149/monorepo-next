"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@repo/shadcn/lib/utils";

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import {
  SIDEBAR_COLLAPSED,
  SIDEBAR_WIDTH,
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
} from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import { SidebarItem, type MenuItem } from "./SidebarItem";
import { Button } from "@repo/shadcn/components/ui/button";

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
  const { collapsed, toggleCollapsed } = useLayoutStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative border-r border-border bg-background flex flex-col"
    >
      {/* Sidebar 顶部区域 */}
      <div
        className={cn(
          "flex items-center justify-between  px-4 border-b border-border"
        )}
        style={{ height: HEADER_HEIGHT }}
      >
        {/* 左侧 Logo */}
        {!collapsed ? (
          <span className="font-semibold text-base">My Admin</span>
        ) : (
          <span className="text-lg">🌀</span>
        )}

        {/* 右侧折叠按钮 */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="shrink-0"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button> */}
      </div>

      {/* Sidebar 中间菜单区域 */}
      <div className="p-2 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
        {menus.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            collapsed={collapsed}
            pathname={pathname}
          />
        ))}
      </div>

      {/* 底部固定区域 */}
      <div
        className="border-t flex items-center justify-center text-xs text-muted-foreground"
        style={{ height: FOOTER_HEIGHT }}
      >
        {!collapsed && <span>v1.0.0</span>}
        <button
          onClick={() => toggleCollapsed()}
          className="p-1.5 hover:bg-accent rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>
    </motion.aside>
  );
}
