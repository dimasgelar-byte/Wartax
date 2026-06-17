import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Free Tools — WarTax",
  description:
    "Kalkulator dan checklist pajak gratis untuk pekerja bebas dan pemilik usaha. Daftar dan ambil sekarang.",
};

const TOOLS = [
  {
    title: "Checklist SPT siap lapor",
    desc: "tau persis dokumen apa yang perlu disiapkan",
  },
  {
    title: "Kalkulator PPh sederhana",
    desc: "estimasi pajakmu dalam hitungan menit",
  },
  {
    title: "Update regulasi terbaru",
    desc: "dikabari kalau ada aturan yang berubah",
  },
];

export default function FreeToolsPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left — pitch */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rust">
              Free Tools
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
              Mulai dari yang gratis
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-charcoal-mid">
              Isi data kamu sekali — kita kirim checklist SPT dan akses
              kalkulator langsung ke WA kamu.
            </p>

            <ul className="mt-8 space-y-5">
              {TOOLS.map((t) => (
                <li key={t.title} className="flex gap-4">
                  <span
                    className="mt-0.5 font-serif text-xl text-rust"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <div>
                    <h3 className="font-semibold text-charcoal">{t.title}</h3>
                    <p className="text-sm leading-relaxed text-charcoal-mid">
                      {t.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — lead form */}
          <div className="lg:sticky lg:top-24">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
