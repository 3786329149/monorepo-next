import { db } from "#/db";
import { users } from "#/db/schema";
import { eq } from "drizzle-orm";

export async function getUserList() {
  return await db.select().from(users);
}

export async function getUserById(id: number) {
  return await db.select().from(users).where(eq(users.id, id)).limit(1);
}

export async function createUser(data: typeof users.$inferInsert) {
  return await db.insert(users).values(data).returning();
}

export async function updateUser(
  id: number,
  data: Partial<typeof users.$inferInsert>
) {
  return await db.update(users).set(data).where(eq(users.id, id)).returning();
}

export async function deleteUser(id: number) {
  return await db.delete(users).where(eq(users.id, id)).returning();
}
