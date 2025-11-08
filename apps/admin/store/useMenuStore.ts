import { fetchUserMenus, MenuItem } from "#/api/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";
// import { filterMenusByRoleAndPermissions } from "#/lib/utils/permission";

interface MenusState {
  menuList: MenuItem[];
  setMenuList: (list: MenuItem[]) => void;
  fetchMenuList: () => Promise<void>;
}

/**
 * 根据用户角色与权限过滤菜单
 */
function filterMenusByRoleAndPermissions(
  menus: MenuItem[],
  userRoles: string[],
  userPermissions: string[]
): MenuItem[] {
  return menus
    .map((item) => {
      // 检查角色
      const roleMatch =
        !item.roles || item.roles.some((r) => userRoles.includes(r));

      // 检查权限
      const permissionMatch =
        !item.permissions ||
        (Array.isArray(item.permissions)
          ? item.permissions.some((p) => userPermissions.includes(p))
          : userPermissions.includes(item.permissions));

      if (!roleMatch || !permissionMatch) return null;

      const children = item.children
        ? filterMenusByRoleAndPermissions(
            item.children,
            userRoles,
            userPermissions
          )
        : undefined;

      return { ...item, children };
    })
    .filter(Boolean) as MenuItem[];
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
        // 过滤无权限无角色菜单
        const filtered = filterMenusByRoleAndPermissions(
          data,
          user.roles || [],
          user.permissions || []
        );

        set({ menuList: filtered });
      },
    }),
    { name: "menu-storage" }
  )
);
