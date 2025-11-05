"use client";

import { cn } from "@repo/shadcn/lib/utils";
import { HEADER_HEIGHT } from "#/constants";

import { Button } from "@repo/shadcn/components/ui/button";
import { useLayoutStore } from "#/store/useLayoutStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {/* <span>🏠</span> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="shrink-0"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {/* 🌐 语言切换 */}
        <LanguagesTranslate />

        {/* 🌗 主题切换 */}
        <SwitchTheme />

        {/* 布局切换按钮 */}
        <SwitchLayout />

        {/* 设置抽屉 */}
        <SettingsSheet />

        {/* 用户头像 */}
        <UserAvatar />
      </div>
    </header>
  );
}
