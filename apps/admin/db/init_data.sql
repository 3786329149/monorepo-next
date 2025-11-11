-- init_data.sql
-- 清空现有数据（谨慎使用）
TRUNCATE TABLE role_menus, role_permissions, user_roles, users, roles, permissions, menus, departments, companies CASCADE;

-- 1. 插入企业数据
INSERT INTO companies (name, code, description, address, contact_person, phone, email, domain, is_active) VALUES
('示例科技有限公司', 'DEMO_TECH', '一家专注于企业级应用开发的科技公司', '北京市海淀区中关村大街1号', '张经理', '13800138000', 'contact@demo-tech.com', 'demo-tech.com', true);

-- 2. 插入部门数据
INSERT INTO departments (company_id, parent_id, name, code, description, order, is_active) VALUES
(1, NULL, '总部', 'HQ', '公司总部', 1, true),
(1, 1, '技术部', 'TECH', '技术研发部门', 1, true),
(1, 1, '产品部', 'PRODUCT', '产品设计部门', 2, true),
(1, 1, '运营部', 'OPERATION', '运营管理部门', 3, true),
(1, 2, '前端开发组', 'FRONTEND', '前端开发团队', 1, true),
(1, 2, '后端开发组', 'BACKEND', '后端开发团队', 2, true),
(1, 2, '测试组', 'QA', '质量保证团队', 3, true);

-- 3. 插入权限数据
INSERT INTO permissions (name, code, description, resource, action, is_system, is_active) VALUES
-- 用户管理权限
('查看用户', 'user:read', '查看用户列表和详情', 'user', 'read', true, true),
('创建用户', 'user:create', '创建新用户', 'user', 'create', true, true),
('编辑用户', 'user:update', '编辑用户信息', 'user', 'update', true, true),
('删除用户', 'user:delete', '删除用户', 'user', 'delete', true, true),
('分配角色', 'user:assign_role', '为用户分配角色', 'user', 'assign_role', true, true),

-- 角色管理权限
('查看角色', 'role:read', '查看角色列表和详情', 'role', 'read', true, true),
('创建角色', 'role:create', '创建新角色', 'role', 'create', true, true),
('编辑角色', 'role:update', '编辑角色信息', 'role', 'update', true, true),
('删除角色', 'role:delete', '删除角色', 'role', 'delete', true, true),
('分配权限', 'role:assign_permission', '为角色分配权限', 'role', 'assign_permission', true, true),

-- 部门管理权限
('查看部门', 'department:read', '查看部门列表和详情', 'department', 'read', true, true),
('创建部门', 'department:create', '创建新部门', 'department', 'create', true, true),
('编辑部门', 'department:update', '编辑部门信息', 'department', 'update', true, true),
('删除部门', 'department:delete', '删除部门', 'department', 'delete', true, true),

-- 菜单管理权限
('查看菜单', 'menu:read', '查看菜单列表和详情', 'menu', 'read', true, true),
('创建菜单', 'menu:create', '创建新菜单', 'menu', 'create', true, true),
('编辑菜单', 'menu:update', '编辑菜单信息', 'menu', 'update', true, true),
('删除菜单', 'menu:delete', '删除菜单', 'menu', 'delete', true, true),

-- 系统管理权限
('系统设置', 'system:settings', '系统全局设置', 'system', 'settings', true, true),
('日志查看', 'system:logs', '查看系统日志', 'system', 'logs', true, true),

-- 业务权限
('查看仪表板', 'dashboard:view', '查看系统仪表板', 'dashboard', 'view', true, true),
('数据导出', 'data:export', '导出业务数据', 'data', 'export', true, true);

-- 4. 插入菜单数据
INSERT INTO menus (parent_id, name, code, icon, path, component, permission_code, menu_type, order, is_visible, is_active) VALUES
-- 一级菜单
(NULL, '仪表板', 'dashboard', 'Dashboard', '/dashboard', 'Dashboard', 'dashboard:view', 'menu', 1, true, true),
(NULL, '用户管理', 'user', 'Users', '/user', 'User', 'user:read', 'menu', 2, true, true),
(NULL, '角色管理', 'role', 'Shield', '/role', 'Role', 'role:read', 'menu', 3, true, true),
(NULL, '部门管理', 'department', 'Building', '/department', 'Department', 'department:read', 'menu', 4, true, true),
(NULL, '系统设置', 'system', 'Settings', '/system', 'System', 'system:settings', 'menu', 5, true, true),

-- 用户管理的子菜单和按钮
(2, '用户列表', 'user-list', 'List', '/user/list', 'UserList', 'user:read', 'menu', 1, true, true),
(2, '创建用户', 'user-create', 'Plus', '', '', 'user:create', 'button', 2, true, true),
(2, '编辑用户', 'user-edit', 'Edit', '', '', 'user:update', 'button', 3, true, true),
(2, '删除用户', 'user-delete', 'Trash2', '', '', 'user:delete', 'button', 4, true, true),
(2, '分配角色', 'user-assign-role', 'UserCheck', '', '', 'user:assign_role', 'button', 5, true, true),

-- 角色管理的子菜单和按钮
(3, '角色列表', 'role-list', 'List', '/role/list', 'RoleList', 'role:read', 'menu', 1, true, true),
(3, '创建角色', 'role-create', 'Plus', '', '', 'role:create', 'button', 2, true, true),
(3, '编辑角色', 'role-edit', 'Edit', '', '', 'role:update', 'button', 3, true, true),
(3, '删除角色', 'role-delete', 'Trash2', '', '', 'role:delete', 'button', 4, true, true),
(3, '分配权限', 'role-assign-permission', 'Key', '', '', 'role:assign_permission', 'button', 5, true, true),

-- 部门管理的子菜单和按钮
(4, '部门列表', 'department-list', 'List', '/department/list', 'DepartmentList', 'department:read', 'menu', 1, true, true),
(4, '创建部门', 'department-create', 'Plus', '', '', 'department:create', 'button', 2, true, true),
(4, '编辑部门', 'department-edit', 'Edit', '', '', 'department:update', 'button', 3, true, true),
(4, '删除部门', 'department-delete', 'Trash2', '', '', 'department:delete', 'button', 4, true, true),

-- 系统设置的子菜单
(5, '菜单管理', 'menu-management', 'Menu', '/system/menu', 'MenuManagement', 'menu:read', 'menu', 1, true, true),
(5, '权限管理', 'permission-management', 'Key', '/system/permission', 'PermissionManagement', 'role:assign_permission', 'menu', 2, true, true),
(5, '系统日志', 'system-logs', 'FileText', '/system/logs', 'SystemLogs', 'system:logs', 'menu', 3, true, true);

-- 5. 插入角色数据
INSERT INTO roles (company_id, name, code, description, is_system, is_active, order) VALUES
(1, '超级管理员', 'super_admin', '系统超级管理员，拥有所有权限', true, true, 1),
(1, '部门管理员', 'department_admin', '部门管理员，管理本部门用户和权限', true, true, 2),
(1, '普通用户', 'user', '普通用户，基础权限', true, true, 3);

-- 6. 插入用户数据 (密码都是: 123456)
INSERT INTO users (company_id, department_id, username, email, phone, password, real_name, gender, position, employee_id, is_super_admin, is_active) VALUES
-- 超级管理员
(1, 1, 'admin', 'admin@demo-tech.com', '13800138001', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '张管理员', 'male', '系统管理员', 'EMP001', true, true),

-- 部门管理员
(1, 2, 'tech_admin', 'tech_admin@demo-tech.com', '13800138002', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '李技术经理', 'male', '技术部经理', 'EMP002', false, true),
(1, 3, 'product_admin', 'product_admin@demo-tech.com', '13800138003', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '王产品经理', 'female', '产品部经理', 'EMP003', false, true),

-- 普通用户
(1, 5, 'frontend_dev', 'frontend@demo-tech.com', '13800138004', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '赵前端', 'male', '前端工程师', 'EMP004', false, true),
(1, 6, 'backend_dev', 'backend@demo-tech.com', '13800138005', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '钱后端', 'male', '后端工程师', 'EMP005', false, true),
(1, 7, 'qa_tester', 'qa@demo-tech.com', '13800138006', '$2b$10$8A5/7.6d4e3f2a1b0c9d8e7f6g5h4i3j2k1l0m9n8o7p6q5r4s3t2u1v0w', '孙测试', 'female', '测试工程师', 'EMP006', false, true);

-- 7. 更新部门经理
UPDATE departments SET manager_id = 2 WHERE id = 2; -- 技术部经理
UPDATE departments SET manager_id = 3 WHERE id = 3; -- 产品部经理

-- 8. 分配用户角色
INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES
-- 超级管理员拥有所有角色
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),

-- 部门管理员
(2, 2, 1), -- 技术部经理 -> 部门管理员
(3, 2, 1), -- 产品部经理 -> 部门管理员

-- 普通用户
(4, 3, 1), -- 前端开发 -> 普通用户
(5, 3, 1), -- 后端开发 -> 普通用户
(6, 3, 1); -- 测试 -> 普通用户

-- 9. 为角色分配权限
-- 超级管理员拥有所有权限
INSERT INTO role_permissions (role_id, permission_id, granted_by)
SELECT 1, id, 1 FROM permissions;

-- 部门管理员权限
INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES
(2, 1, 1),  -- user:read
(2, 2, 1),  -- user:create  
(2, 3, 1),  -- user:update
(2, 5, 1),  -- user:assign_role
(2, 6, 1),  -- role:read
(2, 12, 1), -- department:read
(2, 13, 1), -- department:create
(2, 14, 1), -- department:update
(2, 21, 1), -- dashboard:view
(2, 22, 1); -- data:export

-- 普通用户权限
INSERT INTO role_permissions (role_id, permission_id, granted_by) VALUES
(3, 1, 1),  -- user:read
(3, 12, 1), -- department:read
(3, 21, 1); -- dashboard:view

-- 10. 为角色分配菜单
-- 超级管理员拥有所有菜单
INSERT INTO role_menus (role_id, menu_id, granted_by)
SELECT 1, id, 1 FROM menus;

-- 部门管理员菜单
INSERT INTO role_menus (role_id, menu_id, granted_by) VALUES
(2, 1, 1),   -- 仪表板
(2, 2, 1),   -- 用户管理
(2, 6, 1),   -- 用户列表
(2, 7, 1),   -- 创建用户
(2, 8, 1),   -- 编辑用户
(2, 9, 1),   -- 删除用户
(2, 10, 1),  -- 分配角色
(2, 4, 1),   -- 部门管理
(2, 18, 1),  -- 部门列表
(2, 19, 1),  -- 创建部门
(2, 20, 1),  -- 编辑部门
(2, 21, 1);  -- 删除部门

-- 普通用户菜单
INSERT INTO role_menus (role_id, menu_id, granted_by) VALUES
(3, 1, 1),   -- 仪表板
(3, 2, 1),   -- 用户管理
(3, 6, 1),   -- 用户列表
(3, 4, 1),   -- 部门管理
(3, 18, 1);  -- 部门列表