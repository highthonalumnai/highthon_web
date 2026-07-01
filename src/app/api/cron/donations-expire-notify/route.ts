import { NextResponse } from "next/server";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";
import { sendDonationExpiredEmail } from "@/lib/email";
import type { Donation } from "@/lib/donations";

export const runtime = "nodejs";

/**
 * 만료 안내 메일 배치. Supabase pg_cron(+pg_net)이 주기적으로 이 엔드포인트를
 * Bearer CRON_SECRET 헤더와 함께 POST 호출한다.
 *
 * claim_expired_donation_notices RPC가 (1) 만료 기한이 지난 pending 후원을
 * expired로 확정하고 (2) 아직 안내하지 않은 만료 건을 원자적으로 claim해 반환한다.
 * 반환된 각 건에 대해 만료 안내 메일을 보낸다. 메일 실패는 로깅만 하고 계속 진행.
 */
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const { data, error } = await supabaseServer().rpc("claim_expired_donation_notices", {
    p_secret: adminSecret(),
  });
  if (error) {
    console.error("만료 후원 claim 실패:", error);
    return NextResponse.json({ error: "처리에 실패했습니다." }, { status: 500 });
  }

  const donations = (data ?? []) as Donation[];
  let sent = 0;
  let failed = 0;
  for (const donation of donations) {
    if (!donation.email) continue;
    try {
      await sendDonationExpiredEmail(donation);
      sent += 1;
    } catch (e) {
      // claim은 이미 반영됨 — 개별 메일 실패로 배치를 중단하지 않는다.
      console.error("만료 안내 이메일 발송 실패:", donation.id, e);
      failed += 1;
    }
  }

  return NextResponse.json({ claimed: donations.length, sent, failed });
}
