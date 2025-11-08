"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Card } from "@repo/shadcn/components/ui/card";
import { fetchRoles } from "#/api/roles";

export default function RoleDetailPage() {
  const params = useParams();
  const [role, setRole] = useState<any>(null);

  async function fetchRolesDetail() {
    const data = await fetchRoles();

    const found = data.find((r) => r.id === Number(params.id));
    setRole(found);
  }

  useEffect(() => {
    fetchRolesDetail();
  }, [params.id]);

  if (!role) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-2">{role.name}</h1>
        <p className="text-muted-foreground mb-4">{role.description}</p>
        <div>
          <span className="font-medium">权限列表：</span>
          <ul className="list-disc list-inside text-sm mt-2">
            {role.permissions.map((p: string) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
