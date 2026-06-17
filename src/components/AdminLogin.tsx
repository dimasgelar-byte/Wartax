"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Gagal login.");
        setLoading(false);
        return;
      }
      window.location.reload();
    } catch {
      setError("Gagal terhubung ke server.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-5 py-20">
      <h1 className="text-2xl font-bold text-charcoal">Admin WarTax</h1>
      <p className="mt-2 text-sm text-charcoal-mid">
        Masukkan password untuk melihat data leads.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password admin"
          required
          autoFocus
          className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-rust"
        />
        {error && <p className="text-sm font-medium text-rust">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-rust px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rust/90 disabled:opacity-60"
        >
          {loading ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
