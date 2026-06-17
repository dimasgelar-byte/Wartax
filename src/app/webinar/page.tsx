import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webinar — WarTax",
  description:
    "Webinar pajak praktis untuk pekerja bebas dan pemilik usaha. Belajar langsung dari praktisi.",
};

export default function WebinarPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-rust">
          Webinar
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
          Belajar pajak langsung dari praktisi
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-charcoal-mid">
          Sesi webinar berkala buat ngebahas topik pajak yang paling sering
          bikin bingung — sambil tanya jawab langsung.
        </p>

        <div className="mt-12 rounded-2xl border border-dashed border-sand bg-white p-10">
          <p className="font-serif text-3xl text-rust" aria-hidden="true">
            ◆
          </p>
          <h2 className="mt-4 text-xl font-bold text-charcoal">
            Jadwal berikutnya segera diumumkan
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal-mid">
            Daftar dulu lewat tools gratis kami, dan kamu jadi yang pertama tahu
            begitu jadwal webinar terbaru dibuka.
          </p>
          <Link
            href="/free-tools"
            className="mt-7 inline-block rounded-full bg-rust px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rust/90"
          >
            Daftar lewat tools gratis →
          </Link>
        </div>
      </div>
    </div>
  );
}
