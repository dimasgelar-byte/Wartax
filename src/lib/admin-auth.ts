import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wartax_admin";

/**
 * Returns true if the request carries a valid admin session cookie.
 * The cookie value must match ADMIN_PASSWORD. Server-only.
 */
export async function isAdmin(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === password;
}
