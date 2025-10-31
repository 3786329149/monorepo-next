"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import LayoutSide from "#/components/layout/layout-side";
import LayoutTop from "#/components/layout/layout-top";
import LayoutMix from "#/components/layout/layout-mix";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = useLayoutStore((s) => s.layout);

  switch (layout) {
    case "top":
      return <LayoutTop>{children}</LayoutTop>;
    case "mix":
      return <LayoutMix>{children}</LayoutMix>;
    default:
      return <LayoutSide>{children}</LayoutSide>;
  }
}
