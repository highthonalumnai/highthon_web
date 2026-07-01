"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowUpRight, Check, Copy, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/ticket/Countdown";
import { DepositPausedNotice } from "@/components/ticket/DepositPausedNotice";
import { formatWon, type TicketSettings } from "@/lib/tickets";
import { DONATION_MIN, type Donation } from "@/lib/donations";
import { HC_CONTACT } from "@/lib/homecoming";

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

export function HcDonation({ settings }: { settings: TicketSettings }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [attend, setAttend] = useState(false);
  const [afterparty, setAfterparty] = useState(false);
  const [wantsBenefit, setWantsBenefit] = useState(false);
  const [benefit, setBenefit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donation, setDonation] = useState<Donation | null>(null);

  const soldOut = settings.sold_out;

  function reset() {
    setDonation(null);
    setName("");
    setEmail("");
    setPhone("");
    setAmount("");
    setAttend(false);
    setAfterparty(false);
    setWantsBenefit(false);
    setBenefit("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/donations/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          amount: Number(amount),
          attend,
          afterparty,
          wants_benefit: wantsBenefit,
          benefit,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "후원에 실패했습니다.");
        return;
      }
      setDonation(json.donation as Donation);
      track("donation_submit");
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="donation" className="bg-surface/40 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-2 text-ink">
            <HeartHandshake size={18} />
            <span className="eyebrow">Individual Support · 개인 후원</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            개인 후원으로
            <br />
            <span className="text-stroke">함께 만들어요.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
            최소 {formatWon(DONATION_MIN)}부터 개인 후원에 참여할 수 있습니다. 현장 참여를
            선택하면 티켓 좌석 1개가 배정되며, 원하시는 혜택을 적어 주시면 담당자가 확인 후
            이메일로 안내드립니다.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10">
            {donation ? (
              <DonationResult donation={donation} onReset={reset} />
            ) : (
              <form
                onSubmit={submit}
                className="rounded-2xl border border-line bg-paper p-7 sm:p-9"
              >
                <div className="space-y-5">
                  <label className="block">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      이름
                    </span>
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
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      이메일
                    </span>
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
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">
                      전화번호
                    </span>
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
                      후원 금액 (원)
                    </span>
                    <input
                      type="number"
                      required
                      inputMode="numeric"
                      min={DONATION_MIN}
                      step={1000}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={String(DONATION_MIN)}
                      className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
                    />
                    <span className="mt-1.5 block text-[12px] text-faint">
                      최소 {formatWon(DONATION_MIN)}부터 후원할 수 있습니다.
                    </span>
                  </label>

                  <label
                    className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 text-[13px] leading-relaxed transition ${
                      soldOut
                        ? "cursor-not-allowed border-line bg-surface/60 text-faint"
                        : "cursor-pointer border-line bg-paper text-muted hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={attend && !soldOut}
                      disabled={soldOut}
                      onChange={(e) => setAttend(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-ink disabled:opacity-40"
                    />
                    <span>
                      <b className="text-ink">현장 참여</b>
                      {soldOut ? (
                        <span className="ml-1 text-faint">(좌석 마감)</span>
                      ) : (
                        <span className="ml-1 text-faint">(잔여 {settings.remaining}석)</span>
                      )}
                      <br />
                      현장에 참여합니다. 선택 시 티켓 좌석 1개가 배정되어 별도 티켓 예약이
                      필요하지 않습니다.
                    </span>
                  </label>

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

                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-paper px-4 py-3.5 text-[13px] leading-relaxed text-muted transition hover:border-ink/40">
                    <input
                      type="checkbox"
                      checked={wantsBenefit}
                      onChange={(e) => setWantsBenefit(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-ink"
                    />
                    <span>
                      <b className="text-ink">원하는 혜택이 있어요</b>
                      <br />
                      후원에 대해 원하시는 혜택을 적어 주시면 담당자가 확인 후 이메일로
                      연락드립니다.
                    </span>
                  </label>

                  {wantsBenefit && (
                    <label className="block">
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">
                        원하는 혜택
                      </span>
                      <textarea
                        required
                        rows={3}
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value)}
                        placeholder="예: 키노트에서 후원자 소개, 부스 운영, 채용 홍보 등"
                        className="mt-2 w-full resize-y rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
                      />
                    </label>
                  )}

                  {error && (
                    <p className="rounded-lg border border-line bg-surface/60 px-4 py-3 text-sm text-ink">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-50"
                  >
                    {loading ? "처리 중…" : "개인 후원 신청"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DonationResult({
  donation,
  onReset,
}: {
  donation: Donation;
  onReset: () => void;
}) {
  // 혜택 요청 건은 코드 없이 관리자 확인 → 이메일 커뮤니케이션
  const reviewing = donation.wants_benefit || !donation.code;

  return (
    <div className="rounded-2xl border border-line bg-paper p-7 sm:p-9">
      <span className="eyebrow">{reviewing ? "후원 신청 접수" : "후원 신청 완료"}</span>
      <h3 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
        {reviewing
          ? "담당자가 확인 후 연락드립니다."
          : "입금하면 후원이 확정됩니다."}
      </h3>

      {reviewing ? (
        <p className="mt-5 text-[14px] leading-relaxed text-muted">
          소중한 후원 신청을 보내주셔서 감사합니다. 담당자가 확인 후{" "}
          <b className="text-ink">{HC_CONTACT.email}</b> 에서 입력하신 이메일{" "}
          <b className="text-ink">{donation.email}</b> 로 혜택과 입금 방법을
          안내드리겠습니다.
        </p>
      ) : (
        <div className="mt-7 rounded-xl border border-line-strong bg-ink p-6 text-center text-paper">
          <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            후원 번호 · 입금자명에 입력
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold tracking-[0.2em] sm:text-6xl">
            {donation.code}
          </p>
        </div>
      )}

      {!reviewing && donation.expires_at && <DepositPausedNotice className="mt-5" />}

      {!reviewing && donation.expires_at && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-surface/60 px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-widest text-faint">
            입금 마감까지
          </span>
          <span className="font-display text-2xl font-extrabold">
            <Countdown expiresAt={donation.expires_at} />
          </span>
        </div>
      )}

      <dl className="mt-5 space-y-3 rounded-xl border border-line bg-surface/40 p-5 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-faint">후원 금액</dt>
          <dd className="font-display text-lg font-bold">{formatWon(donation.amount)}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
          <dt className="text-faint">현장 참여</dt>
          <dd className="font-medium text-ink">{donation.attend ? "참여" : "미참여"}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
          <dt className="text-faint">뒤풀이</dt>
          <dd className="font-medium text-ink">{donation.afterparty ? "참가" : "미참가"}</dd>
        </div>
        {donation.wants_benefit && donation.benefit && (
          <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
            <dt className="shrink-0 text-faint">희망 혜택</dt>
            <dd className="whitespace-pre-wrap text-right font-medium text-ink">
              {donation.benefit}
            </dd>
          </div>
        )}
        {!reviewing && (
          <>
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <dt className="text-faint">입금 계좌</dt>
              <dd className="flex items-center gap-3 text-right">
                <span className="font-medium text-ink">
                  {donation.bank_name} {donation.bank_account}
                </span>
                <CopyButton value={donation.bank_account} />
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <dt className="text-faint">예금주</dt>
              <dd className="font-medium text-ink">{donation.bank_holder}</dd>
            </div>
          </>
        )}
      </dl>

      {!reviewing && (
        <p className="mt-5 text-[13px] leading-relaxed text-muted">
          · <b className="text-ink">입금자명</b>을 반드시 후원 번호{" "}
          <b className="text-ink">{donation.code}</b> 로 입력해 주세요.
          <br />· 입금 확인은 최대 1시간이 걸리며, 1시간 내 미입금 시 신청은 자동 취소됩니다.
        </p>
      )}

      <div className="mt-7">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
        >
          새 후원 신청
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
