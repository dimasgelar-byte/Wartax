import Link from "next/link";
import type { Metadata } from "next";
import TaxCalculator from "@/components/TaxCalculator";

export const metadata: Metadata = {
  title: "Panduan Pajak Pekerja Bebas — WarTax",
  description:
    "Kalkulator + panduan lengkap pajak untuk pekerja bebas. Dari hitung sampai siap lapor, pakai bahasa manusia.",
};

// Placeholder — ganti setelah Lynk.id & nomor WA live.
const LYNK_URL = "https://lynk.id/wartax/4xom05gnn08m";
const WA_URL =
  "https://wa.me/6285121520615?text=Halo%20WarTax%2C%20saya%20mau%20tanya%20soal%20Panduan%20Pajak%20Pekerja%20Bebas";

const INCLUDES = [
  "Kalkulator PPh untuk pekerja bebas",
  "Penjelasan aturan pajak dengan bahasa sehari-hari",
  "Langkah hitung penghasilan dari banyak klien & sumber",
  "Checklist dokumen sebelum lapor",
  "Panduan input di Coretax, langkah demi langkah",
];

export default function CreatorPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        {/* 1. Back link */}
        <Link
          href="/solusi"
          className="text-sm font-medium text-warm-gray underline-offset-4 hover:text-rust hover:underline"
        >
          ← Kembali ke solusi
        </Link>

        {/* 2. Hero */}
        <div className="mt-6">
          <span className="inline-block rounded-full bg-rust px-3 py-1 text-xs font-semibold text-white">
            Baru
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Panduan Pajak Pekerja Bebas
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-mid">
            Buat kamu yang penghasilannya dari keahlian sendiri — freelancer,
            profesional, dan pekerja lepas. Kalkulator + panduan lengkap dari
            hitung sampai siap lapor. Pakai bahasa manusia.
          </p>
        </div>

        {/* 3. Kalkulator interaktif */}
        <section id="kalkulator" className="mt-14 scroll-mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            Hitung dulu pajakmu
          </h2>
          <p className="mt-2 text-charcoal-mid">
            Gratis, 30 detik. Begitu lihat angkanya, biasanya langsung lega.
          </p>
          <div className="mt-6">
            <TaxCalculator />
          </div>
        </section>

        {/* 4. Benefit list */}
        <section className="mt-14 rounded-2xl border border-sand bg-white p-7 sm:p-8">
          <h2 className="text-lg font-bold text-charcoal">Yang kamu dapat</h2>
          <ul className="mt-5 space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex gap-3 text-charcoal-mid">
                <span className="text-rust" aria-hidden="true">
                  →
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Section pembelian — Opsi B */}
        <section
          id="beli"
          className="mt-14 scroll-mt-24 rounded-2xl bg-cream p-7 sm:p-10"
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            {/* Kiri — info harga */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-warm-gray">
                Sekali bayar
              </p>
              <p className="mt-1 text-4xl font-bold text-rust">Rp 49rb</p>
              <p className="mt-2 text-sm text-warm-gray">
                Excel + PDF panduan · update kalau aturan berubah
              </p>
            </div>

            {/* Kanan — dua CTA */}
            <div className="w-full sm:max-w-xs">
              <a
                href={LYNK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-rust px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-rust/90"
              >
                Ambil panduannya →
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-sm font-medium text-charcoal-mid underline-offset-4 hover:text-rust hover:underline"
              >
                Mau tanya dulu? Chat di WA →
              </a>
            </div>
          </div>

          <p className="mt-6 text-xs text-warm-gray">
            Digital · langsung bisa dipakai · update kalau aturan berubah
          </p>
        </section>

        {/* 6. Disclaimer */}
        <p className="mt-10 text-xs leading-relaxed text-warm-gray">
          WarTax adalah alat bantu edukasi, bukan pengganti konsultan pajak.
          Angka kalkulator adalah estimasi — verifikasi kondisi spesifikmu
          dengan konsultan pajak terdaftar.
        </p>
      </div>
    </div>
  );
}
