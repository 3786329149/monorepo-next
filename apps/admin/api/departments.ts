// import { request } from "./request";

import { api } from "./request";

// 获取部门信息
export async function fetchDepartments() {
  return await api.get("/api/departments");
}
