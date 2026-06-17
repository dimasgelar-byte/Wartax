"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LEAD_FLAG } from "@/components/LeadForm";

// Read the lead-submitted flag from localStorage. useSyncExternalStore handles
// SSR (server snapshot = false) and hydration without a setState-in-effect.
function useLeadUnlocked(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return localStorage.getItem(LEAD_FLAG) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

const TOOLS = [
  {
    title: "Checklist SPT",
    desc: "Daftar langkah & dokumen yang perlu disiapkan sebelum lapor SPT. Centang satu per satu sampai siap lapor.",
    href: "/checklist-spt.html",
    cta: "Buka checklist →",
    external: true,
  },
  {
    title: "Hitung dulu pajakmu",
    desc: "Kalkulator PPh untuk content creator (PP 20/2026). Masukkan penghasilan, langsung lihat estimasi pajak setahun.",
    href: "/solusi/creator#kalkulator",
    cta: "Buka kalkulator →",
    external: false,
  },
];

export default function AksesPage() {
  const router = useRouter();
  const allowed = useLeadUnlocked();

  useEffect(() => {
    // Not unlocked → bounce back to the form (side-effect only, no setState).
    if (!allowed) router.replace("/free-tools");
  }, [allowed, router]);

  // While checking / redirecting, render nothing meaningful.
  if (!allowed) {
    return (
      <div className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-sm text-warm-gray">
          Memuat…
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:py-24">
        <header className="text-center">
          <p className="font-serif text-3xl text-rust" aria-hidden="true">
            ◆
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Tools-mu sudah siap
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-charcoal-mid">
            Makasih sudah daftar! Ini tools gratis yang bisa langsung kamu pakai.
          </p>
        </header>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {TOOLS.map((tool) =>
            tool.external ? (
              <a
                key={tool.title}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-sand bg-white p-7 transition-shadow hover:shadow-md"
              >
                <ToolBody {...tool} />
              </a>
            ) : (
              <Link
                key={tool.title}
                href={tool.href}
                className="group flex flex-col rounded-2xl border border-sand bg-white p-7 transition-shadow hover:shadow-md"
              >
                <ToolBody {...tool} />
              </Link>
            ),
          )}
        </div>

        <p className="mt-10 text-center text-sm text-charcoal-mid">
          Mau panduan yang lebih lengkap?{" "}
          <Link
            href="/solusi"
            className="font-semibold text-rust underline-offset-4 hover:underline"
          >
            Lihat semua solusi WarTax →
          </Link>
        </p>
      </div>
    </div>
  );
}

function ToolBody({
  title,
  desc,
  cta,
}: {
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <>
      <span className="self-start rounded-full bg-rust-pale px-3 py-1 text-xs font-semibold text-rust">
        Gratis
      </span>
      <h2 className="mt-4 text-xl font-bold text-charcoal">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-mid">
        {desc}
      </p>
      <span className="mt-6 text-sm font-semibold text-rust group-hover:underline">
        {cta}
      </span>
    </>
  );
}
