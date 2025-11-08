"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@repo/shadcn/components/ui/input";
import { Button } from "@repo/shadcn/components/ui/button";
import { Card } from "@repo/shadcn/components/ui/card";
import { createRole } from "#/api/roles";

export default function RoleFormPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [permissions, setPermissions] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      name,
      description: desc,
      permissions: permissions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const res = await createRole(data);
    console.log("role-create", res);
    if (res) router.push("/roles");
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-lg p-6 space-y-4">
        <h1 className="text-xl font-semibold">新增角色</h1>
        <div className="space-y-2">
          <label className="text-sm font-medium">角色名称</label>
          <Input
            placeholder="请输入角色名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">角色描述</label>
          <Input
            placeholder="请输入角色描述"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">权限（逗号分隔）</label>
          <Input
            placeholder="如 dashboard:view, users:edit"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          />
        </div>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          提交
        </Button>
      </Card>
    </div>
  );
}
