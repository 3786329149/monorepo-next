"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@repo/shadcn/lib/utils";

import { Menu } from "lucide-react";
import {
  SIDEBAR_COLLAPSED,
  SIDEBAR_WIDTH,
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
} from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import { SidebarItem } from "./SidebarItem";
import { useMenuStore } from "#/store/useMenuStore";
import { useUserStore } from "#/store/useUserStore";
import { useEffect } from "react";
// import { menus } from "#/mock/menu";

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useLayoutStore();
  const { menuList, fetchMenuList } = useMenuStore();
  const { userInfo } = useUserStore();

  // 初始化记载菜单
  useEffect(() => {
    if (userInfo && menuList.length === 0) {
      fetchMenuList();
    }
  }, [userInfo]);

  return (
    <motion.aside
      layout
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
      <div
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden px-2 py-2  scrollbar-thin scrollbar-thumb-border/40 hover:scrollbar-thumb-border/60",
          collapsed ? "items-center" : "items-start"
        )}
      >
        {menuList.map((item) => (
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
