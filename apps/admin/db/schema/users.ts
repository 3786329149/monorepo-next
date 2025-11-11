import {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { departments } from "./departments";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  departmentId: integer("department_id").references(() => departments.id, {
    onDelete: "set null",
  }),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }).notNull(),
  realName: varchar("real_name", { length: 50 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  gender: varchar("gender", { length: 10 }),
  position: varchar("position", { length: 50 }),
  employeeId: varchar("employee_id", { length: 50 }),
  lastLoginAt: timestamp("last_login_at", { mode: "date" }),
  loginCount: integer("login_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  isSuperAdmin: boolean("is_super_admin").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
