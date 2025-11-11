import { pgTable, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "../users";
import { roles } from "../roles";

export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at", { mode: "date" })
      .defaultNow()
      .notNull(),
    assignedBy: integer("assigned_by").references(() => users.id),
  },
  (table) => [
    // 使用数组而不是对象，使用新的 primaryKey 语法
    primaryKey({ columns: [table.userId, table.roleId] }),
  ]
);

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
