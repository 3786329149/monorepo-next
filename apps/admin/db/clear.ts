import { db } from ".";
import {
  userRoles,
  rolePermissions,
  users,
  roles,
  permissions,
  menus,
  departments,
  companies,
} from "./schema/index";
import { closeDB, connectDB } from "./utils";

async function clearData() {
  await connectDB();
  console.log("🧹 Start clearing enterprise tables...");

  // ✅ 删除顺序必须遵守外键依赖关系
  // 1. 中间关联表
  await db.delete(userRoles);
  await db.delete(rolePermissions);

  // 2. 依赖其他表的子表
  await db.delete(users);
  await db.delete(menus); // ← 在 permissions 前面
  await db.delete(roles);
  await db.delete(permissions);

  // 3. 部门和公司
  await db.delete(departments);
  await db.delete(companies);

  console.log("✅ All enterprise data cleared successfully.");
  await closeDB();
}

clearData().catch(async (err) => {
  console.error("❌ Clear data error:", err);
  await closeDB();
});
