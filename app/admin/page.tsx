"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  email: string;
  parts: any[];
  total: number;
  notes?: string;
  createdAt?: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    setErr("");
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`DELETE failed: HTTP ${res.status}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e: any) {
      setErr(e?.message || "Failed to delete");
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 4000); // auto-refresh every 4s
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Admin Orders</h1>

      <div style={{ display: "flex", gap: 10, marginTop: 12, marginBottom: 12 }}>
        <button
          onClick={load}
          style={{ padding: "10px 14px", border: "1px solid #333", borderRadius: 8 }}
        >
          Refresh
        </button>
        <div style={{ opacity: 0.7, paddingTop: 10 }}>
          {loading ? "Loading..." : `${orders.length} orders`}
        </div>
      </div>

      {err && (
        <div style={{ background: "#ffdddd", padding: 10, borderRadius: 8, marginBottom: 10 }}>
          {err}
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No orders yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                border: "1px solid #333",
                borderRadius: 12,
                padding: 14,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{o.email}</div>
                <div style={{ opacity: 0.8, fontSize: 13 }}>{o.id}</div>
                {o.createdAt && (
                  <div style={{ opacity: 0.8, fontSize: 13 }}>
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                )}

                <div style={{ marginTop: 10 }}>
                  <b>Total:</b> {o.total}
                </div>

                <div style={{ marginTop: 10 }}>
                  <b>Parts:</b>
                  <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>
                    {JSON.stringify(o.parts, null, 2)}
                  </pre>
                </div>

                {o.notes && (
                  <div style={{ marginTop: 10 }}>
                    <b>Notes:</b> {o.notes}
                  </div>
                )}
              </div>

              <button
                onClick={() => remove(o.id)}
                title="Delete order"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid #333",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
