import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";
import { sendDonationCancelledEmail } from "@/lib/email";
import type { Donation, DonationStatus } from "@/lib/donations";

export const runtime = "nodejs";

/**
 * 개인 후원자 대상 행사 취소 안내 메일 발송(관리자 전용).
 * 티켓용 /api/admin/tickets/notify-cancel 과 동일한 규약.
 *
 * 안전장치: `code`(단건, 테스트용) 또는 `all: true`(대량)를 명시하지 않으면
 * 아무에게도 보내지 않는다(400).
 *
 * body: { code?: string; all?: boolean; statuses?: string[]; dryRun?: boolean }
 *  - code   지정 시 해당 후원 번호 1건만 대상(상태 무관).
 *  - all    true 시 statuses(기본 ["confirmed"]) 상태의 후원 전체가 대상.
 *  - dryRun true 시 실제 발송 없이 대상만 반환.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: {
    code?: unknown;
    all?: unknown;
    statuses?: unknown;
    dryRun?: unknown;
  } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim() : undefined;
  const all = body.all === true;
  const dryRun = body.dryRun === true;
  const statuses: DonationStatus[] =
    Array.isArray(body.statuses) && body.statuses.length > 0
      ? (body.statuses.filter((s) => typeof s === "string") as DonationStatus[])
      : ["confirmed"];

  if (!code && !all) {
    return NextResponse.json(
      { error: "code 또는 all:true 중 하나를 지정해야 합니다." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("admin_list_donations", {
    p_secret: adminSecret(),
    p_status: null,
  });
  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }

  const donations = (data ?? []) as Donation[];
  const targets = code
    ? donations.filter((d) => d.code === code)
    : donations.filter((d) => statuses.includes(d.status));

  if (targets.length === 0) {
    return NextResponse.json(
      { error: code ? `후원 번호 ${code}를 찾을 수 없습니다.` : "대상 후원이 없습니다." },
      { status: 404 },
    );
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      total: targets.length,
      results: targets.map((d) => ({ code: d.code, email: d.email, status: d.status })),
    });
  }

  let sent = 0;
  let failed = 0;
  const results: { code: string | null; email: string; ok: boolean }[] = [];
  for (const donation of targets) {
    if (!donation.email) {
      failed += 1;
      results.push({ code: donation.code, email: "", ok: false });
      continue;
    }
    try {
      await sendDonationCancelledEmail(donation);
      sent += 1;
      results.push({ code: donation.code, email: donation.email, ok: true });
    } catch (e) {
      // 개별 메일 실패로 배치를 중단하지 않는다.
      console.error("후원 취소 안내 이메일 발송 실패:", donation.code, e);
      failed += 1;
      results.push({ code: donation.code, email: donation.email, ok: false });
    }
  }

  return NextResponse.json({ total: targets.length, sent, failed, results });
}
