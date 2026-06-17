import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import { createServiceClient, type Lead } from "@/lib/supabase";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — WarTax",
  robots: { index: false, follow: false },
};

// Always render fresh — leads change and auth is per-request.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin />;
  }

  let leads: Lead[] = [];
  let loadError = "";

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      leads = (data ?? []) as Lead[];
    }
  } catch {
    loadError = "Supabase belum dikonfigurasi (cek env).";
  }

  return <AdminDashboard leads={leads} loadError={loadError} />;
}
