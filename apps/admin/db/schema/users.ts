import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { departments } from "./departments";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  // 登录名
  password: varchar("password", { length: 255 }).notNull(), // 密码Hash
  fullName: varchar("full_name", { length: 100 }), // 用户姓名
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  companyId: integer("company_id")
    .references(() => companies.id)
    .notNull(), // 所属公司ID
  departmentId: integer("department_id").references(() => departments.id), // 所属部门ID
  isActive: boolean("is_active").default(true), //是否启用
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
