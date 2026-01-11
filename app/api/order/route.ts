import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export async function POST(req: Request) {
  const order = await req.json();
  const id = crypto.randomUUID();

  await kv.set(`order:${id}`, { id, ...order });
  await kv.lpush("orders", id);

  return NextResponse.json({ success: true });
}
