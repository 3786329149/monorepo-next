import { NextResponse } from "next/server";

export function success(data: any, message = "success") {
  return NextResponse.json({ code: 0, message, data });
}

export function fail(message = "failed", code = 1) {
  return NextResponse.json({ code, message });
}
