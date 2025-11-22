import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import bcrypt from "bcrypt";

dotenv.config();

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client);

/**
 * 生成加密密码
 */
export async function hashPassword(plain: string) {
  const saltRounds = 10;
  return await bcrypt.hash(plain, saltRounds);
}

/**
 * 连接数据库
 */
export async function connectDB() {
  await client.connect();
  console.log("🟢 Database connected");
}

/**
 * 断开连接
 */
export async function closeDB() {
  await client.end();
  console.log("🔴 Database disconnected");
}
