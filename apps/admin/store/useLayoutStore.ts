import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutMode = "side" | "top" | "mix";

interface LayoutState {
  mode: LayoutMode;
  darkMode: boolean;
  collapsed: boolean; // 侧边栏是否收起（对 side / mix 有效）
  toggleCollapse: () => void;
  setMode: (mode: LayoutMode) => void;
  toggleDark: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      mode: "side",
      collapsed: false,
      darkMode: false,
      setMode: (mode) => set({ mode }),
      toggleCollapse: () => set((s) => ({ collapsed: !s.collapsed })),
      toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),
    }),
    {
      name: "layout-config",
    }
  )
);
