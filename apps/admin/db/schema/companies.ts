import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(), // 公司名称,
  code: varchar("code", { length: 50 }).notNull().unique(), // 公司编码，用于区分多租户,
  isActive: boolean("is_active").default(true), // 是否启用 ,
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
