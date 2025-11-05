"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { setUserLocale } from "#/i18n/action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/ui/dropdown-menu";
import { Button } from "@repo/shadcn/components/ui/button";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

/* 🌐 语言切换 */

export function LanguagesTranslate() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations();

  function onChange(locale: string) {
    startTransition(async () => {
      await setUserLocale(locale);

      // 让 next-intl 重新加载正确语言
      setTimeout(() => router.refresh(), 100);
    });
  }

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
          <DropdownMenuItem onClick={() => onChange("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChange("zh")}>
            中文
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onChange("jp")}>
            日本語
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
