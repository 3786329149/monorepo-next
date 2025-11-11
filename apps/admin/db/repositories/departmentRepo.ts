import { db } from "../index";
import { departments } from "../schema/departments";
import { eq } from "drizzle-orm";

export async function createDepartment(data: {
  name: string;
  companyId: number;
}) {
  const [created] = await db.insert(departments).values(data).returning();
  return created;
}

export async function getDepartmentList() {
  return await db.select().from(departments);
}

export async function updateDepartment(
  id: number,
  data: Partial<{ name: string; componyId: number }>
) {
  const [updated] = await db
    .update(departments)
    .set(data)
    .where(eq(departments.id, id))
    .returning();

  return updated;
}

export async function deleteDepartment(id: number) {
  await db.delete(departments).where(eq(departments.id, id));
}
