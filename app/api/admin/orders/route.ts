import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export async function GET() {
  const ids = await kv.lrange("orders", 0, -1);

  const orders = [];
  for (const id of ids) {
    const order = await kv.hgetall(`order:${id}`);
    orders.push({ id, ...order });
  }

  return NextResponse.json(orders);
}
