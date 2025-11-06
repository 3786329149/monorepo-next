import { fetchUserMenus, MenuItem } from "#/lib/api/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

interface MenusState {
  menuList: MenuItem[];
  setMenuList: (list: MenuItem[]) => void;
  fetchMenuList: () => Promise<void>;
}

export const useMenuStore = create<MenusState>()(
  persist(
    (set) => ({
      menuList: [],

      setMenuList: (list) => set({ menuList: list }),

      async fetchMenuList() {
        const user = useUserStore.getState().userInfo;
        if (!user) return;

        const data = await fetchUserMenus();
        // 过滤无权限菜单
        const filtered = data.filter(
          (item) =>
            !item.permissions || user.permissions.includes(item.permissions)
        );
        set({ menuList: filtered });
      },
    }),
    { name: "menu-storage" }
  )
);
