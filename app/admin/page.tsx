"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Orders</h1>
      <button onClick={load}>Refresh</button>

      {orders.map((o) => (
        <pre key={o.id}>{JSON.stringify(o, null, 2)}</pre>
      ))}
    </div>
  );
}
