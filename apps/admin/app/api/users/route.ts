import { NextResponse } from "next/server";
import { getUserList, createUser } from "#/services/user.service";

export async function GET() {
  try {
    const data = await getUserList();
    return NextResponse.json({ code: 0, message: "success", data });
  } catch (e: any) {
    return NextResponse.json({ code: 1, message: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await createUser(body);
    return NextResponse.json({ code: 0, message: "created", data });
  } catch (e: any) {
    return NextResponse.json({ code: 1, message: e.message }, { status: 500 });
  }
}
