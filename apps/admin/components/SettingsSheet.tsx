"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@repo/shadcn/components/ui/sheet";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useLayoutStore } from "#/store/useLayoutStore";
import { Languages, Layout, Moon, Settings, Sun } from "lucide-react";
import { cn } from "@repo/shadcn/lib/utils";

import { Button } from "@repo/shadcn/components/ui/button";
import { Switch } from "@repo/shadcn/components/ui/switch";

export default function SettingsSheet() {
  const { mode, setMode, darkMode, toggleDark, language, setLanguage } =
    useLayoutStore();

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const layoutOptions = [
    { label: t("layout_side"), value: "side" },
    { label: t("layout_mix"), value: "mix" },
    { label: t("layout_top"), value: "top" },
  ];

  const langOptions = [
    { label: "中文", value: "zh-CN" },
    { label: "English", value: "en-US" },
    { label: "日本語", value: "ja-JP" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[360px] p-6 space-y-6"
      >
        <SheetHeader>
          <SheetTitle>{t("settings")}</SheetTitle>
          <SheetDescription>在这里调整布局与主题偏好。</SheetDescription>
        </SheetHeader>

        {/* 主题模式 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {darkMode ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span>深色模式</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDark} />
        </div>

        {/* 布局切换 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layout className="w-4 h-4" />
            <span>{t("layout")}</span>
          </div>
          <div className="flex flex-col gap-2">
            {layoutOptions.map((item) => (
              <Button
                key={item.value}
                variant={mode === item.value ? "default" : "outline"}
                className={cn(
                  "w-full justify-start",
                  mode === item.value && "font-semibold"
                )}
                onClick={() => setMode(item.value as any)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 语言切换 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Languages className="w-4 h-4" />
            <span>{t("language")}</span>
          </div>
          <div className="flex flex-col gap-2">
            {langOptions.map((item) => (
              <Button
                key={item.value}
                variant={language === item.value ? "default" : "outline"}
                className={cn(
                  "w-full justify-start",
                  language === item.value && "font-semibold"
                )}
                onClick={() => setLanguage(item.value as any)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
