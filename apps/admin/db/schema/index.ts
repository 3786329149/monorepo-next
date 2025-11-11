// 导出所有表
export { companies } from "./companies";
export { departments } from "./departments";
export { users } from "./users";
export { roles } from "./roles";
export { permissions } from "./permissions";
export { menus } from "./menus";
export { userRoles } from "./junction/userRoles";
export { rolePermissions } from "./junction/rolePermissions";
export { roleMenus } from "./junction/roleMenus";

// 导出所有关联关系
export * from "./relations";

// 导出类型
export type { Company, NewCompany } from "./companies";
export type { Department, NewDepartment } from "./departments";
export type { User, NewUser } from "./users";
export type { Role, NewRole } from "./roles";
export type { Permission, NewPermission } from "./permissions";
export type { Menu, NewMenu } from "./menus";
export type { UserRole, NewUserRole } from "./junction/userRoles";
export type {
  RolePermission,
  NewRolePermission,
} from "./junction/rolePermissions";
export type { RoleMenu, NewRoleMenu } from "./junction/roleMenus";
