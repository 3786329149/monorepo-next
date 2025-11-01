"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";
import { Home, Users, Settings } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  mix?: boolean;
}

export default function Sidebar({ mix }: SidebarProps) {
  const { collapsed } = useLayoutStore();

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

  return (
    <aside
      className={cn(
        "fixed left-0 top-[56px] h-[calc(100vh-56px)] border-r border-border bg-background transition-all duration-300 overflow-y-auto",
        collapsed ? "w-[64px]" : "w-[200px]"
      )}
    >
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
