"use client";

import { cn } from "@repo/shadcn/lib/utils";
import { HEADER_HEIGHT } from "#/constants";

import { useLayoutStore } from "#/store/useLayoutStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SettingsSheet from "#/components/SettingsSheet";
import { LanguagesTranslate } from "#/components/Languages-translate";

import { SwitchTheme } from "#/components/Switch-theme";
import { UserAvatar } from "#/components/user-avatar";
import { SwitchLayout } from "#/components/Switch-Layout";

export default function Header() {
  const { collapsed, toggleCollapsed } = useLayoutStore();
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
        {/* 🌐 语言切换 */}
        <LanguagesTranslate />

        {/* 🌗 主题切换 */}
        <SwitchTheme />

        {/* 布局切换按钮 */}
        <SwitchLayout />

        {/*  设置抽屉 */}
        <SettingsSheet />

        {/* 用户头像 */}
        <UserAvatar />
      </div>
    </header>
  );
}
