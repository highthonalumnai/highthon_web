import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";
import { sendDonationConfirmedEmail } from "@/lib/email";
import type { Donation } from "@/lib/donations";

export const runtime = "nodejs";

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
  if (
    (action !== "confirm" && action !== "cancel" && action !== "issue_code") ||
    typeof id !== "string"
  ) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const fn =
    action === "confirm"
      ? "admin_confirm_donation"
      : action === "cancel"
        ? "admin_cancel_donation"
        : "admin_issue_donation_code";
  const { data, error } = await supabaseServer().rpc(fn, {
    p_secret: adminSecret(),
    p_id: id,
  });
  if (error) {
    return NextResponse.json({ error: "처리에 실패했습니다." }, { status: 400 });
  }

  const donation = (Array.isArray(data) ? data[0] : data) as Donation | null;

  let emailSent: boolean | undefined;
  if (action === "confirm" && donation?.email) {
    try {
      await sendDonationConfirmedEmail(donation);
      emailSent = true;
    } catch (e) {
      // 확정은 이미 DB에 반영됨 — 이메일 실패로 응답을 실패시키지 않는다.
      console.error("후원 확정 이메일 발송 실패:", e);
      emailSent = false;
    }
  }

  return NextResponse.json({ donation: data, ...(emailSent === undefined ? {} : { emailSent }) });
}
