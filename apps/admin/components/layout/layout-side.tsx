"use client";

import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

export default function LayoutSide({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useLayoutStore();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          collapsed ? "ml-[64px]" : "ml-[220px]"
        )}
      >
        <TopBar variant="side" />
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
