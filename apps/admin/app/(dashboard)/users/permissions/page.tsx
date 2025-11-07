"use client";

import { Authorized } from "#/components/Authorized";
import { useAuth } from "#/hooks/useAuth";
import { Button } from "@repo/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/shadcn/components/ui/card";
import { Badge } from "@repo/shadcn/components/ui/badge";
import { Separator } from "@repo/shadcn/components/ui/separator";
import { useUserStore } from "#/store/useUserStore";

export default function PermissionsPage() {
  const { hasRole, hasPermission, hasAccess } = useAuth();
  const { roles, permissions } = useUserStore();

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">权限与角色演示面板</h1>
        <p className="text-muted-foreground">
          当前页面演示如何使用 <code>useAuth</code> 与{" "}
          <code>&lt;Authorized&gt;</code> 实现动态权限控制。
        </p>
      </div>

      {/* 用户信息 */}
      <Card className="border-primary/30 shadow-sm">
        <CardHeader>
          <CardTitle>当前用户信息</CardTitle>
          <CardDescription>
            <span>展示当前登录用户的角色和权限</span>
            <span className="pl-3">(组件Authorized或者hooks)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-16 text-muted-foreground">角色:</span>
              <div className="flex flex-wrap gap-2">
                {roles?.map((r) => (
                  <Badge key={r} variant="outline">
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-muted-foreground">权限:</span>
              <div className="flex flex-wrap gap-2">
                {permissions?.map((p) => (
                  <Badge key={p} variant="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 权限示例 */}
      <Card>
        <CardHeader>
          <CardTitle>基于权限的控制</CardTitle>
          <CardDescription>
            使用 <code>permissions</code> 属性，仅拥有特定权限的用户可见
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Authorized permissions={["users:delete"]}>
            <Button variant="destructive">删除用户(组件)</Button>
          </Authorized>

          {hasPermission("users:edit") && (
            <Button variant="secondary">编辑用户(hooks)</Button>
          )}
        </CardContent>
      </Card>

      {/* 角色示例 */}
      <Card>
        <CardHeader>
          <CardTitle>基于角色的控制</CardTitle>
          <CardDescription>
            使用 <code>roles</code> 属性，判断用户的角色身份
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Authorized roles={["admin"]}>
            <Button>新增用户(组件)</Button>
          </Authorized>

          <Authorized
            roles={["admin", "manager"]}
            fallback={<Button variant="outline">无权访问</Button>}
          >
            <Button variant="default">显示管理面板(组件)</Button>
          </Authorized>

          {hasRole("admin") && (
            <Button variant="secondary">管理员专属操作(hooks)</Button>
          )}
        </CardContent>
      </Card>

      {/* 混合权限判断 */}
      <Card>
        <CardHeader>
          <CardTitle>角色 + 权限混合控制</CardTitle>
          <CardDescription>
            同时满足任一角色与权限条件时展示组件
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Authorized
            roles={["admin", "develop"]}
            permissions={["settings:access", "settings:view"]}
            fallback={
              <div className="text-muted-foreground">
                请联系管理员申请访问权限
              </div>
            }
          >
            <Button variant="default">系统设置(组件)</Button>
          </Authorized>
        </CardContent>
      </Card>

      {/* 高级组合示例 */}
      <Card>
        <CardHeader>
          <CardTitle>复杂条件组合</CardTitle>
          <CardDescription>
            灵活使用 <code>hasAccess</code> 进行自定义逻辑
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasAccess({
            roles: ["admin", "manager"],
            permissions: ["settings:view"],
          }) && <Button>高级设置(hooks)</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
