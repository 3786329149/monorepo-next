import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { menus } from "../menus";
import { users } from "../users";
import { roles } from "../roles";

// 🔗 角色-菜单关联表 (多对多)
export const roleMenus = pgTable(
  "role_menus",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    menuId: integer("menu_id")
      .notNull()
      .references(() => menus.id, { onDelete: "cascade" }),
    grantedAt: timestamp("granted_at", { mode: "date" }).defaultNow().notNull(),
    grantedBy: integer("granted_by").references(() => users.id), // 授权人
  },
  (table) => [primaryKey({ columns: [table.roleId, table.menuId] })]
);

export type RoleMenu = typeof roleMenus.$inferSelect;
export type NewRoleMenu = typeof roleMenus.$inferInsert;
