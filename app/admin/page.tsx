"use client";

import { useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const text = await res.text();

      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        setOrders([]);
        setError(data?.error || `Server error ${res.status}: ${text.slice(0, 200)}`);
        return;
      }

      setOrders(Array.isArray(data?.orders) ? data.orders : []);
    } catch (e: any) {
      setOrders([]);
      setError(String(e?.message ?? e));
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Orders</h1>

      <button onClick={load}>Refresh</button>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      )}
    </div>
  );
}
