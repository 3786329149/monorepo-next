import {
  createDepartment,
  getDepartmentList,
} from "#/db/repositories/departmentRepo";

import { fail, success } from "../utils";

export async function GET() {
  const list = await getDepartmentList();
  return success(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name) return fail("部门名称不能为空");
  const created = await createDepartment(body);
  return success(created);
}
