"use client";

import { useLayoutStore } from "#/store/useLayoutStore";

import LayoutSide from "./layout-side/index";
import LayoutMix from "./layout-mix/index";
import LayoutTop from "./layout-top/index";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mode } = useLayoutStore();
  // 🧭 三种布局结构
  switch (mode) {
    case "top":
      return <LayoutTop>{children}</LayoutTop>;
    case "mix":
      return <LayoutMix>{children}</LayoutMix>;
    default:
      return <LayoutSide>{children}</LayoutSide>;
  }
}
