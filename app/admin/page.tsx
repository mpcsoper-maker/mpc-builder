=async function load() {
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
