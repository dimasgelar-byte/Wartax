"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Solusi", href: "/solusi" },
  { label: "Free Tools", href: "/free-tools" },
  { label: "Webinar", href: "/webinar" },
  { label: "Tentang", href: "/tentang" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-mid transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/free-tools"
            className="rounded-full bg-rust px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rust/90"
          >
            Mulai Gratis →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-charcoal md:hidden"
        >
          <span className="text-xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand bg-cream md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-charcoal-mid hover:bg-wg-pale hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/free-tools"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-rust px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Mulai Gratis →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
