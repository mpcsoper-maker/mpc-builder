"use client";

import { useEffect, useState } from "react";

type OrderRow = {
  id: string;
  email: string;
  parts: string; // JSON string in DB
  total: number;
  notes: string;
  createdAt: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(Array.isArray(data.orders) ? data.orders : []);
    setLoading(false);
  }

  async function deleteOrder(id: string) {
    // Optimistic UI: remove instantly
    setOrders((prev) => prev.filter((o) => o.id !== id));

    const res = await fetch("/api/admin/delete-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // If failed, reload to be safe
    if (!res.ok) {
      await loadOrders();
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Orders</h1>

        <button
          onClick={loadOrders}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : orders.length === 0 ? (
        <p>No orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            let partsParsed: any[] = [];
            try {
              partsParsed = JSON.parse(o.parts || "[]");
            } catch {}

            return (
              <div
                key={o.id}
                className="border rounded p-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                    <p className="font-semibold break-all">{o.email}</p>
                    <span className="text-sm opacity-70">
                      {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-2 font-bold">Total: €{Number(o.total).toFixed(2)}</p>

                  {o.notes ? (
                    <p className="mt-2 text-sm opacity-80">Notes: {o.notes}</p>
                  ) : null}

                  {partsParsed.length > 0 ? (
                    <div className="mt-3 text-sm">
                      <p className="font-semibold mb-1">Parts:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {partsParsed.map((p, idx) => (
                          <li key={idx} className="break-words">
                            {typeof p === "string" ? p : JSON.stringify(p)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <p className="mt-3 text-xs opacity-60">ID: {o.id}</p>
                </div>

                <button
                  onClick={() => deleteOrder(o.id)}
                  title="Delete order"
                  className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-red-600 font-bold hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
