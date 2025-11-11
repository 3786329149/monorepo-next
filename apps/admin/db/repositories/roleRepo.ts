import { db } from "../index";
import { roles } from "../schema/roles";
import { eq } from "drizzle-orm";

export async function createRole(data: { name: string }) {
  const [created] = await db.insert(roles).values(data).returning();
  return created;
}

export async function getRoleList() {
  return await db.select().from(roles);
}

export async function getRoleById(id: number) {
  const [row] = await db.select().from(roles).where(eq(roles.id, id));
  return row;
}

export async function updateRole(id: number, data: Partial<{ name: string }>) {
  const [updated] = await db
    .update(roles)
    .set(data)
    .where(eq(roles.id, id))
    .returning();
  return updated;
}

export async function deleteRole(id: number) {
  await db.delete(roles).where(eq(roles.id, id));
}
