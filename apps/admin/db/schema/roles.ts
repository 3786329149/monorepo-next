import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(), // 角色名称
  code: varchar("code", { length: 50 }).unique().notNull(), // 角色唯一编码
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(), // 所属公司
  isSystem: boolean("is_system").default(false), // 是否系统角色（不可删除）
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
