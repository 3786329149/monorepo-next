"use client";

import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { TopBarItem } from "./TopBarItem";
import { HEADER_HEIGHT } from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import { menus } from "#/mock/menu";
import { Switch } from "@repo/shadcn/components/ui/switch";
import { Button } from "@repo/shadcn/components/ui/button";
import { LayoutGrid } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/shadcn/components/ui/avatar";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode, darkMode, toggleDark, activeKey, setActiveKey } =
    useLayoutStore();

  return (
    <motion.header
      layout
      className="border-b border-border flex items-center justify-between px-4 shadow-sm"
      style={{ height: HEADER_HEIGHT }}
    >
      {/* 左侧 Logo */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => router.push("/")}
          className="text-lg font-semibold cursor-pointer select-none"
        >
          My Admin
        </div>
      </div>

      {/* 中间菜单栏 */}
      <div className="flex gap-1 items-center">
        {menus.map((item) => (
          <TopBarItem
            key={item.key}
            item={item}
            pathname={pathname}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        ))}
      </div>

      {/* 右侧 - 用户 */}
      <div className="flex items-center text-sm text-muted-foreground gap-3">
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
    </motion.header>
  );
}
