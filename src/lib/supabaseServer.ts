import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the publishable (anon) key.
 * All ticket logic runs through SECURITY DEFINER RPCs; the table itself is
 * locked by RLS, so the anon key is safe here. Admin RPCs additionally require
 * the bcrypt-checked ADMIN_API_SECRET passed from server env.
 */
export function supabaseServer(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase 환경변수(NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY)가 없습니다.");
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export function adminSecret(): string {
  const s = process.env.ADMIN_API_SECRET;
  if (!s) throw new Error("ADMIN_API_SECRET 환경변수가 없습니다.");
  return s;
}
