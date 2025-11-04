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
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  LayoutGrid,
  Moon,
  Sun,
} from "lucide-react";
import SettingsSheet from "#/components/SettingsSheet";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/ui/dropdown-menu";

export default function Header() {
  const { t } = useTranslation();

  const {
    collapsed,
    toggleCollapsed,
    mode,
    setMode,
    darkMode,
    toggleDark,
    setLanguage,
  } = useLayoutStore();
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              <span>{t("language")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en-US")}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("zh-CN")}>
              中文
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("ja-JP")}>
              日本語
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 主题切换示例（可以替换为你的 ThemeProvider hook） */}
        {/* 🌗 主题切换 */}
        <div className="flex items-center gap-2 px-2">
          {darkMode ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span>{t("theme")}</span>
          <Switch checked={darkMode} onCheckedChange={toggleDark} />
        </div>

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

        {/* ✅ 设置抽屉 */}
        <SettingsSheet />

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
