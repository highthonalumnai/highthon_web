"use client";

import { useState } from "react";
import { Countdown } from "./Countdown";
import { AFTERPARTY_FEE, formatWon, STATUS_META, type Ticket } from "@/lib/tickets";

const TONE: Record<string, string> = {
  wait: "border-line-strong bg-paper text-ink",
  ok: "border-ink bg-ink text-paper",
  dead: "border-line bg-surface/60 text-faint",
};

function TicketCard({ ticket }: { ticket: Ticket }) {
  const meta = STATUS_META[ticket.status];
  return (
    <div className={`rounded-2xl border p-6 ${TONE[meta.tone]}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest opacity-70">
          예약 번호 {ticket.code}
        </span>
        <span className="font-display text-sm font-bold">{meta.label}</span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed opacity-80">{meta.desc}</p>
      <p className="mt-2 text-[13px] font-medium opacity-70">
        {ticket.name} · {ticket.high_school}
        {ticket.afterparty && ` · 뒤풀이 참가 (참가비 +${formatWon(AFTERPARTY_FEE)})`}
      </p>

      {ticket.status === "pending" && (
        <div className="mt-4 space-y-2 border-t border-current/15 pt-4 text-[13px]">
          <div className="flex justify-between">
            <span className="opacity-60">입금 마감까지</span>
            <span className="font-display font-bold">
              <Countdown expiresAt={ticket.expires_at} />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-60">입금 금액</span>
            <span className="font-medium">{formatWon(ticket.amount)}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="opacity-60">입금 계좌</span>
            <span className="text-right font-medium">
              {ticket.bank_name} {ticket.bank_account} ({ticket.bank_holder})
            </span>
          </div>
        </div>
      )}

      {ticket.status === "confirmed" && (
        <div className="mt-4 flex justify-between border-t border-current/15 pt-4 text-[13px]">
          <span className="opacity-70">결제 금액</span>
          <span className="font-medium">{formatWon(ticket.amount)}</span>
        </div>
      )}
    </div>
  );
}

export function LookupForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Ticket[] | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, code }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "조회에 실패했습니다.");
        return;
      }
      setResult(json.tickets as Ticket[]);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="rounded-2xl border border-line bg-surface/60 p-7 sm:p-9">
        <div className="space-y-5">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">이메일</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">전화번호</span>
            <input
              type="tel"
              required
              inputMode="numeric"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              placeholder="01012345678"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
            <span className="mt-1.5 block text-[12px] text-faint">
              ‘-’ 없이 010으로 시작하는 숫자만 입력하세요 (예: 01012345678).
            </span>
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              예약 번호 (4자리)
            </span>
            <input
              type="text"
              required
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="0000"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 font-display text-lg font-bold tracking-[0.3em] outline-none transition focus:border-ink"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-50"
          >
            {loading ? "조회 중…" : "예약 조회"}
          </button>
        </div>
      </form>

      {result !== null && (
        <div className="mt-6 space-y-4">
          {result.length === 0 ? (
            <p className="rounded-2xl border border-line bg-surface/60 p-6 text-center text-sm text-muted">
              일치하는 예약이 없습니다. 이메일·전화번호·예약 번호를 다시 확인해 주세요.
            </p>
          ) : (
            result.map((t) => <TicketCard key={t.id} ticket={t} />)
          )}
        </div>
      )}
    </div>
  );
}
