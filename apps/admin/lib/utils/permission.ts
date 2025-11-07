import { MenuItem } from "../api/user";

export function filterMenusByPermission(
  menus: MenuItem[],
  permissions: string[]
): MenuItem[] {
  return menus
    .map((item) => {
      // 如果 item.permissions 是数组，检查是否有交集
      const hasPermission =
        !item.permissions ||
        (Array.isArray(item.permissions)
          ? item.permissions.some((p) => permissions.includes(p))
          : permissions.includes(item.permissions));

      if (!hasPermission) return null;

      // 递归处理子菜单
      const children = item.children
        ? filterMenusByPermission(item.children, permissions)
        : undefined;

      return { ...item, children };
    })
    .filter(Boolean) as MenuItem[];
}

/**
 *
 * 1 如果菜单项有 roles 字段，则用户至少有一个角色匹配才能显示。
 * 2 如果菜单项有 permissions 字段，则用户至少有一个权限匹配才能显示。
 * 3 都没有限制则默认显示。支持 递归子菜单。
 * @param menus
 * @param userRoles
 * @param userPermissions
 * @returns
 *
 */
export function filterMenusByRoleAndPermissions(
  menus: MenuItem[],
  userRoles: string[],
  userPermissions: string[]
): MenuItem[] {
  // console.log("menus", menus);
  // console.log("userRoles", userRoles);
  // console.log("userPermissions", userPermissions);
  return menus
    .map((item) => {
      // 检查角色
      const roleMatch =
        !item.roles || item.roles.some((role) => userRoles.includes(role));

      // 检查权限
      const permissionMatch =
        !item.permissions ||
        (Array.isArray(item.permissions)
          ? item.permissions.some((p) => userPermissions.includes(p))
          : userPermissions.includes(item.permissions));

      if (!roleMatch || !permissionMatch) return null;

      // 递归处理子菜单
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

/**
 *  两种方式显示菜单 只要满足其中一个就能显示菜单
 * 
 *  1. 利用 menus.roles = ["admin","develop"] 因为用户本身登录有就 role 角色
 *
 *  2. 利用 menus.permissions = ["uses:view"] 然后在需要的显示的用户中心添加这个权限
 * 
 *   {
      id: "u002",
      name: "AnnJimmy",
      token: "mock-token-develop",
      role: ["develop"],
      permissions: [
        "xxx,
        "users:view",
        "xxx",
      ],
    },
 * */
