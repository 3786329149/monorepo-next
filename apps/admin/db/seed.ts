import {
  companies,
  departments,
  roles,
  users,
  permissions,
  menus,
  userRoles,
  rolePermissions,
} from "./schema/index";
import { db, connectDB, closeDB, hashPassword } from "./utils";

async function seed() {
  await connectDB();

  console.log("🌱 Seeding enterprise base data...");

  // 公司
  const [company] = await db
    .insert(companies)
    .values({
      name: "未来科技有限公司",
      code: "FUTURE_TECH",
    })
    .returning();

  // 部门
  const [depDev, depHR] = await db
    .insert(departments)
    .values([
      { name: "研发部", companyId: company.id },
      { name: "人事部", companyId: company.id },
    ])
    .returning();

  // 权限
  const [permUserView, permUserEdit, permSettings] = await db
    .insert(permissions)
    .values([
      { name: "查看用户", code: "user:view" },
      { name: "编辑用户", code: "user:edit" },
      { name: "系统设置", code: "settings:access" },
    ])
    .returning();

  // 菜单
  await db.insert(menus).values([
    { name: "仪表盘", path: "/dashboard", icon: "home" },
    {
      name: "用户管理",
      path: "/users",
      icon: "users",
      permissionId: permUserView.id,
    },
    {
      name: "系统设置",
      path: "/settings",
      icon: "settings",
      permissionId: permSettings.id,
    },
  ]);

  // 角色
  const [adminRole, devRole] = await db
    .insert(roles)
    .values([
      { name: "管理员", code: "admin", companyId: company.id, isSystem: true },
      { name: "开发者", code: "developer", companyId: company.id },
    ])
    .returning();

  // 加密密码
  const adminPwd = await hashPassword(
    process.env.ADMIN_PASSWORD || "Admin@123456"
  );
  const devPwd = await hashPassword(
    process.env.DEVELOPER_PASSWORD || "Dev@123456"
  );

  // 用户
  const [admin, dev] = await db
    .insert(users)
    .values([
      {
        username: "admin",
        password: adminPwd,
        fullName: "系统管理员",
        companyId: company.id,
        departmentId: depDev.id,
      },
      {
        username: "developer",
        password: devPwd,
        fullName: "前端开发",
        companyId: company.id,
        departmentId: depDev.id,
      },
    ])
    .returning();

  // 用户角色
  await db.insert(userRoles).values([
    { userId: admin.id, roleId: adminRole.id },
    { userId: dev.id, roleId: devRole.id },
  ]);

  // 角色权限
  await db.insert(rolePermissions).values([
    { roleId: adminRole.id, permissionId: permUserView.id },
    { roleId: adminRole.id, permissionId: permUserEdit.id },
    { roleId: adminRole.id, permissionId: permSettings.id },
    { roleId: devRole.id, permissionId: permUserView.id },
  ]);

  console.log("✅ Seeding complete.");
  await closeDB();
}

seed().catch(async (err) => {
  console.error("❌ Seed error:", err);
  await closeDB();
});
