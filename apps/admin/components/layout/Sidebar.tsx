"use client";

import Link from "next/link";
import { menuItems } from "../../mock/menu";
import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { cn } from "@repo/shadcn/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-muted/30 border-r h-screen fixed top-0 left-0 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 border-b">
        {!collapsed && <span className="font-bold text-lg">Admin</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-muted rounded-lg transition"
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition text-sm",
              collapsed && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
