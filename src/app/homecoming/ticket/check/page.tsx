import type { Metadata } from "next";
import Link from "next/link";
import { LookupForm } from "@/components/ticket/LookupForm";

export const metadata: Metadata = {
  title: "예약 조회 · HOMECOMING DAY",
  description: "HIGHTHON : HOMECOMING DAY 티켓 예약 내역 조회.",
};

export default function TicketCheckPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <span className="eyebrow">Reservation Lookup</span>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        예약 내역
        <br />
        <span className="text-stroke">조회.</span>
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        예약 시 입력한 이메일·전화번호와 부여받은 4자리 예약 번호를 입력하면 예약
        상태를 확인할 수 있습니다.
      </p>

      <div className="mt-10">
        <LookupForm />
      </div>

      <p className="mt-6 text-center text-[13px] text-faint">
        아직 예약 전이신가요?{" "}
        <Link href="/homecoming/ticket" className="text-ink underline underline-offset-4">
          티켓 예약
        </Link>
      </p>
    </main>
  );
}
