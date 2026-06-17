# WarTax

Platform panduan pajak Indonesia — kalkulator dan panduan langkah demi langkah
buat pekerja bebas dan pemilik usaha yang awam soal pajak.

🌐 Live: https://wartax.vercel.app

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** (brand tokens via `@theme` di `src/app/globals.css`)
- **Supabase** (tabel `leads`, API key format `sb_publishable_` / `sb_secret_`)
- **Vercel** (hosting)

## Setup lokal

1. Install deps:
   ```bash
   npm install
   ```
2. Salin env dan isi kredensial:
   ```bash
   cp .env.example .env.local
   ```
   Isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `SUPABASE_SECRET_KEY`, dan `ADMIN_PASSWORD`.
3. Buat tabel `leads` di Supabase — jalankan `supabase/schema.sql` di SQL Editor.
4. Jalankan dev server:
   ```bash
   npm run dev
   ```

## Struktur

- `src/app/` — halaman (homepage, solusi, tentang, free-tools, webinar, admin)
- `src/app/api/` — route handlers (leads, admin login & status)
- `src/components/` — Navbar, Footer, Logo, LeadForm, TaxCalculator, Admin*
- `src/lib/` — Supabase client & admin auth

## Admin

Panel leads di `/admin`, dilindungi password (`ADMIN_PASSWORD`). Fitur: filter
status & source, ubah status, export CSV.
