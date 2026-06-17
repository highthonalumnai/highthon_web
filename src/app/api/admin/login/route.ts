import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, signSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  let body: { password?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    /* ignore */
  }

  if (typeof body.password !== "string" || !checkPassword(body.password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return res;
}
