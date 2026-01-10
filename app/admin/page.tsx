"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();
      setOrders(data);
    } catch {
      setError("Failed to load orders");
    }
  }

  async function remove(id: string) {
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Orders</h1>
      <button onClick={load}>Refresh</button>
      <p style={{ color: "red" }}>{error}</p>

      {orders.map(o => (
        <div key={o.id} style={{ border: "1px solid #444", marginTop: 10, padding: 10 }}>
          <b>{o.name}</b> – {o.email}<br/>
          Total: €{o.total}
          <button onClick={() => remove(o.id)} style={{ marginLeft: 10 }}>❌</button>
        </div>
      ))}
    </div>
  );
}
