"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { LayoutTop, LayoutMix, LayoutSide } from "#/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
