"use client";

import { Moon } from "lucide-react";
import { DEPOSIT_RESUME_HOUR, isDepositPausedNow } from "@/lib/tickets";

/**
 * 야간(00:00–10:00 KST)에만 노출되는 안내 배너.
 * 이 시간대에는 관리자 확인·자동 만료가 멈추고 오전 10시부터 재개된다.
 * 야간이 아니면 아무것도 렌더하지 않으므로 호출부는 조건 없이 배치하면 된다.
 */
export function DepositPausedNotice({ className = "" }: { className?: string }) {
  if (!isDepositPausedNow()) return null;
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-line-strong bg-paper px-5 py-4 text-[13px] leading-relaxed text-muted ${className}`}
    >
      <Moon size={16} className="mt-0.5 shrink-0 text-ink" />
      <span>
        <b className="text-ink">야간에는 입금 확인이 잠시 멈춥니다.</b> 오전{" "}
        <b className="text-ink">{DEPOSIT_RESUME_HOUR}시</b>부터 순차적으로 확인되며, 그
        전까지 예약은 만료되지 않으니 안심하세요.
      </span>
    </div>
  );
}
