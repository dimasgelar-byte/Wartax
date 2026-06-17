import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang — WarTax",
  description:
    "WarTax lahir untuk menerjemahkan pajak yang rumit jadi langkah yang bisa kamu kerjakan sendiri — sampai kamu beneran ngerti.",
};

const PRINCIPLES = [
  {
    no: "01",
    title: "Bahasa manusia, bukan jargon",
    desc: "Tiap istilah teknis kita terjemahkan ke bahasa sehari-hari di penyebutan pertama. Kalau kamu masih bingung setelah baca, berarti kerjaan kita belum selesai.",
  },
  {
    no: "02",
    title: "Akurasi di atas segalanya",
    desc: "Casual bukan berarti asal. Angka, tarif, dan aturan selalu diverifikasi ke sumber terkini. Urusan pajak nggak ada ruang buat tebak-tebakan.",
  },
  {
    no: "03",
    title: "Jujur soal batas",
    desc: "WarTax alat bantu yang kuat untuk kasus standar. Tapi untuk kasus rumit, kita jujur bilang kapan kamu memang butuh konsultan. Itu bagian dari menjaga kamu.",
  },
];

export default function TentangPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-rust">
          Tentang
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
          Pajak itu nggak harus bikin takut
        </h1>

        {/* Lead paragraph — larger */}
        <p className="mt-7 text-xl leading-relaxed text-charcoal-mid">
          WarTax lahir dari satu pemandangan yang kelewat sering: orang yang
          hafal ratusan hal di bidangnya — dokter, kreator, pemilik usaha — tapi
          mendadak beku begitu ketemu satu lembar SPT.
        </p>

        <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal-mid">
          <p>
            Bukan karena mereka nggak mampu. Tapi karena nggak ada yang pernah
            menjelaskan dengan bahasa yang manusiawi. Formulir penuh istilah.
            Aturan berubah-ubah. Sistemnya bikin ragu sendiri. Akhirnya ditunda,
            ditumpuk, sampai jadi beban yang terasa nggak berbentuk.
          </p>
          <p className="font-bold text-charcoal">
            Padahal hambatan terbesarnya sering cuma satu: nggak tau mulai dari
            mana.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="my-10 border-l-4 border-rust pl-6">
          <p className="font-serif text-2xl italic leading-snug text-charcoal">
            “Begitu ada langkah pertama yang jelas, sisanya jauh lebih ringan
            dari yang dibayangkan.”
          </p>
        </blockquote>

        <div className="space-y-5 text-lg leading-relaxed text-charcoal-mid">
          <p>
            Selama bertahun-tahun bekerja di dunia perpajakan — dari sisi
            konsultan maupun dari dalam perusahaan — pola yang sama muncul terus:
            orang kepleset di tempat yang sebenarnya bisa dihindari, kalau saja
            ada yang menunjukkan jalannya lebih awal.
          </p>
          <p>
            WarTax dibuat persis untuk itu. Bukan untuk menggurui, bukan untuk
            menakut-nakuti. Tapi untuk menerjemahkan yang rumit jadi langkah yang
            bisa kamu kerjakan sendiri — sampai kamu beneran ngerti.
          </p>
        </div>

        {/* Principles */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
            Yang kita pegang
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.no}
                className="rounded-2xl border border-sand bg-white p-6"
              >
                <span className="font-serif text-2xl text-rust">{p.no}</span>
                <h3 className="mt-3 text-base font-semibold text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-mid">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust block */}
        <section className="mt-14 rounded-2xl bg-rust-pale p-7 sm:p-8">
          <h2 className="text-lg font-bold text-charcoal">Catatan penting</h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-mid">
            WarTax adalah alat bantu edukasi, bukan pengganti konsultan pajak.
            Semua panduan disusun berdasarkan regulasi yang berlaku dan
            diverifikasi berkala. Untuk kasus khusus atau kompleks, selalu
            konsultasikan dengan konsultan pajak terdaftar.
          </p>
        </section>
      </div>
    </div>
  );
}
