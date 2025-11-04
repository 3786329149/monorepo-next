"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MenuItem } from "./SidebarItem";
import { useLayoutStore } from "#/store/useLayoutStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/shadcn/components/ui/dropdown-menu";
import { cn } from "@repo/shadcn/lib/utils";
import { ChevronDown } from "lucide-react";
import { Badge } from "@repo/shadcn/components/ui/badge";
import { Button } from "@repo/shadcn/components/ui/button";

interface TopBarItemProps {
  item: MenuItem;
}

export default function TopBarItem({ item }: TopBarItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { activeKey, setActiveKey } = useLayoutStore();

  const handleClick = (menu: MenuItem) => {
    if (menu.href) {
      router.push(menu.href);
      setActiveKey(menu.key);
    }
  };

  // ✅ 递归检测当前菜单或子菜单是否激活
  const checkIsActive = (menu: MenuItem): boolean => {
    if (menu.href && pathname.startsWith(menu.href)) return true;
    if (menu.children?.length)
      return menu.children.some((child) => checkIsActive(child));
    return false;
  };

  const isActive = checkIsActive(item);

  const renderChildren = (children: MenuItem[]) => {
    return children.map((child) => {
      const hasSub = !!child.children?.length;
      const isChildActive = checkIsActive(child);

      if (hasSub) {
        return (
          <DropdownMenuSub key={child.key}>
            <DropdownMenuSubTrigger
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-1.5 text-sm cursor-pointer",
                isChildActive && "text-primary font-medium bg-muted"
              )}
            >
              <span>{child.label}</span>
              {child.badge && (
                <Badge
                  variant={child.badgeColor || "secondary"}
                  className="text-[10px] px-1.5 h-4"
                >
                  {child.badge}
                </Badge>
              )}
            </DropdownMenuSubTrigger>
            {/* ✅ 增加间距与阴影 */}
            <DropdownMenuSubContent className="ml-2 mt-[-4px] border shadow-md rounded-md">
              {renderChildren(child.children!)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={child.key}
          onClick={() => handleClick(child)}
          className={cn(
            "flex items-center justify-between gap-2 px-3 py-1.5 text-sm cursor-pointer",
            isChildActive && "text-primary font-medium bg-muted"
          )}
        >
          <span>{child.label}</span>
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
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-1 px-2 py-1",
              isActive &&
                "text-primary font-semibold border-b-2 border-primary rounded-none"
            )}
          >
            {item.label}
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="border shadow-md">
          {renderChildren(item.children)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => handleClick(item)}
      variant="ghost"
      className={cn(
        "flex items-center gap-2 px-2 py-1",
        isActive && "text-primary font-semibold border-b-2 border-primary"
      )}
    >
      {item.label}
      {item.badge && (
        <Badge
          variant={item.badgeColor || "secondary"}
          className="text-[10px] px-1.5 h-4"
        >
          {item.badge}
        </Badge>
      )}
    </Button>
  );
}
