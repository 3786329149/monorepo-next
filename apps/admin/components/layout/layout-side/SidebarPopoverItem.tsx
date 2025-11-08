"use client";
import Link from "next/link";
import { cn } from "@repo/shadcn/lib/utils";
import { usePathname } from "next/navigation";
import { HoverPopover } from "#/components/HoverPopover";
import { getLucideIcon } from "#/components/Lucide-react-icon";
import { useTranslations } from "next-intl";
import { MenuItem } from "#/api/user";
import { Badge } from "@repo/shadcn/components/ui/badge";
import { ChevronRight } from "lucide-react";

export function SidebarPopoverItem({
  item,
  level = 0,
}: {
  item: MenuItem;
  level?: number;
}) {
  const pathname = usePathname();
  const t = useTranslations();
  const Icon = getLucideIcon(item.icon);
  const hasChildren = item.children && item.children.length > 0;

  const trigger = (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors",
        pathname === item.path
          ? "bg-primary/10 text-primary font-medium"
          : "hover:bg-accent"
      )}
      style={{ paddingLeft: `${level * 12}px` }}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="truncate">{t(`route.${item.title}`)}</span>
      </div>

      <div className="flex items-center gap-2 ml-2 shrink-0">
        {/* badge */}
        {item.badge && (
          <Badge
            variant={item.badgeColor || "secondary"}
            className="text-[10px] h-5 px-2"
          >
            {item.badge}
          </Badge>
        )}
        {/* 子菜单箭头 */}
        {/* {hasChildren && <span className="text-muted-foreground">›</span>} */}
        {hasChildren && (
          <ChevronRight size={14} className="text-muted-foreground" />
        )}
      </div>
    </div>
  );

  if (!hasChildren) {
    return (
      <Link href={item.path || "#"} className="block">
        {trigger}
      </Link>
    );
  }

  const content = (
    <div className="min-w-[180px] py-1">
      {item.children!.map((sub) => (
        <SidebarPopoverItem key={sub.id} item={sub} level={level + 1} />
      ))}
    </div>
  );

  return <HoverPopover trigger={trigger} content={content} />;
}
