import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Solusi",
    links: [
      { label: "Untuk Pekerja Bebas", href: "/solusi#pekerja-bebas" },
      { label: "Untuk Usaha", href: "/solusi#punya-usaha" },
      { label: "Semua Produk", href: "/solusi" },
    ],
  },
  {
    title: "Gratis",
    links: [
      { label: "Free Tools", href: "/free-tools" },
      { label: "Checklist SPT", href: "/free-tools" },
    ],
  },
  {
    title: "WarTax",
    links: [
      { label: "Tentang", href: "/tentang" },
      { label: "Webinar", href: "/webinar" },
      { label: "Instagram", href: "https://instagram.com/wartax.id" },
      { label: "Threads", href: "https://threads.net/@wartax.id" },
    ],
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warm-gray">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed text-warm-gray">
              Ngobrolin pajak, sampai kamu ngerti.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.title} className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-warm-gray">
                  {col.title}
                </span>
                {col.links.map((link) =>
                  isExternal(link.href) ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-wg-pale/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-wg-pale/80 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-mid pt-6 text-xs leading-relaxed text-warm-gray">
          © 2026 WarTax. Alat bantu, bukan pengganti konsultan pajak. Untuk
          kasus khusus, konsultasikan dengan konsultan pajak terdaftar.
        </div>
      </div>
    </footer>
  );
}
