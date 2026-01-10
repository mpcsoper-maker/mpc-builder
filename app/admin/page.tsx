// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  email: string;
  parts: any[];
  total?: number;
  notes?: string;
  createdAt?: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  async function loadOrders() {
    try {
      setError("");
      setLoading(true);
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to load orders");

      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function deleteOrder(id: string) {
    // instant UI remove (feels fast)
    setOrders((prev) => prev.filter((o) => o.id !== id));

    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      // if delete fails, reload to restore truth
      await loadOrders();
      alert("Delete failed. Reloaded orders.");
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Admin Orders</h1>
        <button
          onClick={loadOrders}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading && <p style={{ marginTop: 16 }}>Loading…</p>}
      {error && <p style={{ marginTop: 16, color: "crimson" }}>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p style={{ marginTop: 16 }}>No orders yet.</p>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 14,
              padding: 14,
              background: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{o.email}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{o.id}</div>
                {o.createdAt && (
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{o.createdAt}</div>
                )}
              </div>

              <button
                onClick={() => deleteOrder(o.id)}
                title="Delete"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: 10, fontSize: 14 }}>
              {typeof o.total === "number" && (
                <div style={{ marginBottom: 6 }}>
                  <b>Total:</b> {o.total}
                </div>
              )}

              {o.notes && (
                <div style={{ marginBottom: 6 }}>
                  <b>Notes:</b> {o.notes}
                </div>
              )}

              <div>
                <b>Parts:</b>
                <pre
                  style={{
                    marginTop: 6,
                    padding: 10,
                    borderRadius: 10,
                    background: "#f6f6f6",
                    overflowX: "auto",
                  }}
                >
{JSON.stringify(o.parts, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
