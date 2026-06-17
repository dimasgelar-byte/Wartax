import { createClient } from "@supabase/supabase-js";

/**
 * Shape of a row in the `leads` table.
 */
export type LeadStatus = "baru" | "difollow_up" | "closing";

export interface Lead {
  id: string;
  nama: string;
  whatsapp: string;
  email: string;
  source: string;
  status: LeadStatus;
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// New Supabase API keys: publishable (sb_publishable_...) is browser-safe and
// replaces the legacy anon key.
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Browser-safe client (publishable key). Safe to import from client components.
 * RLS still applies to this key.
 */
export const supabase = createClient(
  supabaseUrl ?? "",
  supabasePublishableKey ?? "",
);

/**
 * Server-only client using the secret key (sb_secret_...). Bypasses RLS, so it
 * must NEVER be imported into a client component. Use it inside route handlers /
 * server components only (e.g. the leads API and the admin panel).
 */
export function createServiceClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY env vars.",
    );
  }
  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
