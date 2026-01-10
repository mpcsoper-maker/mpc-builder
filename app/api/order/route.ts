import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const id = randomUUID();

  await kv.set(`order:${id}`, {
    id,
    email: body.email,
    parts: body.parts,
    total: body.total,
    notes: body.notes || "",
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ success: true });
}
