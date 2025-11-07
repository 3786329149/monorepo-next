"use client";

import React from "react";
import { useAuth } from "#/hooks/useAuth";

interface AuthorizedProps {
  roles?: string[];
  permissions?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 权限控制组件
 *
 * 用法：
 * <Authorized roles={["admin"]} permissions={["user:view"]}>
 *    <Button>查看用户</Button>
 * </Authorized>
 */
export const Authorized: React.FC<AuthorizedProps> = ({
  roles,
  permissions,
  fallback = null,
  children,
}) => {
  const { hasAccess } = useAuth();

  const isAllowed = hasAccess({ roles, permissions });

  if (!isAllowed) {
    return <>{fallback}</>; // 可替换为自定义提示或空节点
  }

  return <>{children}</>;
};
