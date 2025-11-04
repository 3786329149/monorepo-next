"use client";

import { usePathname } from "next/navigation";
import { cn } from "@repo/shadcn/lib/utils";

import { Home, Menu, Settings, Users } from "lucide-react";
import { FOOTER_HEIGHT } from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import { SidebarItem } from "./SidebarItem";
import { menus } from "#/mock/menu";

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useLayoutStore();

  return (
    <div className="flex flex-col h-full">
      {/* 菜单滚动区 */}
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden px-2 py-2  scrollbar-thin scrollbar-thumb-border/40 hover:scrollbar-thumb-border/60",
          collapsed ? "items-center" : "items-start"
        )}
      >
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
        className=" border-t flex items-center justify-center text-xs text-muted-foreground"
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
    </div>
  );
}
