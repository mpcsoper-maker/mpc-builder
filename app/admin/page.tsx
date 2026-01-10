"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  name?: string;
  email?: string;
  items?: any;
  total_cents?: number;
  createdAt?: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const text = await res.text();

      if (!res.ok) {
        setError(`Server error ${res.status}: ${text || "(no body)"}`);
        setOrders([]);
        return;
      }

      const data = text ? JSON.parse(text) : { orders: [] };
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (e: any) {
      setError(String(e?.message || e));
      setOrders([]);
    }
  }

  async function del(id: string) {
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Admin Orders</h1>
      <button onClick={load} style={{ marginTop: 12, padding: "8px 12px" }}>
        Refresh
      </button>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      {!orders.length ? (
        <p style={{ marginTop: 12 }}>No orders</p>
      ) : (
        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                border: "1px solid #333",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>{o.email || "no email"}</b>
                <button onClick={() => del(o.id)}>Delete</button>
              </div>
              <div>ID: {o.id}</div>
              {o.name && <div>Name: {o.name}</div>}
              {o.createdAt && <div>Created: {o.createdAt}</div>}
              <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
                {JSON.stringify(o, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
