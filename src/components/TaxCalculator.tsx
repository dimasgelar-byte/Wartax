"use client";

import { useMemo, useState } from "react";

// PTKP per status (PER-17/PJ/2015).
const PTKP: Record<string, { label: string; value: number }> = {
  "TK/0": { label: "Lajang (TK/0)", value: 54_000_000 },
  "K/0": { label: "Kawin (K/0)", value: 58_500_000 },
  "K/1": { label: "Kawin + 1 tanggungan (K/1)", value: 63_000_000 },
  "K/2": { label: "Kawin + 2 tanggungan (K/2)", value: 67_500_000 },
  "K/3": { label: "Kawin + 3 tanggungan (K/3)", value: 72_000_000 },
};

// Tarif progresif Pasal 17 (lapisan, batas, tarif).
const BRACKETS = [
  { upTo: 60_000_000, rate: 0.05 },
  { upTo: 250_000_000, rate: 0.15 },
  { upTo: 500_000_000, rate: 0.25 },
  { upTo: 5_000_000_000, rate: 0.3 },
  { upTo: Infinity, rate: 0.35 },
];

function rupiah(n: number): string {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
}

function progressivePph(pkp: number): number {
  let remaining = pkp;
  let prevLimit = 0;
  let total = 0;
  for (const b of BRACKETS) {
    if (remaining <= 0) break;
    const slice = Math.min(remaining, b.upTo - prevLimit);
    total += slice * b.rate;
    remaining -= slice;
    prevLimit = b.upTo;
  }
  return total;
}

export default function TaxCalculator() {
  const [brutoRaw, setBrutoRaw] = useState("");
  const [status, setStatus] = useState("TK/0");

  const bruto = Number(brutoRaw) || 0;

  const calc = useMemo(() => {
    const neto = bruto * 0.5; // NPPN content creator 50%
    const ptkp = PTKP[status].value;
    const pkp = Math.max(neto - ptkp, 0);
    const pph = progressivePph(pkp);
    const pctOfBruto = bruto > 0 ? (pph / bruto) * 100 : 0;
    return { neto, ptkp, pkp, pph, pctOfBruto };
  }, [bruto, status]);

  function handleBrutoChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Keep only digits; store the raw number as a string.
    setBrutoRaw(e.target.value.replace(/\D/g, ""));
  }

  const showResult = bruto > 0;
  const displayBruto = bruto > 0 ? new Intl.NumberFormat("id-ID").format(bruto) : "";

  return (
    <div className="rounded-2xl border border-sand bg-white p-6 shadow-sm sm:p-8">
      {/* Inputs */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="bruto"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Penghasilan setahun
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-warm-gray">
              Rp
            </span>
            <input
              id="bruto"
              inputMode="numeric"
              value={displayBruto}
              onChange={handleBrutoChange}
              placeholder="120.000.000"
              className="w-full rounded-xl border border-sand bg-cream py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition-colors placeholder:text-warm-gray focus:border-rust"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-sand bg-cream px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-rust"
          >
            {Object.entries(PTKP).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result — progressive reveal */}
      {showResult && (
        <div className="mt-6 rounded-xl border-l-[3px] border-rust bg-cream p-5 sm:p-6">
          <dl className="space-y-3 text-sm">
            <Row label="Penghasilan bruto" value={rupiah(bruto)} />
            <Row
              label="Dipotong 50% NPPN (dianggap biaya)"
              value={rupiah(calc.neto)}
            />
            <Row
              label="Dikurangi PTKP (batas bebas pajak)"
              value={"− " + rupiah(calc.ptkp)}
            />
            <Row label="Penghasilan kena pajak" value={rupiah(calc.pkp)} />
          </dl>

          <div className="mt-4 border-t border-sand pt-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Estimasi pajak setahun
            </dt>
            <dd className="mt-1 text-3xl font-bold text-rust">
              {rupiah(calc.pph)}
            </dd>
          </div>

          {/* Contextual message */}
          <p className="mt-4 text-sm leading-relaxed text-charcoal-mid">
            {calc.pph === 0 ? (
              <>
                Penghasilanmu masih di bawah batas kena pajak. Tapi kamu tetap
                wajib lapor SPT, ya.
              </>
            ) : (
              <>
                Dari penghasilan {rupiah(bruto)}, pajakmu sekitar{" "}
                {rupiah(calc.pph)} setahun — {calc.pctOfBruto.toFixed(1)}% dari
                total. Nggak seseram yang dibayangin, kan?
              </>
            )}
          </p>

          {/* Mini CTA */}
          <div className="mt-5 border-t border-sand pt-5">
            <p className="text-sm font-medium text-charcoal">
              Mau panduan lengkap cara lapor &amp; bayarnya?
            </p>
            <a
              href="#beli"
              className="mt-3 inline-block rounded-full bg-rust px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rust/90"
            >
              Ambil panduannya — Rp 49rb
            </a>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-5 text-xs leading-relaxed text-warm-gray">
        Estimasi kasar · NPPN 50% · belum termasuk bukti potong dari klien ·
        alat bantu, bukan pengganti konsultan pajak
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-charcoal-mid">{label}</dt>
      <dd className="shrink-0 font-medium text-charcoal">{value}</dd>
    </div>
  );
}
