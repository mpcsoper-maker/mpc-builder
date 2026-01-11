import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export async function GET() {
  const ids = await kv.lrange("orders", 0, -1);
  const orders = await Promise.all(
    ids.map((id) => kv.get(`order:${id}`))
  );

  return NextResponse.json({ orders });
}
