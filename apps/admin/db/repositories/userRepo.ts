import { db } from "../index";
import { users } from "../schema/users";
import { eq } from "drizzle-orm";

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
  roleId: number;
  departmentId: number;
}) {
  const [created] = await db.insert(users).values(data).returning();
  return created;
}

export async function getUserList() {
  return await db.select().from(users);
}

export async function getUserById(id: number) {
  const [row] = await db.select().from(users).where(eq(users.id, id));
  return row;
}

export async function updateUser(
  id: number,
  data: Partial<{
    username: string;
    password: string;
    roleId: number;
    departmentId: number;
  }>
) {
  const [updated] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return updated;
}

export async function deleteUser(id: number) {
  await db.delete(users).where(eq(users.id, id));
}
