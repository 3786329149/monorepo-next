import { eq } from "drizzle-orm";
import { db } from "..";
import { companies } from "../schema/companies";

export async function createCompany(data: { name: string }) {
  const [created] = await db.insert(companies).values(data).returning();
  return created;
}

export async function getCompanyList() {
  return await db.select().from(companies);
}

export async function updateCompany(
  id: number,
  data: Partial<{ name: string }>
) {
  const [updated] = await db
    .update(companies)
    .set(data)
    .where(eq(companies.id, id))
    .returning();

  return updated;
}

export async function deleteCompany(id: number) {
  await db.delete(companies).where(eq(companies.id, id));
}
