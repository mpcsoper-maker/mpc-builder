import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  await kv.del(`order:${id}`);
  return NextResponse.json({ success: true });
}
