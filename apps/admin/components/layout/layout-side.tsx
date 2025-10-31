"use client";

import { cn } from "@repo/shadcn/lib/utils";

import { useLayoutStore } from "#/store/useLayoutStore";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

export default function LayoutSide({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useLayoutStore();
  const expandedWidth = 240;
  const collapsedWidth = 72;

  const leftMargin = collapsed ? collapsedWidth : expandedWidth;

  return (
    <div className="flex h-screen bg-muted/10">
      <Sidebar />
      <div
        className={cn("flex-1 flex flex-col transition-all duration-300")}
        style={{ marginLeft: `${leftMargin}px` }}
      >
        <Topbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
