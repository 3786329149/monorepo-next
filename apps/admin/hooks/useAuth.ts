import { useUserStore } from "#/store/useUserStore";

/**
 * 权限与角色 Hook
 * 提供了 hasRole / hasPermission / hasAccess 三种常用判断
 */
export function useAuth() {
  const user = useUserStore((state) => state.userInfo);

  /**
   * 检查是否具备角色
   */
  function checkRole(role: string | string[]) {
    if (!user) return false;
    const roles = user.roles || [];
    return Array.isArray(role)
      ? role.some((r) => roles.includes(r))
      : roles.includes(role);
  }

  /**
   * 检查是否具备权限
   */
  function checkPermission(permission: string | string[]) {
    if (!user) return false;
    const permissions = user.permissions || [];
    return Array.isArray(permission)
      ? permission.some((p) => permissions.includes(p))
      : permissions.includes(permission);
  }

  /**
   * 综合判断（role 与 permission 同时存在则需都通过）
   */
  function hasAccess({
    roles,
    permissions,
  }: {
    roles?: string[];
    permissions?: string[];
  }) {
    let rolePass = true;
    let permPass = true;

    if (roles?.length) rolePass = checkRole(roles);
    if (permissions?.length) permPass = checkPermission(permissions);

    return rolePass && permPass;
  }

  return {
    user,
    hasRole: checkRole,
    hasPermission: checkPermission,
    hasAccess,
  };
}
