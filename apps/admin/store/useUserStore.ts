"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "#/api/user";
import { fetchUserInfo } from "#/api/user";
import { loginApi, LoginParams } from "#/api/auth";
import { useMenuStore } from "./useMenuStore";

interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
  roles: string[];
  permissions: string[];
  initialized: Boolean;
  loading: boolean;

  login: (data: LoginParams) => Promise<boolean>;
  fetchUser: () => Promise<void>;
  logout: () => void;

  // 权限判断逻辑
  hasRole: (role: string | string[]) => boolean;
  hasPermission: (perm: string | string[]) => boolean;
  hasAccess: (roles?: string[], perms?: string[]) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: null,
      userInfo: null,
      initialized: false,
      loading: false,
      roles: [],
      permissions: [],

      /** 登录逻辑 */
      async login(data) {
        try {
          set({ loading: true });
          const { token } = await loginApi(data);

          //设置 Cookie + 状态
          document.cookie = `user-token=${token}; path=/`;
          set({ token });

          // 登录后拉取用户信息（含菜单）
          await get().fetchUser();
          return true;
        } catch (err) {
          console.error("❌ 登录失败", err);
          return false;
        } finally {
          set({ loading: false });
        }
      },

      /** 拉取用户信息并同步菜单 */
      async fetchUser() {
        try {
          set({ loading: true });

          const data = await fetchUserInfo();
          set({
            userInfo: data,
            initialized: true,
            roles: data.roles,
            permissions: data.permissions,
          });

          // 登录后立即获取菜单
          const menuStore = useMenuStore.getState();
          await menuStore.fetchMenuList();
        } catch (err) {
          console.error("❌ 获取用户信息失败", err);
          set({ userInfo: null, initialized: false });
        } finally {
          set({ loading: false });
        }
      },

      /** 登出逻辑 */
      logout() {
        set({ token: null, userInfo: null });

        // 清除缓存 & Cookie
        localStorage.removeItem("user-store");
        localStorage.removeItem("menu-storage");
        document.cookie = "user-token=; path=/; max-age=0";

        // 可选跳转逻辑
        window.location.href = "/login";
      },

      /**
       * 检查是否拥有角色（支持单个或多个）
       */
      hasRole(role) {
        const user = get().userInfo;
        if (!user) return false;
        const roles = Array.isArray(role) ? role : [role];
        return roles.some((r) => user.roles.includes(r));
      },

      /**
       * 检查是否拥有权限（支持单个或多个）
       */
      hasPermission(perm) {
        const user = get().userInfo;
        if (!user) return false;
        const perms = Array.isArray(perm) ? perm : [perm];
        return perms.some((p) => user.permissions.includes(p));
      },

      /**
       * 综合判断（比如页面访问、按钮展示等）
       */
      hasAccess(roles, perms) {
        const user = get().userInfo;
        if (!user) return false;

        // 如果没指定要求，则默认有权限
        if (!roles && !perms) return true;

        const roleMatch = !roles || roles.some((r) => user.roles.includes(r));
        const permMatch =
          !perms || perms.some((p) => user.permissions.includes(p));

        return roleMatch && permMatch;
      },
    }),
    {
      name: "user-store",
    }
  )
);
