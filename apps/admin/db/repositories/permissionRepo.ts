import { db } from "../index";
import { permissions } from "../schema/permissions";
import { eq } from "drizzle-orm";

export async function createPermission(data: {
  key: string;
  name: string;
  description?: string;
}) {
  const [created] = await db.insert(permissions).values(data).returning();
  return created;
}

export async function getPermissionList() {
  return await db.select().from(permissions);
}

export async function getPermissionById(id: number) {
  const [row] = await db
    .select()
    .from(permissions)
    .where(eq(permissions.id, id));
  return row;
}

export async function updatePermission(
  id: number,
  data: Partial<{ code: string; description: string }>
) {
  const [updated] = await db
    .update(permissions)
    .set(data)
    .where(eq(permissions.id, id))
    .returning();
  return updated;
}

export async function deletePermission(id: number) {
  await db.delete(permissions).where(eq(permissions.id, id));
}
