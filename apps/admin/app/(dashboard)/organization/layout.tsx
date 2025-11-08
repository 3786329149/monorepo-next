"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/shadcn/lib/utils";
import { Card } from "@repo/shadcn/components/ui/card";

const tabs = [
  { name: "部门管理", path: "/organization/departments" },
  { name: "角色管理", path: "/organization/roles" },
  { name: "人员管理", path: "/organization/users" },
];

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-6 space-y-6">
      <Card className="flex flex-row gap-4 p-2 border-border/60">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            href={tab.path}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition",
              pathname.startsWith(tab.path)
                ? "bg-primary text-white"
                : "hover:bg-muted"
            )}
          >
            {tab.name}
          </Link>
        ))}
      </Card>

      <div>{children}</div>
    </div>
  );
}
