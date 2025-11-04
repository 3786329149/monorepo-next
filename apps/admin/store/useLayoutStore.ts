import { create } from "zustand";
import { persist } from "zustand/middleware";

import i18n from "#/i18n";

export type LayoutMode = "side" | "top" | "mix";
export type Language = "zh-CN" | "en-US" | "ja-JP";

interface LayoutState {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;

  darkMode: boolean;
  toggleDark: () => void;

  openKeys: string[]; // 当前展开的菜单key列表
  setOpenKeys: (keys: string[]) => void;

  activeKey: string; // 当前激活路径
  setActiveKey: (key: string) => void;

  collapsed: boolean; // 侧边栏是否收起（对 side / mix 有效）
  toggleCollapsed: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      mode: "side",
      setMode: (mode) => set({ mode }),

      darkMode: false,
      toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),

      collapsed: false,
      toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),

      activeKey: "",
      setActiveKey: (path) => set({ activeKey: path }),

      openKeys: [],
      setOpenKeys: (keys) => set({ openKeys: keys }),

      language: (i18n.language as Language) || "zh-CN",
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem("i18nextLng", language);
        set({ language });
      },
    }),

    {
      name: "layout-config",
    }
  )
);
