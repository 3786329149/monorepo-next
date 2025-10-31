"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { menuItems } from "#/mock/menu";
import { useLayoutStore } from "#/store/useLayoutStore";

import { cn } from "@repo/shadcn/lib/utils";
// import { ScrollArea } from "@repo/shadcn/components/ui/scroll-area";

export default function Sidebar() {
  const pathname = usePathname();
  const { layout, collapsed, toggleCollapse } = useLayoutStore();

  // 在 top 布局下不显示侧边栏
  if (layout === "top") return null;

  // 根据布局决定默认展开宽度（你可以自行调整）
  const expandedWidth = layout === "mix" ? 200 : 240;
  const collapsedWidth = 72;

  // return (
  //   <aside
  //     className={cn(
  //       "fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 shadow-sm",
  //       collapsed ? "w-[64px]" : "w-[240px]"
  //     )}
  //   >
  //     <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
  //       My Admin
  //     </div>
  //     <ScrollArea className="flex-1">
  //       <nav className="p-4 space-y-1">
  //         {menuItems.map(({ href, label, icon: Icon }) => (
  //           <Link
  //             key={href}
  //             href={href}
  //             className={cn(
  //               "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
  //               pathname === href
  //                 ? "bg-primary text-primary-foreground"
  //                 : "hover:bg-accent hover:text-accent-foreground"
  //             )}
  //           >
  //             <Icon className="h-4 w-4" />
  //             {label}
  //           </Link>
  //         ))}
  //       </nav>
  //     </ScrollArea>
  //   </aside>
  // );

  return (
    <aside
      aria-label="sidebar"
      className={cn(
        "fixed left-0 top-0 h-screen bg-background border-r border-border transition-all duration-300 flex flex-col z-40",
        collapsed ? `w-[${collapsedWidth}px]` : `w-[${expandedWidth}px]`
      )}
      style={{
        width: collapsed ? `${collapsedWidth}px` : `${expandedWidth}px`,
      }}
    >
      {/* header: logo + collapse button */}
      <div className="flex items-center justify-between h-14 px-3 border-b">
        {!collapsed ? (
          <div className="text-lg font-semibold">Admin</div>
        ) : (
          <div className="text-lg font-semibold">A</div>
        )}

        <button
          aria-label="toggle-collapse"
          onClick={toggleCollapse}
          className="p-1 rounded hover:bg-muted transition"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-auto px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded hover:bg-accent transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
              )}
              style={{
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* footer 可放用户信息或版本 */}
      <div className="h-14 flex items-center justify-center border-t text-xs text-muted-foreground">
        {!collapsed ? "v1.0.0 • 管理系统" : "v1.0"}
      </div>
    </aside>
  );
}
