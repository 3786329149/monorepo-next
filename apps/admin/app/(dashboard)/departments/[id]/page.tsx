"use client";

import { useEffect, useState } from "react";
import { Card } from "@repo/shadcn/components/ui/card";
import { Button } from "@repo/shadcn/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { fetchDepartments } from "#/api/departments";

interface Department {
  id: number;
  name: string;
  manager?: string;
  children?: Department[];
}

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const [dept, setDept] = useState<Department | null>(null);
  const router = useRouter();

  async function fetchDepartmentDetail() {
    try {
      const data = await fetchDepartments();
      const found = data?.find((d) => d.id === Number(id));
      setDept(found || null);
    } catch (err) {
      console.error("请求错误获取部门数据详情失败：", err);
    }
  }

  useEffect(() => {
    fetchDepartmentDetail();
  }, [id]);

  if (!dept) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">{dept.name}</h2>
        <div>
          <p>
            <strong>负责人：</strong>
            {dept.manager || "-"}
          </p>
          <p>
            <strong>下级部门：</strong>
            {dept.children?.length || 0}
          </p>
        </div>

        <div>
          <h3 className="font-medium mt-4">下级部门</h3>
          <ul className="list-disc pl-6">
            {dept.children?.map((child) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
        </div>

        <Button variant="outline" onClick={() => router.push("/departments")}>
          返回列表
        </Button>
      </Card>
    </div>
  );
}
