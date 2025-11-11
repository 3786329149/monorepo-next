import { fail, success } from "#/app/api/utils";
import {
  createPermission,
  getPermissionList,
} from "#/db/repositories/permissionRepo";

export async function GET() {
  const list = await getPermissionList();
  return success(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.code) return fail("权限 code 不能为空");
  const created = await createPermission(body);
  return success(created);
}
