"use client";

import { Button } from "@repo/shadcn/components/ui/button";
import { useLayoutStore } from "#/store/useLayoutStore";
import { cn } from "@repo/shadcn/lib/utils";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface TopbarProps {
  variant: "side" | "top" | "mix";
}

const menuItems = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard" },
  { key: "users", label: "Users", href: "/users" },
  { key: "settings", label: "Settings", href: "/settings" },
];

export default function Topbar({ variant }: TopbarProps) {
  const { collapsed, toggleCollapse, mode, setMode } = useLayoutStore();

  return (
    <header
      className={cn(
        "h-[56px] border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-40",
        variant === "top" && "shadow-sm"
      )}
    >
      <div className="flex items-center gap-4">
        {variant === "side" && (
          <Button variant="ghost" size="icon" onClick={toggleCollapse}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}

        {variant !== "side" && (
          <>
            <span>🌀</span> <span>My Admin</span>
            <nav className="flex items-center gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* 布局切换按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setMode(mode === "side" ? "top" : mode === "top" ? "mix" : "side")
          }
        >
          <LayoutGrid size={16} className="mr-2" />
          {mode === "side" ? "Side" : mode === "top" ? "Top" : "Mix"}
        </Button>
      </div>
    </header>
  );
}
