import { NextResponse } from "next/server";

// mock 部门数据
const departments = [
  {
    id: 1,
    name: "技术部",
    manager: "Ann",
    children: [
      { id: 2, name: "前端组", manager: "Jimmy" },
      { id: 3, name: "后端组", manager: "Tom" },
    ],
  },
  {
    id: 4,
    name: "市场部",
    manager: "Lucy",
    children: [],
  },
];

// GET /api/departments
export async function GET() {
  return NextResponse.json({ code: 0, data: departments });
}

// POST /api/departments
export async function POST(req: Request) {
  const body = await req.json();
  const newDept = { id: Date.now(), ...body };
  departments.push(newDept);
  return NextResponse.json({
    code: 0,
    message: "success",
    data: newDept,
  });
}
