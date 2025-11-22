import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // 部门名称
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(), // 所属公司ID
  parentId: integer("parent_id").default(0), // 上级部门ID，用于树状结构
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
