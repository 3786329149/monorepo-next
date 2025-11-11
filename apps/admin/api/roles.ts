import { api } from "./request";

export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions?: string[];
  createdAt?: string;
}

export async function fetchRoles() {
  const res = await api.get<Role[]>("/api/roles");
  return res.data || [];
}

export async function fetchRole(id: number) {
  const res = await api.get<Role>(`/api/roles/${id}`);
  return res.data;
}

export async function createRole(role: Omit<Role, "id">) {
  const res = await api.post<Role>("/api/roles", role);
  return res.data!;
}
