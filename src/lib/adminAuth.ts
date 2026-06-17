import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "hc_admin";
const TTL_MS = 8 * 60 * 60 * 1000; // 8시간

function secret(): string {
  return (
    process.env.ADMIN_COOKIE_SECRET ||
    process.env.ADMIN_API_SECRET ||
    "insecure-dev-secret"
  );
}

function hmac(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Returns a signed `<expiry>.<sig>` session token. */
export function signSession(now = Date.now()): string {
  const exp = String(now + TTL_MS);
  return `${exp}.${hmac(exp)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(exp);
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return false;
  }
  return Number(exp) > Date.now();
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || "";
  if (!pw) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Reads the admin session cookie and verifies it. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}
