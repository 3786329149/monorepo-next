import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { roles } from "./roles";
import { permissions } from "./permissions";

export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    roleId: integer("role_id")
      .references(() => roles.id)
      .notNull(),
  },

  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .references(() => roles.id)
      .notNull(),
    permissionId: integer("permission_id")
      .references(() => permissions.id)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
);
