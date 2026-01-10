"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  email: string;
  notes: string;
  parts: {
    category: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: string;
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!unlocked) return;
    const raw = localStorage.getItem("mpc_orders");
    if (raw) setOrders(JSON.parse(raw));
  }, [unlocked]);

  if (!unlocked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white">
        <div className="bg-white/10 backdrop-blur p-10 rounded-3xl border border-white/10 text-center">
          <h1 className="text-3xl font-bold mb-6">Admin Access</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/80 text-black px-4 py-3 rounded-xl outline-none"
          />
          <button
            onClick={() => password === "mpc-admin" && setUnlocked(true)}
            className="mt-4 w-full bg-purple-500 hover:bg-purple-400 transition rounded-xl py-3 font-bold text-indigo-950"
          >
            Unlock
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold">Admin Orders</h1>
          <Link href="/" className="text-purple-300">
            Back Home
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-white/70">No orders yet.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((o, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10"
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <div className="font-semibold">{o.email}</div>
                    <div className="text-xs text-white/60">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xl font-bold">{euro(o.total)}</div>
                </div>

                <div className="space-y-2">
                  {o.parts.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm bg-black/30 p-2 rounded-lg"
                    >
                      <span>
                        {p.category} — {p.name}
                      </span>
                      <span>{euro(p.price)}</span>
                    </div>
                  ))}
                </div>

                {o.notes && (
                  <div className="mt-3 text-sm text-purple-200">
                    Notes: {o.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
