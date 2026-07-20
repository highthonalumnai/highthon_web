import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";
import { sendTicketCancelledEmail } from "@/lib/email";
import type { Ticket, TicketStatus } from "@/lib/tickets";

export const runtime = "nodejs";

/**
 * 행사 취소 안내 메일 발송(관리자 전용).
 *
 * 안전장치: `code`(단건, 테스트용) 또는 `all: true`(대량)를 명시하지 않으면
 * 아무에게도 보내지 않는다(400). 이렇게 해서 실수로 전체 발송되는 일을 막는다.
 *
 * body: { code?: string; all?: boolean; statuses?: string[]; dryRun?: boolean }
 *  - code   지정 시 해당 예약번호 1건만 대상(상태 무관).
 *  - all    true 시 statuses(기본 ["confirmed"]) 상태의 예약 전체가 대상.
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
  const statuses: TicketStatus[] =
    Array.isArray(body.statuses) && body.statuses.length > 0
      ? (body.statuses.filter((s) => typeof s === "string") as TicketStatus[])
      : ["confirmed"];

  if (!code && !all) {
    return NextResponse.json(
      { error: "code 또는 all:true 중 하나를 지정해야 합니다." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("admin_list_tickets", {
    p_secret: adminSecret(),
    p_status: null,
  });
  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 });
  }

  const tickets = (data ?? []) as Ticket[];
  const targets = code
    ? tickets.filter((t) => t.code === code)
    : tickets.filter((t) => statuses.includes(t.status));

  if (targets.length === 0) {
    return NextResponse.json(
      { error: code ? `예약번호 ${code}를 찾을 수 없습니다.` : "대상 예약이 없습니다." },
      { status: 404 },
    );
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      total: targets.length,
      results: targets.map((t) => ({ code: t.code, email: t.email, status: t.status })),
    });
  }

  let sent = 0;
  let failed = 0;
  const results: { code: string; email: string; ok: boolean }[] = [];
  for (const ticket of targets) {
    if (!ticket.email) {
      failed += 1;
      results.push({ code: ticket.code, email: "", ok: false });
      continue;
    }
    try {
      await sendTicketCancelledEmail(ticket);
      sent += 1;
      results.push({ code: ticket.code, email: ticket.email, ok: true });
    } catch (e) {
      // 개별 메일 실패로 배치를 중단하지 않는다.
      console.error("취소 안내 이메일 발송 실패:", ticket.code, e);
      failed += 1;
      results.push({ code: ticket.code, email: ticket.email, ok: false });
    }
  }

  return NextResponse.json({ total: targets.length, sent, failed, results });
}
