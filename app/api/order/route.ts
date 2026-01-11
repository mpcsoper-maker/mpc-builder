import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export async function POST(req: Request) {
  const body = await req.json();
  const id = crypto.randomUUID();

  await kv.hset(`order:${id}`, body);
  await kv.lpush("orders", id);

  return NextResponse.json({ success: true });
}
