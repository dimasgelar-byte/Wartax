"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/lib/supabase";

const STATUSES: LeadStatus[] = ["baru", "difollow_up", "closing"];

const STATUS_LABEL: Record<LeadStatus, string> = {
  baru: "Baru",
  difollow_up: "Di-follow up",
  closing: "Closing",
};

const STATUS_STYLE: Record<LeadStatus, string> = {
  baru: "bg-rust-pale text-rust",
  difollow_up: "bg-wg-pale text-charcoal-mid",
  closing: "bg-charcoal text-cream",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function toCSV(rows: Lead[]) {
  const headers = [
    "id",
    "nama",
    "whatsapp",
    "email",
    "source",
    "status",
    "created_at",
  ];
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => escape(r[h as keyof Lead])).join(","),
    ),
  ];
  return lines.join("\n");
}

export default function AdminDashboard({
  leads: initialLeads,
  loadError,
}: {
  leads: Lead[];
  loadError: string;
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string>("");

  const sources = useMemo(
    () => Array.from(new Set(leads.map((l) => l.source))).sort(),
    [leads],
  );

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (statusFilter === "all" || l.status === statusFilter) &&
          (sourceFilter === "all" || l.source === sourceFilter),
      ),
    [leads, statusFilter, sourceFilter],
  );

  async function changeStatus(id: string, status: LeadStatus) {
    setSavingId(id);
    setRowError("");
    const prev = leads;
    // Optimistic update
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setRowError(data?.error ?? "Gagal mengubah status.");
        setLeads(prev); // rollback
      }
    } catch {
      setRowError("Gagal terhubung ke server.");
      setLeads(prev);
    } finally {
      setSavingId(null);
    }
  }

  function exportCSV() {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wartax-leads-${filtered.length}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Leads</h1>
          <p className="mt-1 text-sm text-charcoal-mid">
            {filtered.length} dari {leads.length} lead
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-sand px-4 py-2 text-sm font-medium text-charcoal-mid hover:bg-wg-pale"
        >
          Keluar
        </button>
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl bg-rust-pale px-4 py-3 text-sm text-rust">
          Gagal memuat data: {loadError}
        </p>
      )}

      {/* Filters + export */}
      <div className="mt-8 flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-xs font-medium text-charcoal-mid">
          Status
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | LeadStatus)
            }
            className="mt-1 rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal"
          >
            <option value="all">Semua</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-xs font-medium text-charcoal-mid">
          Source
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="mt-1 rounded-lg border border-sand bg-white px-3 py-2 text-sm text-charcoal"
          >
            <option value="all">Semua</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={exportCSV}
          disabled={filtered.length === 0}
          className="ml-auto rounded-full bg-rust px-5 py-2.5 text-sm font-semibold text-white hover:bg-rust/90 disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      {rowError && (
        <p className="mt-4 text-sm font-medium text-rust">{rowError}</p>
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-sand bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-sand bg-wg-pale text-xs uppercase tracking-wide text-charcoal-mid">
            <tr>
              <th className="px-4 py-3 font-semibold">Tanggal</th>
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Ubah</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-charcoal-mid"
                >
                  Belum ada lead yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <tr key={l.id} className="border-b border-sand last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal-mid">
                    {formatDate(l.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {l.nama}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-charcoal-mid">
                    {l.whatsapp}
                  </td>
                  <td className="px-4 py-3 text-charcoal-mid">{l.email}</td>
                  <td className="px-4 py-3 text-charcoal-mid">{l.source}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[l.status]}`}
                    >
                      {STATUS_LABEL[l.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      disabled={savingId === l.id}
                      onChange={(e) =>
                        changeStatus(l.id, e.target.value as LeadStatus)
                      }
                      className="rounded-lg border border-sand bg-white px-2 py-1.5 text-xs text-charcoal disabled:opacity-50"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
