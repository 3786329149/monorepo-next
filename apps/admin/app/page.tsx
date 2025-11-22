"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/components/ui/table";
import { Button } from "@repo/shadcn/components/ui/button";
import Link from "next/link";
interface User {
  id: number;
  name: string;
  email: string;
  role_id?: number;
}

export default function Page({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const json = await res.json();
    if (json.code === 0) setUsers(json.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">用户管理</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>部门名称</TableHead>
            <TableHead>负责人</TableHead>
            <TableHead>下级部门数</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>

              <TableCell className="text-right">
                <Link href={`/users//${user.id}`}>
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "姓名" },
          { key: "email", label: "邮箱" },
        ]}
        data={users}
      /> */}
    </div>
  );
}
