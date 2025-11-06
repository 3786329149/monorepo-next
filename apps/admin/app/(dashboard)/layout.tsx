"use client";

import { useEffect } from "react";
import { useLayoutStore } from "#/store/useLayoutStore";
import { useUserStore } from "#/store/useUserStore";

import { LayoutTop, LayoutMix, LayoutSide } from "#/components/layout";

import { useRouter } from "next/navigation";
import { useMenuStore } from "#/store/useMenuStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useLayoutStore();

  // 这里的 menus 是请求后端的数据
  const { userInfo, token, fetchUser, loading, logout } = useUserStore();
  const { menuList, fetchMenuList } = useMenuStore();

  const router = useRouter();

  console.log("user", userInfo);

  useEffect(() => {
    // 没有 token 直接跳到登录页
    if (!token) {
      router.replace("/login");
      return;
    }

    // 没有用户信息时自动拉取
    if (!userInfo) {
      fetchUser().catch(() => {
        logout();
      });
    }

    // 没菜单时拉取菜单
    if (!menuList.length) {
      fetchMenuList();
    }
  }, [token]);

  if (!userInfo || !menuList.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        用户加载中...
      </div>
    );
  }

  const LayoutComponent =
    mode == "top" ? LayoutTop : mode === "mix" ? LayoutMix : LayoutSide;

  if (loading) return <div className="p-6">加载中...</div>;

  return <LayoutComponent>{children}</LayoutComponent>;
}
