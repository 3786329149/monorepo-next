"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { cn } from "@repo/shadcn/lib/utils";
import { ChevronRight } from "lucide-react";
import { Badge } from "@repo/shadcn/components/ui/badge";
import { useLayoutStore } from "#/store/useLayoutStore";
import { motion } from "framer-motion";

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
  // 当点击一个菜单项时：如果是父级菜单，就切换 open 状态并写入缓存；如果是子级菜单，就更新“当前激活菜单”的 key。
  const { openKeys, setOpenKeys, activeKey, setActiveKey } = useLayoutStore();

  const hasChildren = !!item.children?.length;
  const Icon = item.icon;

  const isCurrent = item.href && pathname === item.href;
  const isOpen = openKeys.includes(item.key);

  // 是否包含激活子项
  const hasActiveChild = useMemo(
    () =>
      hasChildren &&
      item.children!.some(
        (c) => pathname === c.href || pathname.startsWith(c.href ?? "")
      ),
    [pathname, item.children, hasChildren]
  );

  // 自动展开当前激活子菜单
  useEffect(() => {
    if (hasActiveChild && !isOpen) {
      setOpenKeys([...openKeys, item.key]);
    }
  }, [hasActiveChild]);

  const handleToggle = () => {
    if (!hasChildren) return;

    if (isOpen) {
      setOpenKeys(openKeys.filter((k) => k !== item.key));
    } else {
      setOpenKeys([...openKeys, item.key]);
    }
  };

  const handleClick = () => {
    if (hasChildren) {
      handleToggle();
    } else if (item.key) {
      setActiveKey(item.key);
    }
  };

  const indent = collapsed ? undefined : 10 + level * 10;

  const content = (
    <div
      onClick={handleClick}
      className={cn(
        "group relative flex items-center rounded-md px-3 py-2 text-sm transition-all cursor-pointer select-none",
        collapsed ? "justify-center" : "gap-2",
        activeKey === item.key
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-foreground",
        hasActiveChild && !isCurrent ? "text-primary font-medium" : undefined // 父级只文字高亮
      )}
      style={{
        paddingLeft: indent,
        marginTop: level === 0 ? 2 : 0,
      }}
    >
      {Icon && <Icon size={18} />}

      {/* 动画包裹文本、Badge 和 Chevron */}
      <motion.div
        initial={false}
        animate={{
          opacity: collapsed ? 0 : 1,
          width: collapsed ? 0 : "auto",
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 overflow-hidden"
      >
        <span className="truncate">{item.label}</span>

        {item.badge && (
          <Badge
            variant={item.badgeColor || "secondary"}
            className="ml-auto text-[10px] font-medium h-4 px-1.5 shrink-0"
          >
            {item.badge}
          </Badge>
        )}

        {hasChildren && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronRight size={14} />
          </motion.span>
        )}
      </motion.div>
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
      {itemElement}
      {/* 子菜单展开动画 */}
      {hasChildren && !collapsed && (
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
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
        </motion.div>
      )}
    </div>
  );
}
