import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
  const status = new URL(request.url).searchParams.get("status");
  const { data, error } = await supabaseServer().rpc("admin_list_donations", {
    p_secret: adminSecret(),
    p_status: status || null,
  });
  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }
  return NextResponse.json({ donations: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: { action?: unknown; id?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { action, id } = body;
  if ((action !== "confirm" && action !== "cancel") || typeof id !== "string") {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const fn = action === "confirm" ? "admin_confirm_donation" : "admin_cancel_donation";
  const { data, error } = await supabaseServer().rpc(fn, {
    p_secret: adminSecret(),
    p_id: id,
  });
  if (error) {
    return NextResponse.json({ error: "처리에 실패했습니다." }, { status: 400 });
  }
  return NextResponse.json({ donation: data });
}
