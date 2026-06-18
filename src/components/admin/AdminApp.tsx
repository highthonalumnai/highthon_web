"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, LogOut, RefreshCw, X } from "lucide-react";
import {
  formatPhone,
  formatWon,
  STATUS_META,
  type Ticket,
  type TicketSettings,
} from "@/lib/tickets";
import type { Donation } from "@/lib/donations";

type Settings = Pick<
  TicketSettings,
  "price" | "capacity" | "reserved" | "remaining" | "bank_name" | "bank_account" | "bank_holder"
>;

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "로그인에 실패했습니다.");
        return;
      }
      onSuccess();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <span className="eyebrow">Homecoming · Admin</span>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
        관리자 로그인
      </h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-ink"
        />
        {error && (
          <p className="rounded-lg border border-line bg-surface/60 px-4 py-3 text-sm text-ink">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-50"
        >
          {loading ? "확인 중…" : "로그인"}
        </button>
      </form>
    </main>
  );
}

function SettingsPanel({
  settings,
  onSaved,
}: {
  settings: Settings;
  onSaved: (s: Settings) => void;
}) {
  const [form, setForm] = useState({
    price: String(settings.price),
    capacity: String(settings.capacity),
    bank_name: settings.bank_name,
    bank_account: settings.bank_account,
    bank_holder: settings.bank_holder,
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json();
      if (!res.ok) {
        setMsg(j.error ?? "저장 실패");
        return;
      }
      onSaved(j.settings as Settings);
      setMsg("저장되었습니다.");
    } catch {
      setMsg("네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  const field = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={save} className="rounded-2xl border border-line bg-surface/60 p-6">
      <h2 className="font-display text-lg font-bold">행사 설정</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
            티켓 금액 (원)
          </span>
          <input
            type="number"
            min={0}
            value={form.price}
            onChange={field("price")}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
            정원 (명)
          </span>
          <input
            type="number"
            min={0}
            value={form.capacity}
            onChange={field("capacity")}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">은행</span>
          <input
            value={form.bank_name}
            onChange={field("bank_name")}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">예금주</span>
          <input
            value={form.bank_holder}
            onChange={field("bank_holder")}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">계좌번호</span>
          <input
            value={form.bank_account}
            onChange={field("bank_account")}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-ink px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-50"
        >
          {saving ? "저장 중…" : "설정 저장"}
        </button>
        {msg && <span className="text-sm text-muted">{msg}</span>}
      </div>
    </form>
  );
}

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const meta = STATUS_META[status];
  const tone =
    meta.tone === "ok"
      ? "bg-ink text-paper"
      : meta.tone === "wait"
        ? "border border-line-strong text-ink"
        : "border border-line text-faint";
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${tone}`}>
      {meta.label}
    </span>
  );
}

function Row({
  t,
  onAction,
  busy,
}: {
  t: Ticket;
  onAction: (id: string, action: "confirm" | "cancel") => void;
  busy: boolean;
}) {
  return (
    <tr className="border-t border-line align-middle">
      <td className="py-3 pr-3 font-display text-lg font-extrabold tracking-widest">{t.code}</td>
      <td className="py-3 pr-3"><StatusBadge status={t.status} /></td>
      <td className="py-3 pr-3 text-sm">
        <div className="font-medium text-ink">
          {t.name} <span className="font-normal text-muted">· {t.high_school}</span>
        </div>
        <div className="text-ink">{t.email}</div>
        <div className="text-faint">{formatPhone(t.phone)}</div>
      </td>
      <td className="py-3 pr-3 text-sm text-muted">{formatWon(t.amount)}</td>
      <td className="py-3 pr-3 text-right">
        <div className="inline-flex gap-2">
          {t.status !== "confirmed" && (
            <button
              onClick={() => onAction(t.id, "confirm")}
              disabled={busy}
              title="입금 확인"
              className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-40"
            >
              <Check size={12} /> 입금확인
            </button>
          )}
          {t.status !== "cancelled" && (
            <button
              onClick={() => onAction(t.id, "cancel")}
              disabled={busy}
              title="예약 취소"
              className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper disabled:opacity-40"
            >
              <X size={12} /> 취소
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function DonationRow({
  d,
  onAction,
  busy,
}: {
  d: Donation;
  onAction: (id: string, action: "confirm" | "cancel") => void;
  busy: boolean;
}) {
  return (
    <tr className="border-t border-line align-top">
      <td className="py-3 pr-3">
        <div className="font-display text-lg font-extrabold tracking-widest">
          {d.code ?? "—"}
        </div>
        {d.wants_benefit && (
          <span className="mt-1 inline-block rounded-full border border-line-strong px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink">
            혜택요청
          </span>
        )}
      </td>
      <td className="py-3 pr-3"><StatusBadge status={d.status} /></td>
      <td className="py-3 pr-3 text-sm">
        <div className="font-medium text-ink">
          {d.name}
          {d.attend && (
            <span className="ml-1.5 font-normal text-muted">· 현장참여</span>
          )}
        </div>
        <div className="text-ink">{d.email}</div>
        <div className="text-faint">{formatPhone(d.phone)}</div>
        {d.wants_benefit && d.benefit && (
          <div className="mt-1 max-w-xs whitespace-pre-wrap text-[13px] text-muted">
            희망 혜택: {d.benefit}
          </div>
        )}
      </td>
      <td className="py-3 pr-3 text-sm text-muted">{formatWon(d.amount)}</td>
      <td className="py-3 pr-3 text-right">
        <div className="inline-flex gap-2">
          {d.status !== "confirmed" && (
            <button
              onClick={() => onAction(d.id, "confirm")}
              disabled={busy}
              title="입금 확인"
              className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-paper transition hover:bg-[#2c2c2c] disabled:opacity-40"
            >
              <Check size={12} /> 입금확인
            </button>
          )}
          {d.status !== "cancelled" && (
            <button
              onClick={() => onAction(d.id, "cancel")}
              disabled={busy}
              title="후원 취소"
              className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper disabled:opacity-40"
            >
              <X size={12} /> 취소
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

const FILTERS = [
  { key: "", label: "전체" },
  { key: "pending", label: "대기" },
  { key: "confirmed", label: "확정" },
  { key: "cancelled", label: "취소" },
  { key: "expired", label: "만료" },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donFilter, setDonFilter] = useState("");
  const [donLoading, setDonLoading] = useState(true);
  const [donBusyId, setDonBusyId] = useState<string | null>(null);

  const load = useCallback(async (status: string) => {
    setLoading(true);
    const qs = status ? `?status=${status}` : "";
    const [tRes, sRes] = await Promise.all([
      fetch(`/api/admin/tickets${qs}`),
      fetch("/api/admin/settings"),
    ]);
    if (tRes.ok) setTickets((await tRes.json()).tickets as Ticket[]);
    if (sRes.ok) setSettings((await sRes.json()).settings as Settings);
    setLoading(false);
  }, []);

  const loadDonations = useCallback(async (status: string) => {
    setDonLoading(true);
    const qs = status ? `?status=${status}` : "";
    const res = await fetch(`/api/admin/donations${qs}`);
    if (res.ok) setDonations((await res.json()).donations as Donation[]);
    setDonLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const qs = filter ? `?status=${filter}` : "";
      const [tRes, sRes] = await Promise.all([
        fetch(`/api/admin/tickets${qs}`),
        fetch("/api/admin/settings"),
      ]);
      if (!active) return;
      if (tRes.ok) setTickets((await tRes.json()).tickets as Ticket[]);
      if (sRes.ok) setSettings((await sRes.json()).settings as Settings);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [filter]);

  useEffect(() => {
    let active = true;
    (async () => {
      const qs = donFilter ? `?status=${donFilter}` : "";
      const res = await fetch(`/api/admin/donations${qs}`);
      if (!active) return;
      if (res.ok) setDonations((await res.json()).donations as Donation[]);
      setDonLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [donFilter]);

  async function action(id: string, act: "confirm" | "cancel") {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: act, id }),
      });
      // 후원 현장참여 좌석이 잔여석에 영향을 주므로 설정도 갱신
      if (res.ok) await load(filter);
    } finally {
      setBusyId(null);
    }
  }

  async function donationAction(id: string, act: "confirm" | "cancel") {
    setDonBusyId(id);
    try {
      const res = await fetch("/api/admin/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: act, id }),
      });
      if (res.ok) {
        await Promise.all([loadDonations(donFilter), load(filter)]);
      }
    } finally {
      setDonBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    onLogout();
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="eyebrow">Homecoming · Admin</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            티켓 관리
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              load(filter);
              loadDonations(donFilter);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition hover:bg-ink hover:text-paper"
          >
            <RefreshCw size={13} /> 새로고침
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition hover:text-ink"
          >
            <LogOut size={13} /> 로그아웃
          </button>
        </div>
      </div>

      {settings && (
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: "예약(대기+확정)", value: `${settings.reserved} / ${settings.capacity}` },
            { label: "잔여석", value: `${settings.remaining}` },
            { label: "현재 금액", value: formatWon(settings.price) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-surface/60 p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                {s.label}
              </div>
              <div className="mt-1 font-display text-2xl font-extrabold">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {settings && (
        <div className="mt-6">
          <SettingsPanel settings={settings} onSaved={(s) => setSettings(s)} />
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
              filter === f.key
                ? "bg-ink text-paper"
                : "border border-line text-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-ink text-left font-mono text-[10px] uppercase tracking-widest text-paper">
              <th className="px-4 py-3">번호</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">예약자</th>
              <th className="px-4 py-3">금액</th>
              <th className="px-4 py-3 text-right">처리</th>
            </tr>
          </thead>
          <tbody className="bg-paper [&_td:first-child]:pl-4 [&_td:last-child]:pr-4">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-faint">
                  불러오는 중…
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-faint">
                  예약이 없습니다.
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <Row key={t.id} t={t} onAction={action} busy={busyId === t.id} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── 개인 후원 관리 ── */}
      <div className="mt-16 flex items-end justify-between">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">개인 후원</h2>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "후원 건수", value: `${donations.length}` },
          {
            label: "후원 합계",
            value: formatWon(donations.reduce((sum, d) => sum + d.amount, 0)),
          },
          {
            label: "현장참여 후원",
            value: `${donations.filter((d) => d.attend).length}`,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-surface/60 p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {s.label}
            </div>
            <div className="mt-1 font-display text-2xl font-extrabold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setDonFilter(f.key)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
              donFilter === f.key
                ? "bg-ink text-paper"
                : "border border-line text-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-ink text-left font-mono text-[10px] uppercase tracking-widest text-paper">
              <th className="px-4 py-3">번호</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">후원자</th>
              <th className="px-4 py-3">금액</th>
              <th className="px-4 py-3 text-right">처리</th>
            </tr>
          </thead>
          <tbody className="bg-paper [&_td:first-child]:pl-4 [&_td:last-child]:pr-4">
            {donLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-faint">
                  불러오는 중…
                </td>
              </tr>
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-faint">
                  후원 내역이 없습니다.
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <DonationRow
                  key={d.id}
                  d={d}
                  onAction={donationAction}
                  busy={donBusyId === d.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch("/api/admin/settings");
      if (active) setAuthed(res.ok);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center font-mono text-sm text-faint">
        로딩 중…
      </div>
    );
  }
  if (!authed) return <LoginScreen onSuccess={() => setAuthed(true)} />;
  return <Dashboard onLogout={() => setAuthed(false)} />;
}
