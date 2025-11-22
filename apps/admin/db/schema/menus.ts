import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { permissions } from "./permissions";

export const menus = pgTable("menus", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // 菜单名称
  path: varchar("path", { length: 200 }), //前端路由路径
  icon: varchar("icon", { length: 100 }), //菜单图标
  parentId: integer("parent_id").default(0), // 上级菜单ID，用于树状结构
  permissionId: integer("permission_id").references(() => permissions.id), //"关联权限ID
  sort: integer("sort").default(0), //排序号
  isVisible: boolean("is_visible").default(true), //是否显示在菜单
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
