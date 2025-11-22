import { connectDB, closeDB, client } from "./utils";

async function resetDatabase() {
  await connectDB();
  console.log("🔄 Resetting database with CASCADE...");

  await client.query(`
    TRUNCATE TABLE 
      user_roles,
      role_permissions,
      users,
      menus,
      roles,
      permissions,
      departments,
      companies
    RESTART IDENTITY CASCADE;
  `);

  console.log("✅ Database reset complete.");
  await closeDB();
}

resetDatabase().catch(async (err) => {
  console.error("❌ Reset error:", err);
  await closeDB();
});
