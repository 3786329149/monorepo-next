import { db } from "../index";
import { menus } from "../schema/menus";
import { eq } from "drizzle-orm";

export async function createMenu(data: {
  title: string;
  path: string;
  icon?: string;
  parentId?: number | null;
}) {
  const [created] = await db.insert(menus).values(data).returning();
  return created;
}

export async function getMenuList() {
  return await db.select().from(menus);
}

export async function getMenuById(id: number) {
  const [row] = await db.select().from(menus).where(eq(menus.id, id));
  return row;
}

export async function updateMenu(
  id: number,
  data: Partial<{ name: string; path: string; parentId: number | null }>
) {
  const [updated] = await db
    .update(menus)
    .set(data)
    .where(eq(menus.id, id))
    .returning();
  return updated;
}

export async function deleteMenu(id: number) {
  await db.delete(menus).where(eq(menus.id, id));
}
