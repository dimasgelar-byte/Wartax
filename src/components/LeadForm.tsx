"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = "idle" | "submitting" | "success" | "error";

// Marks that this browser has submitted the lead form, used to gate
// /free-tools/akses so the tools list is only reachable after signup.
export const LEAD_FLAG = "wartax_lead_submitted";

// Auto-detect lead source from URL (?source=...) or the current path.
function detectSource(): string {
  if (typeof window === "undefined") return "unknown";
  const fromQuery = new URLSearchParams(window.location.search)
    .get("source")
    ?.trim();
  if (fromQuery) return fromQuery;
  const path = window.location.pathname.replace(/^\/|\/$/g, "");
  return path || "homepage";
}

export default function LeadForm() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setMessage("");

    const source = detectSource();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, whatsapp, email, source }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data?.error ?? "Terjadi kesalahan. Coba lagi.");
        return;
      }

      // Unlock the tools page, then redirect there.
      setState("success");
      try {
        localStorage.setItem(LEAD_FLAG, "1");
      } catch {
        // localStorage may be unavailable (private mode) — redirect still works.
      }
      router.push("/free-tools/akses");
    } catch {
      setState("error");
      setMessage("Gagal terhubung ke server. Coba lagi.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-sand bg-white p-8 text-center">
        <p className="font-serif text-3xl text-rust" aria-hidden="true">
          ◆
        </p>
        <h3 className="mt-4 text-xl font-bold text-charcoal">
          Berhasil! Membuka tools-mu…
        </h3>
        <p className="mt-2 text-sm text-charcoal-mid">
          Kalau tidak otomatis pindah,{" "}
          <a href="/free-tools/akses" className="font-semibold text-rust underline">
            klik di sini
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-sand bg-white p-7 sm:p-8"
    >
      <div className="space-y-5">
        <Field
          label="Nama lengkap"
          id="nama"
          value={nama}
          onChange={setNama}
          placeholder="Nama kamu"
          required
        />
        <Field
          label="Nomor WhatsApp"
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={setWhatsapp}
          placeholder="08xxxxxxxxxx"
          required
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="kamu@email.com"
          required
        />
      </div>

      {state === "error" && (
        <p className="mt-4 text-sm font-medium text-rust">{message}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full rounded-full bg-rust px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-rust/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Mengirim..." : "Kirim & ambil gratisnya →"}
      </button>
      <p className="mt-3 text-center text-xs text-warm-gray">
        Data kamu aman. Kita cuma pakai buat kirim materi dan info webinar.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-charcoal"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-warm-gray focus:border-rust"
      />
    </div>
  );
}
