"use client";

import { useEffect, useState } from "react";
import { Card } from "@repo/shadcn/components/ui/card";
import { Button } from "@repo/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/components/ui/table";
import Link from "next/link";
import { Department, fetchDepartments } from "#/api/departments";

export default function DepartmentsPage() {
  const [data, setData] = useState<Department[]>([]);

  async function fetchDepartment() {
    try {
      const data = (await fetchDepartments()) || [];
      setData(data);
    } catch (err) {
      console.error("请求错误获取部门数据失败：", err);
    }
  }

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">部门管理</h1>
        <Link href="/departments/new">
          <Button>新增部门</Button>
        </Link>
      </div>

      <Card className="p-4 shadow-sm border border-gray-200">
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
            {data.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>{dept.manager || "-"}</TableCell>
                <TableCell>{dept.children?.length || 0}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/departments/${dept.id}`}>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
