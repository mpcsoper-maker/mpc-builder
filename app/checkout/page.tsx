"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BuildItem = {
  category: string;
  id: string;
  name: string;
  price: number;
};

type StoredBuild = {
  createdAt: string;
  parts: BuildItem[];
  total: number;
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default function CheckoutPage() {
  const [build, setBuild] = useState<StoredBuild | null>(null);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("mpc_checkout_build");
    if (raw) {
      try {
        setBuild(JSON.parse(raw));
      } catch {
        setBuild(null);
      }
    }
  }, []);

  const total = useMemo(() => build?.total ?? 0, [build]);

  function submitBuild() {
    try {
      setError("");
      setSuccess(false);
      setLoading(true);

      if (!build?.parts?.length) {
        throw new Error("No build found. Go back and select parts first.");
      }

      if (!email.includes("@")) {
        throw new Error("Please enter a valid email.");
      }

      const orders = JSON.parse(localStorage.getItem("mpc_orders") || "[]");

      orders.push({
        email,
        notes,
        parts: build.parts,
        total: build.total,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("mpc_orders", JSON.stringify(orders));
      localStorage.removeItem("mpc_checkout_build");

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pc-make" className="text-white/80 hover:text-white">
            ← back to builder
          </Link>
          <div className="text-purple-300 font-bold">M-pc’s</div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-extrabold">Checkout</h1>
          <p className="text-white/70 mt-2">
            We’ll review your build, confirm part availability, and contact you with updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Your build</h2>

            {!build?.parts?.length ? (
              <div className="text-white/70">
                No build found. Go back to the builder and click Checkout.
              </div>
            ) : (
              <div className="space-y-3">
                {build.parts.map((p) => (
                  <div
                    key={p.category}
                    className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold">{p.category}</div>
                      <div className="text-white/80 text-sm">{p.name}</div>
                    </div>
                    <div className="font-semibold">{euro(p.price)}</div>
                  </div>
                ))}

                <div className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-center justify-between mt-4">
                  <div className="font-bold">Total</div>
                  <div className="text-2xl font-extrabold">{euro(total)}</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>

            <label className="text-sm text-white/80">Your email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-2 w-full bg-white/85 text-black rounded-2xl px-4 py-3 outline-none"
            />

            <label className="text-sm text-white/80 mt-5 block">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any preferences? (RGB, quiet build, budget limit, etc.)"
              className="mt-2 w-full bg-white/85 text-black rounded-2xl px-4 py-3 outline-none min-h-[120px]"
            />

            <button
              onClick={submitBuild}
              disabled={loading || !build?.parts?.length}
              className="mt-6 w-full bg-purple-500 hover:bg-purple-400 disabled:opacity-60 transition rounded-2xl py-4 text-xl font-bold text-indigo-950"
            >
              {loading ? "Sending..." : "Submit build request"}
            </button>

            {error && (
              <div className="mt-3 text-sm bg-red-500/20 border border-red-300/30 rounded-xl p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-3 text-sm bg-green-500/20 border border-green-300/30 rounded-xl p-3">
                Sent ✅ Your build was saved. Open /admin to review orders.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
