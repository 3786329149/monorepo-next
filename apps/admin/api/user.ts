// import { request } from "./request";

// export interface UserInfo {
//   id: string;
//   name: string;
//   roles: string[];
//   permissions: string[];
// }

// export interface MenuItem {
//   id: string;
//   key: string;
//   title: string;
//   path?: string;
//   icon?: any;
//   badge?: string | number;
//   badgeColor?: "default" | "destructive" | "secondary" | "outline";
//   permissions?: string[];
//   roles?: string[];
//   children?: MenuItem[];
// }

// // 获取用户信息
// export async function fetchUserInfo(): Promise<UserInfo> {
//   return request<UserInfo>("/api/user/info");
// }

// // 获取菜单
// export async function fetchUserMenus(): Promise<MenuItem[]> {
//   return request<MenuItem[]>("/api/user/menu");
// }
