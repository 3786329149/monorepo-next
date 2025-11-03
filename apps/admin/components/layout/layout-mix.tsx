"use client";

import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";

export default function LayoutMix({ children }: { children: React.ReactNode }) {
  const { collapsed } = useLayoutStore();

  return (
    <div className="flex flex-col h-screen">
      <TopBar variant="mix" />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
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
