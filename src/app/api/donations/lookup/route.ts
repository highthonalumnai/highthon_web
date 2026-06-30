import { NextResponse } from "next/server";
import { lookupSchema } from "@/lib/tickets";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = lookupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("lookup_donations", {
    p_email: parsed.data.email,
    p_phone: parsed.data.phone,
    p_code: parsed.data.code,
  });

  if (error) {
    return NextResponse.json({ error: "조회 중 오류가 발생했습니다." }, { status: 400 });
  }

  return NextResponse.json({ donations: data ?? [] });
}
