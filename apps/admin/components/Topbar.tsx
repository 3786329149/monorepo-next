"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Settings, Moon, Sun } from "lucide-react";

import { Button } from "@repo/shadcn/components/ui/button";
import { cn } from "@repo/shadcn/lib/utils";

import { menuItems } from "#/mock/menu";
import { useLayoutStore } from "#/store/useLayoutStore";

import SettingDrawer from "./layout/setting-drawer";

export default function Topbar() {
  const pathname = usePathname();
  const { layout, collapsed, setLayout, toggleCollapse } = useLayoutStore();

  const [openDrawer, setOpenDrawer] = useState(false);

  // 计算左侧 margin（右侧主区的偏移），只在右侧容器使用此值
  // 这里不做样式处理，Topbar 本身占满容器宽度
  return (
    <header
      className={cn(
        "flex items-center justify-between h-14 px-6 border-b bg-background z-30",
        // Topbar 固定在顶部（按需）
        "sticky top-0"
      )}
    >
      <div className="flex items-center gap-4">
        {/* 布局切换快捷按钮（演示） */}

        {/* 仅在 side/mix 显示 折叠控件（演示里也放出来） */}
        {layout !== "top" && (
          <Button variant="ghost" size="icon" onClick={toggleCollapse}>
            {collapsed ? "展开" : "收起"}
          </Button>
        )}

        {/* <div className="flex items-center gap-2">
          <Button
            variant={layout === "side" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayout("side")}
          >
            侧边
          </Button>
          <Button
            variant={layout === "top" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayout("top")}
          >
            顶部
          </Button>
          <Button
            variant={layout === "mix" ? "default" : "outline"}
            size="sm"
            onClick={() => setLayout("mix")}
          >
            混合
          </Button>
          
        </div> */}

        {/* 如果是 top 或 mix，显示顶部主导航 */}
        {layout !== "side" && (
          <nav className="flex items-center gap-4 ml-6">
            {menuItems.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  pathname === m.href ? "text-primary" : "text-foreground"
                )}
              >
                {m.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setOpenDrawer(true)}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <SettingDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </header>
  );
}
