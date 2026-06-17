import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin-auth";

const VALID_STATUS = ["baru", "difollow_up", "closing"] as const;

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const { id, status } = (body ?? {}) as Record<string, unknown>;

  if (typeof id !== "string" || !id) {
    return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
  }
  if (
    typeof status !== "string" ||
    !VALID_STATUS.includes(status as (typeof VALID_STATUS)[number])
  ) {
    return NextResponse.json(
      { error: "Status tidak valid." },
      { status: 400 },
    );
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Update status error:", error.message);
    return NextResponse.json(
      { error: "Gagal mengubah status." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
