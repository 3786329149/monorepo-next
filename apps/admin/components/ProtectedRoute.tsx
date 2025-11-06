"use client";

import { useUserStore } from "#/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  permissions?: string[]; // 支持多权限
  children: React.ReactNode;
}

export default function ProtectedRoute({ permissions, children }: Props) {
  const router = useRouter();

  const { token, userInfo, hasPermission, fetchUser } = useUserStore();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!userInfo) {
      fetchUser();
      return;
    }

    if (permissions && !permissions.some((perm) => hasPermission(perm))) {
      router.replace("/403");
    }
  }, [token, userInfo, permissions]);

  if (!token || !userInfo) return <div>加载中...</div>;

  return <>{children}</>;
}
