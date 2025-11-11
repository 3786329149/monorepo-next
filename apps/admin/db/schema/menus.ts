import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { roleMenus, users } from ".";

// 🧭 菜单表
export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id").references((): any => menus.id), // 父级菜单ID
  name: varchar("name", { length: 50 }).notNull(),
  code: varchar("code", { length: 100 }).notNull().unique(), // 菜单编码
  icon: varchar("icon", { length: 50 }), // 菜单图标
  path: varchar("path", { length: 200 }), // 路由路径
  component: varchar("component", { length: 200 }), // 组件路径
  permissionCode: varchar("permission_code", { length: 100 }), // 关联的权限编码
  menuType: varchar("menu_type", { length: 20 }).notNull().default("menu"), // menu:菜单, button:按钮
  order: integer("order").default(0).notNull(),
  isVisible: boolean("is_visible").default(true).notNull(), // 是否显示
  isSystem: boolean("is_system").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// 📱 菜单关联关系
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

// 🔗 角色-菜单关联关系
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

export type Menu = typeof menus.$inferSelect;
export type NewMenu = typeof menus.$inferInsert;
