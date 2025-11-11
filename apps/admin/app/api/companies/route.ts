import { fail, success } from "#/app/api/utils";
import { createCompany, getCompanyList } from "#/db/repositories/companyRepo";

export async function GET() {
  const list = await getCompanyList();
  return success(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name) return fail("公司名称不能为空");
  const created = await createCompany(body);
  return success(created);
}
