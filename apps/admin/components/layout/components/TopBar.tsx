"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";

import SettingDrawer from "./setting-drawer";
import { ChevronLeft, ChevronRight, Settings, LayoutGrid } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/ui/avatar";
import { Button } from "@repo/shadcn/components/ui/button";
import { Switch } from "@repo/shadcn/components/ui/switch";
interface TopBarProps {
  variant: "side" | "top" | "mix";
}

const menuItems = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard" },
  { key: "users", label: "Users", href: "/users" },
  { key: "settings", label: "Settings", href: "/settings" },
];

export default function TopBar({ variant }: TopBarProps) {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mode, setMode, darkMode, toggleDark } =
    useLayoutStore();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <header
      className={cn(
        "h-[56px] border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-40",
        variant === "top" && "shadow-sm"
      )}
    >
      <div className="flex items-center gap-4">
        {variant === "side" && (
          <Button variant="ghost" size="icon" onClick={toggleCollapsed}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}

        {/* 侧边栏模式下的菜单栏 */}
        {variant !== "side" && (
          <>
            <span>🌀</span> <span>My Admin</span>
            <nav className="flex items-center gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* 用户头像 */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>

        {/* 主题切换示例（可以替换为你的 ThemeProvider hook） */}
        <Switch checked={darkMode} onCheckedChange={toggleDark} />

        {/* 布局切换按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setMode(mode === "side" ? "top" : mode === "top" ? "mix" : "side")
          }
        >
          <LayoutGrid size={16} className="mr-2" />
          {mode === "side" ? "Side" : mode === "top" ? "Top" : "Mix"}
        </Button>

        {/* 设置抽屉按钮 */}
        <Button variant="ghost" size="icon" onClick={() => setOpenDrawer(true)}>
          <Settings className="h-5 w-5" />
        </Button>
        {/* 设置抽屉组件 */}
        <SettingDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
      </div>
    </header>
  );
}
