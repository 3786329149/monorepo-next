import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { roles } from "./roles";
import { users } from "./users";
import { rolePermissions } from ".";

// 🔐 权限表
export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  code: varchar("code", { length: 100 }).notNull().unique(), // 权限编码，如：user:create, user:delete
  description: text("description"),
  resource: varchar("resource", { length: 50 }).notNull(), // 资源类型，如：user, role, department
  action: varchar("action", { length: 20 }).notNull(), // 操作类型，如：create, read, update, delete
  isSystem: boolean("is_system").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// 🔐 权限关联关系
export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

// 🔗 角色-权限关联关系
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

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;
