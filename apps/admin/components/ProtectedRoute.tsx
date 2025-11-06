"use client";

import { useUserStore } from "#/store/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  permission?: string;
  children: React.ReactNode;
}

export default function ProtectedRoute({ permission, children }: Props) {
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

    if (permission && !hasPermission(permission)) {
      router.replace("/403");
    }
  }, [token, userInfo]);

  return <>{children}</>;
}
