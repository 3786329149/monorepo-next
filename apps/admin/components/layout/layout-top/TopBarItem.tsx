"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@repo/shadcn/lib/utils";

import { Badge } from "@repo/shadcn/components/ui/badge";
import { Button } from "@repo/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/ui/dropdown-menu";
import { MenuItem } from "#/mock/menu";
import { useTranslations } from "next-intl";

interface TopBarItemProps {
  item: MenuItem;
  pathname: string;
  activeKey: string;
  setActiveKey: (key: string) => void;
}

/** 🔍 递归检测 pathname 是否在当前菜单的子树中 */
function hasActiveChild(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname.startsWith(item.href)) return true;
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, pathname));
  }
  return false;
}

export function TopBarItem({
  item,
  pathname,
  activeKey,
  setActiveKey,
}: TopBarItemProps) {
  const router = useRouter();
  const t = useTranslations();

  const Icon = item.icon;

  // 判断当前项是否处于激活状态
  const isActive =
    pathname === item.href ||
    activeKey === item.key ||
    hasActiveChild(item, pathname);

  const handleClick = (href?: string, key?: string) => {
    if (href) router.push(href);
    if (key) setActiveKey(key);
  };

  const renderChildren = (children: MenuItem[]) => {
    return children.map((child) => {
      const hasSub = !!child.children?.length;
      const isChildActive = hasActiveChild(child, pathname);

      if (hasSub) {
        return (
          <DropdownMenuSub key={child.key}>
            <DropdownMenuSubTrigger
              className={cn(
                "flex items-center justify-between gap-2",
                isChildActive && "text-primary font-medium"
              )}
            >
              {t(`route.${child.key}`)}
              {child.badge && (
                <Badge
                  variant={child.badgeColor || "secondary"}
                  className="text-[10px] px-1.5 h-4"
                >
                  {child.badge}
                </Badge>
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="ml-1 mt-1">
              {renderChildren(child.children!)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={child.key}
          onClick={() => handleClick(child.href, child.key)}
          className={cn(
            "flex items-center justify-between gap-2",
            isChildActive && "text-primary font-medium bg-muted"
          )}
        >
          {t(`route.${child.key}`)}

          {child.badge && (
            <Badge
              variant={child.badgeColor || "secondary"}
              className="text-[10px] px-1.5 h-4"
            >
              {child.badge}
            </Badge>
          )}
        </DropdownMenuItem>
      );
    });
  };

  if (item.children?.length) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-1",
                isActive &&
                  "text-primary font-medium border-b-2 border-primary rounded-none"
              )}
            >
              {Icon && <Icon size={18} />}

              {t(`route.${item.key}`)}

              {item.badge && (
                <Badge
                  variant={item.badgeColor || "secondary"}
                  className="text-[10px] px-1.5 h-4"
                >
                  {item.badge}
                </Badge>
              )}
              <ChevronDown size={14} />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mt-1 ml-1">
          {renderChildren(item.children)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        variant="ghost"
        onClick={() => handleClick(item.href, item.key)}
        className={cn(
          "flex items-center gap-1",
          isActive &&
            "text-primary font-medium border-b-2 border-primary rounded-none"
        )}
      >
        {Icon && <Icon size={18} />}

        {t(`route.${item.key}`)}
        {item.badge && (
          <Badge
            variant={item.badgeColor || "secondary"}
            className="text-[10px] px-1.5 h-4"
          >
            {item.badge}
          </Badge>
        )}
      </Button>
    </motion.div>
  );
}
