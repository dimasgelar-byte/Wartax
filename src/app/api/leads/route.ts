import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const { nama, whatsapp, email, source } = (body ?? {}) as Record<
    string,
    unknown
  >;

  // Validation
  if (typeof nama !== "string" || nama.trim().length < 2) {
    return NextResponse.json({ error: "Nama wajib diisi." }, { status: 400 });
  }
  if (typeof whatsapp !== "string" || whatsapp.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { error: "Nomor WhatsApp tidak valid." },
      { status: 400 },
    );
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").insert({
      nama: nama.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      source: typeof source === "string" && source.trim() ? source.trim() : "unknown",
      status: "baru",
    });

    if (error) {
      // Log full Supabase error so the cause is obvious (auth vs table vs RLS).
      console.error("Supabase insert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        { error: "Gagal menyimpan data. Coba lagi sebentar." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json(
      { error: "Server belum dikonfigurasi (cek env Supabase)." },
      { status: 500 },
    );
  }
}
