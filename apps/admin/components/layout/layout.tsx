"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { cn } from "@repo/shadcn/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mode, collapsed } = useLayoutStore();

  // 🧭 三种布局结构
  if (mode === "top") {
    return (
      <div className="flex flex-col h-screen">
        <Topbar variant="top" />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    );
  }

  if (mode === "mix") {
    return (
      <div className="flex flex-col h-screen">
        <Topbar variant="mix" />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar mix />
          <main
            className={cn(
              "flex-1 overflow-auto bg-muted/30 p-6 transition-all duration-300",
              collapsed ? "ml-[64px]" : "ml-[200px]"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    );
  }

  // 默认 side
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          collapsed ? "ml-[64px]" : "ml-[200px]"
        )}
      >
        <Topbar variant="side" />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
