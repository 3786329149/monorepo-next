"use client";

import { cn } from "@repo/shadcn/lib/utils";
import { HEADER_HEIGHT } from "#/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/ui/avatar";
import { Switch } from "@repo/shadcn/components/ui/switch";
import { Button } from "@repo/shadcn/components/ui/button";
import { useLayoutStore } from "#/store/useLayoutStore";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const { collapsed, toggleCollapsed, mode, setMode, darkMode, toggleDark } =
    useLayoutStore();
  return (
    <header
      className={cn(
        "border-b border-border flex items-center justify-between px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30"
      )}
      style={{ height: HEADER_HEIGHT }}
    >
      {/* 左侧 - LOGO + 折叠按钮 */}
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">My Admin</div>
        <motion.button
          onClick={toggleCollapsed}
          whileTap={{ scale: 0.9 }}
          className="p-1 rounded-md hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* 中间  */}
      <div className="flex gap-4 items-center"></div>

      {/* 右侧 用户区  */}
      <div className="flex items-center gap-2">
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

        {/* 用户头像 */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">Hello, Ann 👋</span>
      </div>
    </header>
  );
}
