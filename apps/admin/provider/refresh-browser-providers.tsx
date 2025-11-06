"use client";

import { useUserStore } from "#/store/useUserStore";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// 浏览器手动刷新会重新跳转到登录
export default function RefreshBrowserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 方式一 页面刷新 会出现 加载... 效果
  // const router = useRouter();
  // const pathname = usePathname();
  // const { token, initialized, fetchUser } = useUserStore();

  // useEffect(() => {
  //   if (!initialized) {
  //     fetchUser();
  //     return;
  //   }

  //   // 没登录时跳到登录页
  //   if (!token && pathname !== "/login") {
  //     router.replace("/login");
  //   }

  //   // 登录后访问 login 自动跳转首页
  //   if (token && pathname === "/login") {
  //     router.replace("/dashboard");
  //   }
  // }, [token, initialized, pathname, router, fetchUser]);

  // // ⚠️ 避免在状态未恢复时闪屏
  // if (!initialized) return null;

  // 方式二 无任何效果
  const router = useRouter();
  const pathname = usePathname();

  const { token, userInfo, fetchUser } = useUserStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) {
      router.replace("/login");
      return;
    }
    if (!userInfo) {
      fetchUser();
    }
  }, [hydrated, token, userInfo, pathname]);

  if (!hydrated) return null; // 防止 SSR 抢先渲染

  return <>{children}</>;
}
