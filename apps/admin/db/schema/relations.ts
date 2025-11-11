// db/schema/relations.ts
import { relations } from "drizzle-orm";
import { companies } from "./companies";
import { departments } from "./departments";
import { users } from "./users";
import { roles } from "./roles";
import { permissions } from "./permissions";
import { menus } from "./menus";
import { userRoles } from "./junction/userRoles";
import { rolePermissions } from "./junction/rolePermissions";
import { roleMenus } from "./junction/roleMenus";

// 企业关联关系
export const companiesRelations = relations(companies, ({ many }) => ({
  departments: many(departments),
  users: many(users),
  roles: many(roles),
}));

// 部门关联关系
export const departmentsRelations = relations(departments, ({ one, many }) => ({
  company: one(companies, {
    fields: [departments.companyId],
    references: [companies.id],
  }),
  parent: one(departments, {
    fields: [departments.parentId],
    references: [departments.id],
    relationName: "department_children",
  }),
  children: many(departments, {
    relationName: "department_children",
  }),
  manager: one(users, {
    fields: [departments.managerId],
    references: [users.id],
  }),
  users: many(users),
}));

// 用户关联关系
export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  userRoles: many(userRoles),
  managedDepartments: many(departments, {
    relationName: "department_manager",
  }),
}));

// 角色关联关系
export const rolesRelations = relations(roles, ({ one, many }) => ({
  company: one(companies, {
    fields: [roles.companyId],
    references: [companies.id],
  }),
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
  roleMenus: many(roleMenus),
}));

// 权限关联关系
export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

// 菜单关联关系
export const menusRelations = relations(menus, ({ one, many }) => ({
  parent: one(menus, {
    fields: [menus.parentId],
    references: [menus.id],
    relationName: "menu_children",
  }),
  children: many(menus, {
    relationName: "menu_children",
  }),
  roleMenus: many(roleMenus),
}));

// 用户-角色关联关系
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  assignedByUser: one(users, {
    fields: [userRoles.assignedBy],
    references: [users.id],
    relationName: "assigned_by_user",
  }),
}));

// 角色-权限关联关系
export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
    grantedByUser: one(users, {
      fields: [rolePermissions.grantedBy],
      references: [users.id],
    }),
  })
);

// 角色-菜单关联关系
export const roleMenusRelations = relations(roleMenus, ({ one }) => ({
  role: one(roles, {
    fields: [roleMenus.roleId],
    references: [roles.id],
  }),
  menu: one(menus, {
    fields: [roleMenus.menuId],
    references: [menus.id],
  }),
  grantedByUser: one(users, {
    fields: [roleMenus.grantedBy],
    references: [users.id],
  }),
}));
