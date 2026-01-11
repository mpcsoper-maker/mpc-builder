"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  email: string;
  parts: any[];
  total: number;
  notes: string;
  createdAt: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load orders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Error");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Admin Orders</h1>

      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button
          onClick={load}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          Refresh
        </button>
      </div>

      {loading && <p style={{ marginTop: 16 }}>Loading…</p>}
      {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ marginTop: 16 }}>0 orders</p>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b>{o.email}</b>
              <span style={{ opacity: 0.7, fontSize: 12 }}>{o.createdAt}</span>
            </div>

            <div style={{ marginTop: 8, fontSize: 14 }}>
              <div>
                <b>ID:</b> {o.id}
              </div>
              <div>
                <b>Total:</b> {o.total}
              </div>
              <div>
                <b>Notes:</b> {o.notes || "-"}
              </div>

              <div style={{ marginTop: 8 }}>
                <b>Parts:</b>
                <pre style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(o.parts, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
