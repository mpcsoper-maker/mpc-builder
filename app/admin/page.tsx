"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);

  async function loadOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  }

  async function deleteOrder(id: string) {
    await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Orders</h1>
      {orders.map(o => (
        <div key={o.id} style={{ border: "1px solid #444", margin: 10, padding: 10 }}>
          <div>Email: {o.email}</div>
          <div>Total: €{o.total}</div>
          <button onClick={() => deleteOrder(o.id)}>❌</button>
        </div>
      ))}
    </main>
  );
}
