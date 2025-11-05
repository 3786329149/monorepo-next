"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { Button } from "@repo/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

/* 🌐 语言切换 */

export function LanguagesTranslate() {
  const { t } = useTranslation();
  const { setLanguage } = useLayoutStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Languages className="w-4 h-4" />
            <span suppressHydrationWarning>{t("language")}</span>
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
    </>
  );
}
