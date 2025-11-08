import { request } from "./request";

export interface Department {
  id: number;
  name: string;
  manager?: string;
  children?: Department[];
}

// 获取部门信息
export async function fetchDepartments(): Promise<Department[]> {
  return request<Department[]>("/api/departments");
}
