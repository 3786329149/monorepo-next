import type { Role } from "#/types/role";
import { request } from "./request";

// 获取部门信息
export async function fetchRoles(): Promise<Role[]> {
  return request<Role[]>("/api/roles");
}

export async function createRole(data: Omit<Role, "id">): Promise<Role> {
  return request<Role>("/api/roles", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
