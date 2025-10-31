import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutType = "side" | "top" | "mix";

interface LayoutState {
  layout: LayoutType;
  darkMode: boolean;
  fixedHeader: boolean;
  fixedSidebar: boolean;
  collapsed: boolean; // 侧边栏是否收起（对 side / mix 有效）
  toggleCollapse: () => void;
  setCollapsed: (v: boolean) => void;
  setLayout: (layout: LayoutType) => void;
  toggleDark: () => void;
  toggleFixedHeader: () => void;
  toggleFixedSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layout: "side",
      collapsed: false,
      darkMode: false,
      fixedHeader: true,
      fixedSidebar: true,
      setLayout: (layout) => set({ layout }),
      toggleCollapse: () => set((s) => ({ collapsed: !s.collapsed })),
      setCollapsed: (v) => set({ collapsed: v }),
      toggleDark: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleFixedHeader: () => set((s) => ({ fixedHeader: !s.fixedHeader })),
      toggleFixedSidebar: () => set((s) => ({ fixedSidebar: !s.fixedSidebar })),
    }),
    {
      name: "layout-config",
    }
  )
);
