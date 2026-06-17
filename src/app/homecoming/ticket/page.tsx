import type { Metadata } from "next";
import Link from "next/link";
import { ReserveForm } from "@/components/ticket/ReserveForm";
import { supabaseServer } from "@/lib/supabaseServer";
import type { TicketSettings } from "@/lib/tickets";
import { HC_EVENT } from "@/lib/homecoming";

export const metadata: Metadata = {
  title: "티켓 예약 · HOMECOMING DAY",
  description: "HIGHTHON : HOMECOMING DAY 티켓 예약 — 무통장 입금.",
};

// 잔여 좌석/가격이 실시간 반영되도록 매 요청 렌더
export const dynamic = "force-dynamic";

const FALLBACK: TicketSettings = {
  price: 0,
  capacity: 0,
  reserved: 0,
  remaining: 0,
  sold_out: true,
  bank_name: "",
  bank_account: "",
  bank_holder: "",
};

export default async function TicketPage() {
  const { data } = await supabaseServer().rpc("get_ticket_settings");
  const settings = (data as TicketSettings | null) ?? FALLBACK;

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <span className="eyebrow">Ticket · {HC_EVENT.dateFull}</span>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        홈커밍데이
        <br />
        <span className="text-stroke">티켓 예약.</span>
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        회원가입 없이 이메일과 전화번호만으로 예약하세요. 예약 시 부여되는 4자리
        번호로 입금하면 예약이 확정됩니다.
      </p>

      <div className="mt-10">
        <ReserveForm settings={settings} />
      </div>

      <p className="mt-6 text-center text-[13px] text-faint">
        이미 예약하셨나요?{" "}
        <Link href="/homecoming/ticket/check" className="text-ink underline underline-offset-4">
          예약 조회
        </Link>
      </p>
    </main>
  );
}
