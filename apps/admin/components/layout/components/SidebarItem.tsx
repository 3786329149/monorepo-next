"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { cn } from "@repo/shadcn/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@repo/shadcn/components/ui/tooltip";
import { Badge } from "@repo/shadcn/components/ui/badge";

export interface MenuItem {
  key: string;
  label: string;
  icon?: any;
  href?: string;
  badge?: string | number;
  badgeColor?: "default" | "destructive" | "secondary" | "outline";
  children?: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  collapsed: boolean;
  pathname: string;
  level?: number;
}

export function SidebarItem({
  item,
  collapsed,
  pathname,
  level = 0,
}: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;
  const Icon = item.icon;

  // 当前菜单自己是否匹配 样式只对 isCurrent 生效（不让父菜单被高亮）
  const isCurrent = item.href && pathname === item.href;

  // 当前子菜单是否处于激活状态
  const hasActiveChild = useMemo(
    () => hasChildren && item.children!.some((c) => pathname === c.href),
    [pathname, item.children, hasChildren]
  );

  // 自动展开当前激活子菜单的父级
  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  const toggleOpen = () => {
    if (hasChildren) setOpen((v) => !v);
  };

  // 缩进：多层时加大 paddingLeft
  const indent = collapsed ? undefined : 12 + level * 12;

  const content = (
    <div
      onClick={!hasChildren ? undefined : toggleOpen}
      className={cn(
        "group relative flex items-center rounded-md px-3 py-2 text-sm transition-all cursor-pointer select-none",
        collapsed ? "justify-center" : "gap-2",
        isCurrent
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-foreground",
        hasActiveChild && !isCurrent ? "text-primary font-medium" : undefined // 父级仅用文字高亮，不填满背景
      )}
      style={{
        paddingLeft: indent,
        marginTop: level === 0 ? 2 : 0, // 子菜单之间加间距
      }}
    >
      {Icon && <Icon size={18} />}
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>

          {/* Badge 徽标 */}
          {item.badge && (
            <Badge
              variant={item.badgeColor || "secondary"}
              className="ml-auto text-[10px] font-medium h-4 px-1.5"
            >
              {item.badge}
            </Badge>
          )}
          {/* 折叠箭头 */}
          {hasChildren && (
            <span
              className={cn(
                "ml-1 transition-transform duration-200",
                open && "rotate-90"
              )}
            >
              <ChevronRight size={14} />
            </span>
          )}
        </>
      )}
    </div>
  );

  const itemElement = item.href ? (
    <Link href={item.href} className="block w-full">
      {content}
    </Link>
  ) : (
    content
  );

  return (
    <div>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{itemElement}</TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ) : (
        itemElement
      )}

      {/* 子菜单递归渲染 */}
      {hasChildren && open && !collapsed && (
        <div className="ml-3 border-l border-border/60 pl-2 mt-1 space-y-0.5">
          {item.children?.map((child) => (
            <SidebarItem
              key={child.key}
              item={child}
              collapsed={collapsed}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
