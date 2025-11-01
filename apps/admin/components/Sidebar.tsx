"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";
import { Home, Users, Settings } from "lucide-react";
import Link from "next/link";

const HEADER_HEIGHT = 56;
const SIDEBAR_WIDTH = 200;
const SIDEBAR_COLLAPSED = 64;

interface SidebarProps {
  mix?: boolean;
  // children?: React.ReactNode;
}

export default function Sidebar({ mix }: SidebarProps) {
  const { collapsed, mode } = useLayoutStore();

  const menus = mix
    ? [
        {
          key: "overview",
          label: "Overview",
          icon: Home,
          href: "/dashboard/overview",
        },
        {
          key: "reports",
          label: "Reports",
          icon: Users,
          href: "/dashboard/reports",
        },
      ]
    : [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: Home,
          href: "/dashboard",
        },
        { key: "users", label: "Users", icon: Users, href: "/users" },
        {
          key: "settings",
          label: "Settings",
          icon: Settings,
          href: "/settings",
        },
      ];
  const base =
    "fixed left-0 border-r border-border bg-background overflow-hidden transition-[width] duration-300 ease-in-out";
  const layout = mix
    ? `top-[${HEADER_HEIGHT}px] h-[calc(100vh-${HEADER_HEIGHT}px)]`
    : "top-0 h-screen";
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

      <nav className="flex flex-col p-2">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition-all",
                collapsed ? "justify-center" : "gap-2"
              )}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
