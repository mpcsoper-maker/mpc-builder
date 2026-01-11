"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });

      if (!res.ok) {
        setError("Failed to load orders");
        return;
      }

      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError("Server error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Admin Orders</h1>
      <button onClick={load}>Refresh</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((o, i) => (
        <div key={i} style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
          <pre>{JSON.stringify(o, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
