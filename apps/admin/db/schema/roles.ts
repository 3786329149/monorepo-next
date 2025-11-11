import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { relations } from "drizzle-orm";

import { roleMenus, rolePermissions, userRoles } from ".";

// 🛡️ 角色表
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 50 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(), // 角色编码，如：admin, user, manager
  description: text("description"),
  isSystem: boolean("is_system").default(false).notNull(), // 是否系统内置角色
  isActive: boolean("is_active").default(true).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// 角色唯一索引
export const rolesUniqueIndex = uniqueIndex("roles_company_code_idx").on(
  roles.companyId,
  roles.code
);

// 🎭 角色关联关系
export const rolesRelations = relations(roles, ({ one, many }) => ({
  company: one(companies, {
    fields: [roles.companyId],
    references: [companies.id],
  }),
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
  roleMenus: many(roleMenus),
}));

export type Role = typeof companies.$inferSelect;
export type NewRole = typeof companies.$inferInsert;
