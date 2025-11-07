"use client";

import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { TopBarItem } from "./TopBarItem";
import { HEADER_HEIGHT } from "#/constants";
import { useLayoutStore } from "#/store/useLayoutStore";
// import { menus } from "#/mock/menu";

import SettingsSheet from "#/components/SettingsSheet";
import { LanguagesTranslate } from "#/components/Languages-translate";
import { SwitchTheme } from "#/components/Switch-theme";
import { UserAvatar } from "#/components/user-avatar";
import { SwitchLayout } from "#/components/Switch-Layout";
import { useMenuStore } from "#/store/useMenuStore";
import { useUserStore } from "#/store/useUserStore";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeKey, setActiveKey } = useLayoutStore();
  const { menuList, fetchMenuList } = useMenuStore();
  const { userInfo } = useUserStore();

  // 初始化记载菜单
  useEffect(() => {
    if (userInfo && menuList.length === 0) {
      fetchMenuList();
    }
  }, [userInfo]);

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
        {menuList.map((item) => (
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
