import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "#/services/user.service";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await getUserById(Number(params.id));
  return NextResponse.json({ code: 0, data });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const data = await updateUser(Number(params.id), body);
  return NextResponse.json({ code: 0, data });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const data = await deleteUser(Number(params.id));
  return NextResponse.json({ code: 0, data });
}
