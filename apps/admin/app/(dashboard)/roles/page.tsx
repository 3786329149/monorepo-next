"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Role } from "#/types/role";

import { Card } from "@repo/shadcn/components/ui/card";
import { Button } from "@repo/shadcn/components/ui/button";

import { createRole, fetchRoles } from "#/api/roles";
import { PlusCircle } from "lucide-react";
import { Input } from "@repo/shadcn/components/ui/input";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleAdd = async () => {
    if (!newRole.name.trim()) return;
    const created = await createRole(newRole);
    setRoles((prev) => [...prev, created]);
    setNewRole({ name: "", description: "" });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">角色管理</h2>

      <Card className="p-4 space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="角色名称"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <Input
            placeholder="角色描述"
            value={newRole.description}
            onChange={(e) =>
              setNewRole({ ...newRole, description: e.target.value })
            }
          />
          <Button onClick={handleAdd}>
            <PlusCircle className="w-4 h-4 mr-1" /> 新增角色
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">角色名称</th>
              <th className="p-2 border">描述</th>
              <th className="p-2 border">权限</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.name}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.permissions?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
