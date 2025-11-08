"use client";

import { useEffect, useState } from "react";

import { Card } from "@repo/shadcn/components/ui/card";
import { Button } from "@repo/shadcn/components/ui/button";
import Link from "next/link";
import { fetchRoles } from "#/api/roles";

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRole() {
    const data = await fetchRoles();
    setRoles(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">角色管理</h1>
        <Link href="/roles/new">
          <Button>新增角色</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="p-4 hover:shadow-lg transition-all border border-border"
          >
            <div className="text-lg font-medium">{role.name}</div>
            <div className="text-sm text-muted-foreground mb-2">
              {role.description}
            </div>
            <div className="text-xs text-muted-foreground">
              权限：{role.permissions.join(", ")}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href={`/roles/${role.id}`}>
                <Button variant="outline" size="sm">
                  查看详情
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
