"use client";
import Link from "next/link";
import { cn } from "@repo/shadcn/lib/utils";
import { usePathname } from "next/navigation";
import { HoverPopover } from "#/components/HoverPopover";
import { getLucideIcon } from "#/components/Lucide-react-icon";
import { useTranslations } from "next-intl";

interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

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
        {Icon && <Icon size={16} />}
        {t(`route.${item.title}`)}
      </div>
      {hasChildren && <span className="text-muted-foreground">›</span>}
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
