import { createUser, getUserList } from "#/db/repositories/userRepo";
import { fail, success } from "../utils";

export async function GET() {
  const list = await getUserList();
  return success(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.username || !body.password) return fail("用户名或密码不能为空");
  const created = await createUser(body);
  return success(created);
}
