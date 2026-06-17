import { z } from "zod";

export const reserveSchema = z.object({
  email: z.string().trim().email("올바른 이메일을 입력해 주세요.").max(254),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 9 && v.length <= 11, "올바른 전화번호를 입력해 주세요."),
});

export const lookupSchema = z.object({
  email: z.string().trim().email("올바른 이메일을 입력해 주세요.").max(254),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 9 && v.length <= 11, "올바른 전화번호를 입력해 주세요."),
  code: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "4자리 예약 번호를 입력해 주세요."),
});

export type TicketStatus = "pending" | "confirmed" | "cancelled" | "expired";

export type Ticket = {
  id: string;
  code: string;
  status: TicketStatus;
  amount: number;
  email: string;
  phone: string;
  created_at: string;
  expires_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
  bank_name: string;
  bank_account: string;
  bank_holder: string;
};

export type TicketSettings = {
  price: number;
  capacity: number;
  reserved: number;
  remaining: number;
  sold_out: boolean;
  bank_name: string;
  bank_account: string;
  bank_holder: string;
};

export const STATUS_META: Record<
  TicketStatus,
  { label: string; tone: "wait" | "ok" | "dead"; desc: string }
> = {
  pending: { label: "입금 대기", tone: "wait", desc: "1시간 안에 입금하면 예약이 확정됩니다." },
  confirmed: { label: "예약 확정", tone: "ok", desc: "입금이 확인되어 예약이 확정되었습니다." },
  cancelled: { label: "예약 취소", tone: "dead", desc: "취소된 예약입니다." },
  expired: { label: "기간 만료", tone: "dead", desc: "입금 기한(1시간)이 지나 예약이 만료되었습니다." },
};

export function formatWon(n: number): string {
  return new Intl.NumberFormat("ko-KR").format(n) + "원";
}

export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return d;
}

/** Maps DB RPC error messages → user-facing Korean copy. */
export const RESERVE_ERRORS: Record<string, string> = {
  SOLD_OUT: "예약이 마감되었습니다. (정원 초과)",
  INVALID_EMAIL: "올바른 이메일을 입력해 주세요.",
  INVALID_PHONE: "올바른 전화번호를 입력해 주세요.",
  CODE_GEN_FAILED: "예약 번호 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
};
