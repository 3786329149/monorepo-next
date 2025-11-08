"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/shadcn/components/ui/button";
import { Card } from "@repo/shadcn/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/shadcn/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn/components/ui/select";
import { Input } from "@repo/shadcn/components/ui/input";
import { useForm } from "react-hook-form";

interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  code: string;
}

interface User {
  id: number;
  name: string;
  department: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    Promise.all([
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/departments").then((r) => r.json()),
      fetch("/api/roles").then((r) => r.json()),
    ]).then(([usersRes, deptRes, roleRes]) => {
      setUsers(usersRes.data);
      setDepartments(deptRes.data);
      setRoles(roleRes.data);
    });
  }, []);

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    if (res.code === 0) {
      console.log("新增成功");
      setUsers((prev) => [...prev, res.data]);
      reset();
      setOpen(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">人员管理</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>新增人员</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>新增人员</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm">姓名</label>
                <Input {...register("name", { required: true })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm">部门</label>
                <Select onValueChange={(v) => setValue("department", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择部门" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm">角色</label>
                <Select onValueChange={(v) => setValue("role", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择角色" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={r.name}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full mt-4">
                确认新增
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 用户列表 */}
      <Card className="p-4 border border-border/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-left">
            <tr className="text-muted-foreground">
              <th className="py-2">姓名</th>
              <th className="py-2">部门</th>
              <th className="py-2">角色</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border/40">
                <td className="py-2">{u.name}</td>
                <td className="py-2">{u.department}</td>
                <td className="py-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
