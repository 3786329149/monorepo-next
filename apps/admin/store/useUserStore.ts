"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserInfo } from "#/lib/api/user";
import { fetchUserInfo } from "#/lib/api/user";
import { loginApi, LoginParams } from "#/lib/api/auth";
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
  hasPermission: (key: string) => boolean;
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

      hasPermission(key) {
        const user = get().userInfo;
        return !!user?.permissions.includes(key);
      },
    }),
    {
      name: "user-store",
    }
  )
);
