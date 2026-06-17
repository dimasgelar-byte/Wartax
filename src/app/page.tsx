import Link from "next/link";

const WHY_ITEMS = [
  {
    symbol: "”",
    title: "Bahasa manusia",
    desc: "Tiap istilah pajak yang bikin pusing kita terjemahkan ke bahasa sehari-hari. NPPN, PTKP, bukti potong — semua dijelasin sampai kebayang.",
  },
  {
    symbol: "→",
    title: "Langkah yang jelas",
    desc: "Masalah terbesar bukan takut salah — tapi nggak tau mulai dari mana. Kita kasih langkah pertama yang jelas, sisanya ngalir.",
  },
  {
    symbol: "◆",
    title: "Dibuat praktisi",
    desc: "Disusun praktisi pajak yang sudah lama lihat di mana orang biasa kepleset — jadi kamu nggak ngalamin hal yang sama.",
  },
];

export default function Home() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-rust">
            Panduan pajak buatan praktisi
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl">
            Urusan pajak yang bikin pusing, kita bikin jadi{" "}
            <span className="text-rust">ngerti</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-mid">
            Kalkulator dan panduan langkah demi langkah yang bisa kamu kerjakan
            sendiri — buat pekerja bebas dan pemilik usaha yang awam soal pajak.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/free-tools"
              className="rounded-full bg-rust px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-rust/90"
            >
              Mulai dari yang gratis →
            </Link>
            <Link
              href="/solusi"
              className="text-base font-medium text-charcoal-mid underline-offset-4 transition-colors hover:text-rust hover:underline"
            >
              Lihat semua solusi
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — Orientasi */}
      <section className="border-y border-sand bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-warm-gray">
              Untuk kamu yang...
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Punya pemasukan, tapi bingung pajaknya
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ProfileCard
              tag="Pekerja Bebas"
              title="Penghasilan dari keahlian sendiri"
              desc="Content creator, dokter, freelancer, notaris, arsitek. Pemasukan datang dari banyak sumber, dan kamu bingung harus lapor yang mana, gimana caranya."
              href="/solusi#pekerja-bebas"
              linkLabel="Lihat untuk pekerja bebas →"
            />
            <ProfileCard
              tag="Punya Usaha"
              title="Jalanin usaha, pajak keteteran"
              desc="UMKM kecil-menengah, atau usaha yang mulai naik kelas. Sibuk ngurus usaha sampai catatan berantakan dan pajak numpuk di akhir tahun."
              href="/solusi#punya-usaha"
              linkLabel="Lihat untuk pemilik usaha →"
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Kenapa WarTax */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-rust">
              Kenapa WarTax
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Bukan aplikasi pajak. Bukan konsultan mahal.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {WHY_ITEMS.map((item) => (
              <div key={item.title}>
                <span
                  className="font-serif text-4xl leading-none text-rust"
                  aria-hidden="true"
                >
                  {item.symbol}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-mid">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Closer */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-cream sm:text-4xl">
            Mulai dari langkah paling kecil
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-warm-gray">
            Ambil checklist gratis buat tau kamu udah siap atau belum sebelum
            lapor SPT. Langsung ke WA kamu, tanpa daftar ribet.
          </p>
          <div className="mt-9">
            <Link
              href="/free-tools"
              className="rounded-full bg-rust-light px-7 py-3.5 text-base font-semibold text-charcoal transition-opacity hover:opacity-90"
            >
              Lihat tools gratisnya →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ProfileCard({
  tag,
  title,
  desc,
  href,
  linkLabel,
}: {
  tag: string;
  title: string;
  desc: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-sand bg-cream p-7">
      <span className="self-start rounded-full bg-rust-pale px-3 py-1 text-xs font-semibold text-rust">
        {tag}
      </span>
      <h3 className="mt-5 text-xl font-bold text-charcoal">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-mid">
        {desc}
      </p>
      <Link
        href={href}
        className="mt-6 text-sm font-semibold text-rust underline-offset-4 hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
