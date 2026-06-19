import { NextResponse } from "next/server";
import { reserveSchema, RESERVE_ERRORS } from "@/lib/tickets";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = reserveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("reserve_ticket", {
    p_email: parsed.data.email,
    p_phone: parsed.data.phone,
    p_name: parsed.data.name,
    p_high_school: parsed.data.high_school,
    p_afterparty: parsed.data.afterparty,
    p_job_role: parsed.data.job_role,
    p_years: parsed.data.years,
    p_affiliation: parsed.data.affiliation,
  });

  if (error) {
    const key = (error.message || "").trim();
    const friendly = RESERVE_ERRORS[key] ?? "예약 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ error: friendly }, { status: key === "SOLD_OUT" ? 409 : 400 });
  }

  return NextResponse.json({ ticket: data });
}
