// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ids = (await kv.lrange("orders:ids", 0, -1)) as string[] | null;
    const orderIds = Array.isArray(ids) ? ids : [];

    if (orderIds.length === 0) {
      return NextResponse.json([]);
    }

    const orders = await Promise.all(
      orderIds.map(async (id) => {
        const order = await kv.get(`order:${id}`);
        return order ? { id, ...(order as any) } : null;
      })
    );

    // Remove nulls and sort newest first if createdAt exists
    const cleaned = orders.filter(Boolean) as any[];
    cleaned.sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });

    return NextResponse.json(cleaned);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
