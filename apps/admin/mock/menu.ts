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
    label: "Dashboard",
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
        key: "user-list",
        label: "User List",
        href: "/users/list",
        badgeColor: "destructive",
        badge: "update",
        children: [
          {
            key: "user-list-admin",
            label: "Admin Role",
            href: "/users/list/admin",
            badgeColor: "default",
            badge: "10",
          },
          {
            key: "user-list-developer",
            label: "Develop Role",
            href: "/users/list/develop",
            badgeColor: "outline",
            badge: "20",
          },
        ],
      },
      {
        key: "user-permission",
        label: "Permissions",
        href: "/users/permissions",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { key: "general", label: "General", href: "/settings/general" },
      { key: "profile", label: "Profile", href: "/settings/profile" },
    ],
  },
];
