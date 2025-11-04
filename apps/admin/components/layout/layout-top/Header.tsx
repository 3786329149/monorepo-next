"use client";

import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { TopBarItem } from "./TopBarItem";
import { HEADER_HEIGHT } from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
import { menus } from "#/mock/menu";

import SettingsSheet from "#/components/SettingsSheet";
import { LanguagesTranslate } from "#/components/Languages-translate";
import { SwitchTheme } from "#/components/Switch-theme";
import { UserAvatar } from "#/components/user-avatar";
import { SwitchLayout } from "#/components/Switch-Layout";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeKey, setActiveKey } = useLayoutStore();

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
    </motion.header>
  );
}
