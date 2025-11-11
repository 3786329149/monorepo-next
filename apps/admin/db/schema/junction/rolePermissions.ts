import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { roles } from "../roles";
import { permissions } from "../permissions";
import { users } from "../users";

// 🔗 角色-权限关联表 (多对多)
export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    grantedAt: timestamp("granted_at", { mode: "date" }).defaultNow().notNull(),
    grantedBy: integer("granted_by").references(() => users.id), // 授权人
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
);

export type RolePermission = typeof rolePermissions.$inferSelect;
export type NewRolePermission = typeof rolePermissions.$inferInsert;
