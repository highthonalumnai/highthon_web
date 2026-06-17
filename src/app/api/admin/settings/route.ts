import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/adminAuth";
import { adminSecret, supabaseServer } from "@/lib/supabaseServer";

const settingsSchema = z.object({
  price: z.coerce.number().int().min(0).max(100_000_000),
  capacity: z.coerce.number().int().min(0).max(100_000),
  bank_name: z.string().trim().min(1).max(50),
  bank_account: z.string().trim().min(1).max(50),
  bank_holder: z.string().trim().min(1).max(50),
});

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
  const { data, error } = await supabaseServer().rpc("get_ticket_settings");
  if (error) {
    return NextResponse.json({ error: "설정을 불러오지 못했습니다." }, { status: 500 });
  }
  return NextResponse.json({ settings: data });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer().rpc("admin_update_settings", {
    p_secret: adminSecret(),
    p_price: parsed.data.price,
    p_capacity: parsed.data.capacity,
    p_bank_name: parsed.data.bank_name,
    p_bank_account: parsed.data.bank_account,
    p_bank_holder: parsed.data.bank_holder,
  });
  if (error) {
    return NextResponse.json({ error: "설정 저장에 실패했습니다." }, { status: 400 });
  }
  return NextResponse.json({ settings: data });
}
