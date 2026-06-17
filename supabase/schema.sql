-- WarTax — schema untuk tabel leads.
-- Jalankan di Supabase Studio → SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nama        text not null,
  whatsapp    text not null,
  email       text not null,
  source      text not null default 'unknown',
  status      text not null default 'baru'
              check (status in ('baru', 'difollow_up', 'closing')),
  created_at  timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS aktif. Insert & read dilakukan dari server pakai service-role key
-- (createServiceClient di src/lib/supabase.ts), yang otomatis bypass RLS.
-- Jadi tidak ada policy untuk anon/public — data leads tidak bisa dibaca
-- atau ditulis langsung dari browser.
alter table public.leads enable row level security;
