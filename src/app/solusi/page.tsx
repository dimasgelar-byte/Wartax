import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solusi — WarTax",
  description:
    "Panduan pajak yang bisa kamu kerjakan sendiri, dikelompokkan sesuai profilmu — pekerja bebas dan pemilik usaha.",
};

export default function SolusiPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
        {/* Hero */}
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rust">
            Solusi WarTax
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Panduan yang bisa kamu kerjakan sendiri
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-mid">
            Dikelompokkan sesuai profilmu. Lihat yang paling pas dengan
            kondisimu.
          </p>
        </header>

        {/* Segmen 1 — Pekerja Bebas */}
        <section
          id="pekerja-bebas"
          className="mt-16 scroll-mt-24 border-l-4 border-rust pl-6 sm:pl-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-rust">
            Untuk Pekerja Bebas
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            Penghasilan dari keahlian sendiri
          </h2>
          <p className="mt-2 text-charcoal-mid">
            Content creator, dokter, freelancer, notaris, arsitek.
          </p>

          {/* Card produk ready */}
          <Link
            href="/solusi/creator"
            className="group mt-7 block rounded-2xl border border-sand bg-white p-7 transition-shadow hover:shadow-md sm:p-8"
          >
            <span className="inline-block rounded-full bg-rust px-3 py-1 text-xs font-semibold text-white">
              Baru
            </span>
            <h3 className="mt-4 text-xl font-bold text-charcoal">
              Panduan Pajak Pekerja Bebas
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-mid">
              Buat kamu yang penghasilannya dari keahlian sendiri. Kalkulator +
              panduan lengkap dari hitung sampai siap lapor. Pakai bahasa
              manusia.
            </p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-rust">Rp 49rb</span>
                <span className="ml-2 text-xs text-warm-gray">sekali bayar</span>
              </div>
              <span className="text-sm font-semibold text-rust group-hover:underline">
                Lihat →
              </span>
            </div>
          </Link>

          {/* Teaser strip */}
          <TeaserStrip
            className="mt-4"
            text="SPT Kit Pekerja Bebas lengkap — kalkulator, checklist, panduan Coretax untuk semua jenis pekerja bebas. Lagi disiapkan."
          />
        </section>

        {/* Segmen 2 — Punya Usaha */}
        <section
          id="punya-usaha"
          className="mt-16 scroll-mt-24 border-l-4 border-rust pl-6 sm:pl-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-rust">
            Untuk Punya Usaha
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            Jalanin usaha tanpa pajak keteteran
          </h2>

          <div className="mt-7">
            <TeaserStrip text="SPT Kit UMKM — worksheet pencatatan bulanan, ekualisasi, dan panduan Coretax untuk usaha. Lagi disiapkan." />
            <p className="mt-4 text-sm text-charcoal-mid">
              Sambil nunggu, kamu bisa mulai dari{" "}
              <Link
                href="/free-tools"
                className="font-semibold text-rust underline-offset-4 hover:underline"
              >
                tools gratis
              </Link>{" "}
              buat rapihin persiapan pajak usahamu.
            </p>
          </div>
        </section>

        {/* CTA Block */}
        <section className="mt-16 rounded-2xl bg-charcoal p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-cream sm:text-3xl">
            Kasus kamu lebih rumit?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-warm-gray">
            Untuk kondisi khusus yang nggak cukup dijawab panduan, kamu bisa
            ngobrol langsung. Kita jujur kapan kamu memang butuh konsultan.
          </p>
          <Link
            href="/tentang"
            className="mt-7 inline-block rounded-full bg-rust-light px-6 py-3 text-sm font-semibold text-charcoal transition-opacity hover:opacity-90"
          >
            Kenalan dulu sama WarTax →
          </Link>
        </section>
      </div>
    </div>
  );
}

function TeaserStrip({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border border-dashed border-warm-gray/50 px-5 py-4 ${className}`}
    >
      <p className="text-sm leading-relaxed text-charcoal-mid">{text}</p>
      <span className="shrink-0 rounded-full bg-wg-pale px-3 py-1 text-xs font-semibold text-warm-gray">
        Segera
      </span>
    </div>
  );
}
