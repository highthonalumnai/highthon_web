import { z } from "zod";

/** 개인 후원 최소 금액 (원). */
export const DONATION_MIN = 50000;

export const donationSchema = z
  .object({
    name: z.string().trim().min(1, "이름을 입력해 주세요.").max(50),
    email: z.string().trim().email("올바른 이메일을 입력해 주세요.").max(254),
    phone: z
      .string()
      .trim()
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => v.length >= 9 && v.length <= 11, "올바른 전화번호를 입력해 주세요."),
    amount: z.coerce
      .number()
      .int("후원 금액을 정수로 입력해 주세요.")
      .min(DONATION_MIN, `최소 ${DONATION_MIN.toLocaleString("ko-KR")}원부터 후원할 수 있습니다.`),
    attend: z.boolean().optional().default(false),
    wants_benefit: z.boolean().optional().default(false),
    benefit: z.string().trim().max(1000).optional().default(""),
  })
  .refine((d) => !d.wants_benefit || d.benefit.length > 0, {
    message: "원하는 혜택을 입력해 주세요.",
    path: ["benefit"],
  });

export type DonationStatus = "pending" | "confirmed" | "cancelled" | "expired";

export type Donation = {
  id: string;
  code: string | null;
  status: DonationStatus;
  amount: number;
  email: string;
  phone: string;
  name: string;
  attend: boolean;
  wants_benefit: boolean;
  benefit: string;
  source: "standalone" | "ticket";
  created_at: string;
  expires_at: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  bank_name: string;
  bank_account: string;
  bank_holder: string;
};

/** Maps DB RPC error messages → user-facing Korean copy. */
export const DONATION_ERRORS: Record<string, string> = {
  SOLD_OUT: "현장 참여 좌석이 마감되었습니다. 현장 참여 없이 후원하시거나 잠시 후 다시 시도해 주세요.",
  INVALID_EMAIL: "올바른 이메일을 입력해 주세요.",
  INVALID_PHONE: "올바른 전화번호를 입력해 주세요.",
  INVALID_NAME: "이름을 입력해 주세요.",
  INVALID_AMOUNT: `최소 ${DONATION_MIN.toLocaleString("ko-KR")}원부터 후원할 수 있습니다.`,
  BENEFIT_REQUIRED: "원하는 혜택을 입력해 주세요.",
  CODE_GEN_FAILED: "후원 번호 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
};
