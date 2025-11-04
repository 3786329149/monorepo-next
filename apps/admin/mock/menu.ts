import { Home, Settings, Users } from "lucide-react";

export interface MenuItem {
  key: string;
  label: string;
  icon?: any;
  href?: string;
  badge?: string | number;
  badgeColor?: "default" | "destructive" | "secondary" | "outline";
  children?: MenuItem[];
}

export const menus: MenuItem[] = [
  {
    key: "dashboard",
    label: "dashboard",
    icon: Home,
    href: "/dashboard",
    badgeColor: "destructive",
    badge: "NEW",
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
    badgeColor: "destructive",
    badge: "NEW",
    children: [
      {
        key: "UsersList",
        label: "User List",
        href: "/users/list",
        badgeColor: "destructive",
        badge: "update",
        children: [
          {
            key: "AdminRole",
            label: "Admin Role",
            href: "/users/list/admin",
            badgeColor: "default",
            badge: "10",
          },
          {
            key: "DevelopRole",
            label: "Develop Role",
            href: "/users/list/develop",
            badgeColor: "outline",
            badge: "20",
          },
        ],
      },
      {
        key: "Permission",
        label: "Permissions",
        href: "/users/permissions",
      },
    ],
  },
  {
    key: "Settings",
    label: "Settings",
    icon: Settings,
    children: [
      { key: "General", label: "General", href: "/settings/general" },
      { key: "Profile", label: "Profile", href: "/settings/profile" },
    ],
  },
];
