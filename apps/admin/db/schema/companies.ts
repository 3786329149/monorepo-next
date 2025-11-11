import { boolean, text, varchar } from "drizzle-orm/pg-core";
import { pgTable, serial, timestamp } from "drizzle-orm/pg-core";

// 🏢 企业表
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  code: varchar("code", { length: 50 }).notNull().unique(), // 企业编码
  description: text("description"),
  address: text("address"),
  contactPerson: varchar("contact_person", { length: 50 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 100 }),
  logo: varchar("logo", { length: 255 }), // 企业Logo URL
  domain: varchar("domain", { length: 100 }), // 企业域名
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
