import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // 权限名称
  code: varchar("code", { length: 100 }).notNull().unique(), //权限编码，例如 'user:create'
  description: text("description"), // 权限描述
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
