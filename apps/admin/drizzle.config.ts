import "dotenv/config";
import { defineConfig } from "drizzle-kit";

async function getConfig() {
  // 确保环境变量已加载
  await import("dotenv/config");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  return defineConfig({
    out: "./drizzle",
    schema: "./db/schema/index.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
  });
}

export default getConfig();
