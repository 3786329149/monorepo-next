import { useLayoutStore } from "#/store/useLayoutStore";
import { Switch } from "@repo/shadcn/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

/* 🌗 主题切换 */

export function SwitchTheme() {
  const { darkMode, toggleDark } = useLayoutStore();
  const { t } = useTranslation();
  return (
    <>
      {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      <span>{t("theme")}</span>
      <Switch checked={darkMode} onCheckedChange={toggleDark} />
    </>
  );
}
