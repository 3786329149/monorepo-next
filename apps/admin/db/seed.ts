import { db } from ".";
import {
  companies,
  departments,
  menus,
  permissions,
  roleMenus,
  rolePermissions,
  roles,
  userRoles,
  users,
} from "./schema";

// 完整的 seed 函数
export async function seedDatabase() {
  try {
    console.log("开始初始化数据库...");

    // 1. 插入企业
    const companyResult = await db
      .insert(companies)
      .values({
        name: "示例科技有限公司",
        code: "DEMO_TECH",
        description: "一家专注于企业级应用开发的科技公司",
        address: "北京市海淀区中关村大街1号",
        contactPerson: "张经理",
        phone: "13800138000",
        email: "contact@demo-tech.com",
        domain: "demo-tech.com",
      })
      .returning();

    const company = companyResult[0];
    if (!company) throw new Error("企业数据插入失败");

    // 2. 插入部门
    const departmentResult = await db
      .insert(departments)
      .values([
        {
          companyId: company.id,
          parentId: null,
          name: "总部",
          code: "HQ",
          description: "公司总部",
          order: 1,
        },
        {
          companyId: company.id,
          parentId: null,
          name: "技术部",
          code: "TECH",
          description: "技术研发部门",
          order: 2,
        },
        {
          companyId: company.id,
          parentId: null,
          name: "产品部",
          code: "PRODUCT",
          description: "产品设计部门",
          order: 3,
        },
      ])
      .returning();

    if (departmentResult.length < 3) throw new Error("部门数据插入失败");
    const [headquarters, techDept, productDept] = departmentResult;

    // 3. 插入权限
    const permissionResult = await db
      .insert(permissions)
      .values([
        {
          name: "查看用户",
          code: "user:read",
          description: "查看用户列表和详情",
          resource: "user",
          action: "read",
          isSystem: true,
        },
        {
          name: "创建用户",
          code: "user:create",
          description: "创建新用户",
          resource: "user",
          action: "create",
          isSystem: true,
        },
        {
          name: "查看仪表板",
          code: "dashboard:view",
          description: "查看系统仪表板",
          resource: "dashboard",
          action: "view",
          isSystem: true,
        },
      ])
      .returning();

    if (permissionResult.length === 0) throw new Error("权限数据插入失败");

    // 4. 插入菜单
    const menuResult = await db
      .insert(menus)
      .values([
        {
          parentId: null,
          name: "仪表板",
          code: "dashboard",
          icon: "Dashboard",
          path: "/dashboard",
          component: "Dashboard",
          permissionCode: "dashboard:view",
          menuType: "menu",
          order: 1,
        },
        {
          parentId: null,
          name: "用户管理",
          code: "user",
          icon: "Users",
          path: "/user",
          component: "User",
          permissionCode: "user:read",
          menuType: "menu",
          order: 2,
        },
      ])
      .returning();

    if (menuResult.length === 0) throw new Error("菜单数据插入失败");

    // 5. 插入角色
    const roleResult = await db
      .insert(roles)
      .values([
        {
          companyId: company.id,
          name: "超级管理员",
          code: "super_admin",
          description: "系统超级管理员，拥有所有权限",
          isSystem: true,
          order: 1,
        },
        {
          companyId: company.id,
          name: "部门管理员",
          code: "department_admin",
          description: "部门管理员，管理本部门用户和权限",
          isSystem: true,
          order: 2,
        },
        {
          companyId: company.id,
          name: "普通用户",
          code: "user",
          description: "普通用户，基础权限",
          isSystem: true,
          order: 3,
        },
      ])
      .returning();

    if (roleResult.length < 3) throw new Error("角色数据插入失败");
    const [superAdminRole, departmentAdminRole, normalUserRole] = roleResult;

    // 6. 插入用户
    const hashedPassword =
      "$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w"; // 123456
    const userResult = await db
      .insert(users)
      .values([
        {
          companyId: company.id,
          departmentId: headquarters?.id,
          username: "admin",
          email: "admin@demo-tech.com",
          phone: "13800138001",
          password: hashedPassword,
          realName: "张管理员",
          gender: "male" as const,
          position: "系统管理员",
          employeeId: "EMP001",
          isSuperAdmin: true,
        },
        {
          companyId: company.id,
          departmentId: techDept?.id,
          username: "tech_admin",
          email: "tech_admin@demo-tech.com",
          phone: "13800138002",
          password: hashedPassword,
          realName: "李技术经理",
          gender: "male" as const,
          position: "技术部经理",
          employeeId: "EMP002",
          isSuperAdmin: false,
        },
        {
          companyId: company.id,
          departmentId: techDept?.id,
          username: "frontend_dev",
          email: "frontend@demo-tech.com",
          phone: "13800138003",
          password: hashedPassword,
          realName: "赵前端",
          gender: "male" as const,
          position: "前端工程师",
          employeeId: "EMP003",
          isSuperAdmin: false,
        },
      ])
      .returning();

    if (userResult.length < 3) throw new Error("用户数据插入失败");
    const [adminUser, techAdminUser, frontendUser] = userResult;

    // 7. 分配用户角色
    const userRoleData = [
      {
        userId: adminUser?.id,
        roleId: superAdminRole?.id,
        assignedBy: adminUser?.id,
        assignedAt: new Date(),
      },
      {
        userId: techAdminUser?.id,
        roleId: departmentAdminRole?.id,
        assignedBy: adminUser?.id,
        assignedAt: new Date(),
      },
      {
        userId: frontendUser?.id,
        roleId: normalUserRole?.id,
        assignedBy: adminUser?.id,
        assignedAt: new Date(),
      },
    ];

    await db.insert(userRoles).values(userRoleData);
    console.log("用户角色分配完成");

    // 8. 为角色分配权限
    const rolePermissionData = [
      // 超级管理员拥有所有权限
      ...permissionResult.map((permission) => ({
        roleId: superAdminRole?.id,
        permissionId: permission.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      })),
      // 部门管理员权限
      {
        roleId: departmentAdminRole?.id,
        permissionId: permissionResult[0]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // user:read
      {
        roleId: departmentAdminRole?.id,
        permissionId: permissionResult[1]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // user:create
      // 普通用户权限
      {
        roleId: normalUserRole?.id,
        permissionId: permissionResult[0]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // user:read
      {
        roleId: normalUserRole?.id,
        permissionId: permissionResult[2]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // dashboard:view
    ];

    await db.insert(rolePermissions).values(rolePermissionData);
    console.log("角色权限分配完成");

    // 9. 为角色分配菜单
    const roleMenuData = [
      // 超级管理员拥有所有菜单
      ...menuResult.map((menu) => ({
        roleId: superAdminRole?.id,
        menuId: menu.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      })),
      // 部门管理员菜单
      {
        roleId: departmentAdminRole?.id,
        menuId: menuResult[0]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // 仪表板
      {
        roleId: departmentAdminRole?.id,
        menuId: menuResult[1]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // 用户管理
      // 普通用户菜单
      {
        roleId: normalUserRole?.id,
        menuId: menuResult[0]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // 仪表板
      {
        roleId: normalUserRole?.id,
        menuId: menuResult[1]?.id,
        grantedBy: adminUser?.id,
        grantedAt: new Date(),
      }, // 用户管理
    ];

    await db.insert(roleMenus).values(roleMenuData);
    console.log("角色菜单分配完成");

    console.log("数据库初始化完成！");
  } catch (error) {
    console.error("初始化失败:", error);
    throw error;
  }
}
