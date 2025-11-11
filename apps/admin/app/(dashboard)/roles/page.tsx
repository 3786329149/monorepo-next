"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/shadcn/components/ui/card";
import { Button } from "@repo/shadcn/components/ui/button";

import { createRole, fetchRoles, Role } from "#/api/roles";

import { Input } from "@repo/shadcn/components/ui/input";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/components/ui/table";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState<Omit<Role, "id">>({
    name: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const list = await fetchRoles();
      setRoles(list);
      setLoading(false);
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (!newRole.name.trim()) return toast.error("角色名不能为空");
    const created = await createRole(newRole);
    setRoles((prev) => [...prev, created]);
    setNewRole({ name: "", description: "", permissions: [] });
    toast.success("角色创建成功");
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>新增角色</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            placeholder="角色名"
            value={newRole.name}
            onChange={(e) =>
              setNewRole((p) => ({ ...p, name: e.target.value }))
            }
          />
          <Input
            placeholder="描述"
            value={newRole.description}
            onChange={(e) =>
              setNewRole((p) => ({ ...p, description: e.target.value }))
            }
          />
          <Button onClick={handleAdd}>新增</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>角色列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>创建时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.description || "--"}</TableCell>
                  <TableCell>
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString()
                      : "--"}
                  </TableCell>
                </TableRow>
              ))}
              {roles.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    暂无角色
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
