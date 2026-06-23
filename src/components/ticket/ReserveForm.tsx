"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Landmark } from "lucide-react";
import { Countdown } from "./Countdown";
import {
  YEARS_OPTIONS,
  formatWon,
  type Ticket,
  type TicketSettings,
} from "@/lib/tickets";
import { HC_EVENT } from "@/lib/homecoming";

function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-ink"
      aria-label="복사"
    >
      {done ? <Check size={13} /> : <Copy size={13} />}
      {done ? "복사됨" : "복사"}
    </button>
  );
}

export function ReserveForm({ settings }: { settings: TicketSettings }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [highSchool, setHighSchool] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [years, setYears] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [afterparty, setAfterparty] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  const soldOut = settings.sold_out;
  const total = settings.price;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!agree) {
      setError("안내 사항에 동의해 주세요.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tickets/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          name,
          high_school: highSchool,
          afterparty,
          job_role: jobRole,
          years,
          affiliation,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "예약에 실패했습니다.");
        return;
      }
      setTicket(json.ticket as Ticket);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (ticket) {
    const already = ticket.status === "confirmed";
    return (
      <div className="rounded-2xl border border-line bg-surface/60 p-7 sm:p-9">
        <span className="eyebrow">{already ? "이미 확정된 예약" : "예약 완료"}</span>
        <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          {already ? "예약이 확정되어 있어요." : "입금하면 예약이 확정됩니다."}
        </h2>

        {/* 예약 번호 */}
        <div className="mt-7 rounded-xl border border-line-strong bg-ink p-6 text-center text-paper">
          <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            예약 번호 · 입금자명에 입력
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-[0.2em] sm:text-6xl">
            {ticket.code}
          </p>
        </div>

        {!already && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-paper px-5 py-4">
            <span className="font-mono text-xs uppercase tracking-widest text-faint">
              입금 마감까지
            </span>
            <span className="font-display text-2xl font-extrabold">
              <Countdown expiresAt={ticket.expires_at} />
            </span>
          </div>
        )}

        {/* 입금 정보 */}
        <dl className="mt-5 space-y-3 rounded-xl border border-line bg-paper p-5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-faint">입금 금액</dt>
            <dd className="font-display text-lg font-bold">{formatWon(ticket.amount)}</dd>
          </div>
          {ticket.afterparty && (
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <dt className="text-faint">뒤풀이</dt>
              <dd className="font-medium text-ink">참가</dd>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
            <dt className="text-faint">입금 계좌</dt>
            <dd className="flex items-center gap-3 text-right">
              <span className="font-medium text-ink">
                {ticket.bank_name} {ticket.bank_account}
              </span>
              <CopyButton value={ticket.bank_account} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
            <dt className="text-faint">예금주</dt>
            <dd className="font-medium text-ink">{ticket.bank_holder}</dd>
          </div>
        </dl>

        {!already && (
          <p className="mt-5 text-[13px] leading-relaxed text-muted">
            · <b className="text-ink">입금자명</b>을 반드시 예약 번호{" "}
            <b className="text-ink">{ticket.code}</b> 로 입력해 주세요.
            <br />· 입금 확인은 최대 1시간이 걸리며, 1시간 내 미입금 시 예약은 자동
            취소됩니다.
            <br />· 입력하신 이메일·전화번호와 예약 번호로 예약 상태를 조회할 수 있습니다.
            {ticket.afterparty && (
              <>
                <br />· 뒤풀이 참가비는 <b className="text-ink">수요 예측 후</b> 추가 입금 안내
                메일을 보내드립니다. (위 입금 금액에 미포함)
              </>
            )}
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/homecoming/ticket/check"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c]"
          >
            예약 조회하기
            <ArrowUpRight size={15} />
          </Link>
          <button
            type="button"
            onClick={() => {
              setTicket(null);
              setName("");
              setEmail("");
              setPhone("");
              setHighSchool("");
              setJobRole("");
              setYears("");
              setAffiliation("");
              setAfterparty(false);
              setAgree(false);
            }}
            className="inline-flex items-center rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
          >
            새 예약
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-surface/60 p-7 sm:p-9">
      <div className="flex items-center gap-2 text-ink">
        <Landmark size={18} />
        <span className="eyebrow">무통장 입금 예약</span>
      </div>

      {/* summary */}
      <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-5 text-center">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">일시</dt>
          <dd className="mt-1 font-display text-sm font-bold">{HC_EVENT.dateShort}</dd>
        </div>
        <div className="border-x border-line">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">금액</dt>
          <dd className="mt-1 font-display text-sm font-bold">{formatWon(total)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">잔여</dt>
          <dd className="mt-1 font-display text-sm font-bold">
            {soldOut ? "마감" : `${settings.remaining}석`}
          </dd>
        </div>
      </dl>

      {soldOut ? (
        <p className="mt-6 rounded-xl border border-line bg-paper p-5 text-center text-sm text-muted">
          예약이 마감되었습니다.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">이름</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
          </label>
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
              졸업 고등학교
            </span>
            <input
              type="text"
              required
              value={highSchool}
              onChange={(e) => setHighSchool(e.target.value)}
              placeholder="OO고등학교"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">직무</span>
            <input
              type="text"
              required
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="예: 백엔드 개발자"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">연차</span>
            <select
              required
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={`mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink ${
                years ? "text-ink" : "text-faint"
              }`}
            >
              <option value="" disabled>
                선택해 주세요
              </option>
              {YEARS_OPTIONS.map((y) => (
                <option key={y} value={y} className="text-ink">
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">소속</span>
            <input
              type="text"
              required
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              placeholder="예: OO회사 / OO대학교"
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
            />
          </label>
          <p className="rounded-lg border border-line bg-paper px-4 py-3 text-[12px] leading-relaxed text-faint">
            입력하신 <b className="text-muted">직무·연차·소속</b>은 원활한 네트워킹을 위해
            운영진만 활용하며, 다른 참가자에게는 공개되지 않습니다.
          </p>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-paper px-4 py-3.5 text-[13px] leading-relaxed text-muted transition hover:border-ink/40">
            <input
              type="checkbox"
              checked={afterparty}
              onChange={(e) => setAfterparty(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-ink"
            />
            <span>
              <b className="text-ink">뒤풀이 참가</b>
              <br />
              뒤풀이 참가비는 수요 예측 후 별도로 안내드리며, 추가 입금 방법은{" "}
              <b className="text-ink">이메일</b>로 보내드립니다.
            </span>
          </label>

          <label className="flex items-start gap-3 text-[13px] leading-relaxed text-muted">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-ink"
            />
            <span>
              예약 시 부여되는 4자리 번호를 <b className="text-ink">입금자명</b>으로
              입력하고, <b className="text-ink">1시간 이내</b> 미입금 시 예약이 자동
              취소됨에 동의합니다.
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-50"
          >
            {loading ? "예약 중…" : "예약하고 입금 정보 받기"}
          </button>
        </div>
      )}
    </form>
  );
}
