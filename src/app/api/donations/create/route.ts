import { NextResponse } from "next/server";
import { donationSchema, DONATION_ERRORS } from "@/lib/donations";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("create_donation", {
    p_name: parsed.data.name,
    p_email: parsed.data.email,
    p_phone: parsed.data.phone,
    p_amount: parsed.data.amount,
    p_attend: parsed.data.attend,
    p_afterparty: parsed.data.afterparty,
    p_wants_benefit: parsed.data.wants_benefit,
    p_benefit: parsed.data.benefit,
  });

  if (error) {
    const key = (error.message || "").trim();
    const friendly = DONATION_ERRORS[key] ?? "후원 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ error: friendly }, { status: key === "SOLD_OUT" ? 409 : 400 });
  }

  return NextResponse.json({ donation: data });
}
