import { fail, success } from "#/app/api/utils";
import { createMenu, getMenuList } from "#/db/repositories/menuRepo";

export async function GET() {
  const list = await getMenuList();
  return success(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.path) return fail("菜单名或路径不能为空");
  const created = await createMenu(body);
  return success(created);
}
