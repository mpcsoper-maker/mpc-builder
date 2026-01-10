import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const keys = await kv.keys("order:*");
  const orders = [];

  for (const key of keys) {
    const order = await kv.get(key);
    if (order) orders.push(order);
  }

  return NextResponse.json({ orders });
}
