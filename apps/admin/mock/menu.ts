import { Home, Users, Settings, Folder } from "lucide-react";

export const menuItems = [
  {
    label: "仪表盘",
    icon: Home,
    href: "/",
  },
  {
    label: "用户管理",
    icon: Users,
    href: "/users",
  },
  {
    label: "项目管理",
    icon: Folder,
    href: "/projects",
  },
  {
    label: "系统设置",
    icon: Settings,
    href: "/settings",
  },
];
