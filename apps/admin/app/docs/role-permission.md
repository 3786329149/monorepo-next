「角色（Role）」与「权限（Permission）」的关系，是做好整套权限体系（包括菜单、按钮、路由守卫、接口访问控制）的核心。
我来帮你梳理一个清晰、现代、前后端分离系统通用的思维模型 👇

🧩 一、三层核心概念
概念 说明 举例
用户（User） 系统的实际操作人。通过登录身份认证。 张三、李四
角色（Role） 权限的集合，代表一种职能或身份。用户通过角色获得权限。 管理员、项目经理、普通成员
权限（Permission） 最小的访问控制单元，定义系统中“能做什么”。 查看用户列表、编辑项目、访问设置页

👉 关系：

User → Role → Permission

用户不是直接拥有权限；

用户通过「角色」间接获得权限；

角色是系统权限的组合模板。

🧱 二、权限的类型与层次

一个完整系统的权限大致可以分为以下几类：

页面级权限（菜单/路由）

控制“能看到哪些页面”

比如：普通用户看不到 /admin 菜单

对应前端的菜单渲染、路由守卫。

功能级权限（按钮/操作）

控制“能做哪些操作”

比如：users:edit（编辑按钮）、project:delete

前端通过 v-permission 或组件条件渲染实现。

数据级权限

控制“能看到哪些数据”

比如：只能查看自己部门的项目

主要由后端在接口层控制。

🧠 三、权限在系统中的数据流
1️⃣ 登录阶段

用户输入账号密码；

后端验证通过后返回：

用户信息（id、name、role）

Token（用于认证）

当前用户角色（可能是多个）

当前角色对应的权限标识列表（permissions: string[]）

示例：

{
"id": "u001",
"name": "Ann",
"roles": ["admin"],
"permissions": [
"dashboard:view",
"user:list",
"user:edit",
"settings:access"
]
}

2️⃣ 前端加载阶段

前端在全局状态（Zustand / Pinia / Redux）中存储用户信息；

根据权限数组动态生成：

可访问的 菜单树；

可注册的 路由表；

可显示的 操作按钮。

✅ 菜单和路由都是基于权限动态过滤出来的。

3️⃣ 路由守卫阶段

每次路由跳转时：

判断是否已登录；

若未登录 → 重定向到登录页；

若已登录但无访问该路由的权限 → 重定向到 403 页面；

否则正常进入。

🧭 四、角色与权限的设计模式
模式 特点 适用场景
RBAC（基于角色的访问控制） Role-Based Access Control，最经典模型 中大型管理系统
ABAC（基于属性的访问控制） Attribute-Based，基于用户属性、环境、资源条件 更动态、灵活的系统
Hybrid 模型 RBAC + ABAC 混合 企业级、复杂权限系统

通常前端我们实现的是 RBAC + 权限标识（Permission Code）：

角色：Admin
权限：

- menu:dashboard
- user:create
- user:delete
- project:view

🧩 五、菜单、角色、权限的衔接

一个菜单项通常包含这些字段：

字段 含义
key 唯一标识
title 菜单标题
path 路由路径
icon 图标名
permission 访问该菜单所需权限
children 子菜单

示例：

{
"key": "users",
"title": "用户管理",
"path": "/users",
"icon": "Users",
"permission": "user:list",
"children": [
{
"key": "user-edit",
"title": "编辑用户",
"path": "/users/edit",
"permission": "user:edit"
}
]
}

当后端返回菜单时，前端只需要根据 user.permissions 过滤出有权访问的项。

⚙️ 六、常见的前端权限控制点
位置 控制方式 说明
菜单 根据 user.permissions 过滤菜单树 动态渲染
路由守卫 进入页面前检查权限 无权限跳 403
按钮级别 自定义指令 / 组件条件 <Button v-permission="user:edit">
API 调用 后端二次校验 防止伪造请求
🧩 七、一个完整例子总结

用户登录 → 得到 token + role + permissions

前端保存到 store

动态生成菜单与路由

路由守卫负责防止越权访问

组件内部用权限标识控制按钮可见性

后端根据角色控制数据范围与接口权限
