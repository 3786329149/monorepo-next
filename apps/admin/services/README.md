数据访问逻辑（curd函数）

```bash
前端页面 page.tsx
   ↓ fetch('/api/users')
Next.js 路由 route.ts
   ↓ 调用 service 层
service 层 user.service.ts
   ↓ 访问 drizzle db
数据库执行 CRUD
```
