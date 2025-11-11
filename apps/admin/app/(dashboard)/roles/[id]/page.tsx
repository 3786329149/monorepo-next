"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/ui/card";
import { fetchRole, Role } from "#/api/roles";

export default function RoleDetailPage() {
  const { id } = useParams();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (id) {
      fetchRole(Number(id)).then((r) => setRole(r || null));
    }
  }, [id]);

  if (!role) return <div className="p-6 text-gray-500">加载中...</div>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{role.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>描述：{role.description || "--"}</p>
          <p>权限：{role.permissions?.join(", ") || "--"}</p>
          <p>
            创建时间：
            {role.createdAt ? new Date(role.createdAt).toLocaleString() : "--"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
