import { getLucideIcon } from "#/components/Lucide-react-icon";
import { MenuItem } from "#/lib/api/user";
import { cn } from "@repo/shadcn/lib/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";

export function SidebarTooltipItem({
  child,
  level,
}: {
  child: MenuItem;
  level: number;
}) {
  const pathname = usePathname();
  const Icon = getLucideIcon(child.icon);
  const t = useTranslations();

  const hasChildren =
    Array.isArray(child.children) && child.children.length > 0;

  return (
    <div>
      <Link
        href={child.path || "#"}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
          pathname === child.path
            ? "bg-primary/10 text-primary font-medium"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        style={{ paddingLeft: level * 12 }}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        {t(`route.${child.title}`)}
      </Link>

      {hasChildren && (
        <div className="ml-3 border-l border-border">
          {child.children!.map((sub) => (
            <SidebarTooltipItem key={sub.id} child={sub} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
