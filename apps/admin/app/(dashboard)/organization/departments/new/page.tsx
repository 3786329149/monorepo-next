"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@repo/shadcn/components/ui/card";
import { Input } from "@repo/shadcn/components/ui/input";
import { Button } from "@repo/shadcn/components/ui/button";
import { Label } from "@repo/shadcn/components/ui/label";

export default function NewDepartmentPage() {
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, manager }),
    });
    router.push("/departments");
  }

  return (
    <div className="p-6">
      <Card className="p-6 w-[400px] mx-auto">
        <h2 className="text-xl font-semibold mb-4">新增部门</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">部门名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="manager">负责人</Label>
            <Input
              id="manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            保存
          </Button>
        </form>
      </Card>
    </div>
  );
}
