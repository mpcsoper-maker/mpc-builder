// app/api/order/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { kv } from "@/app/lib/kv";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.email || !Array.isArray(body?.parts) || body.parts.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const id = randomUUID();

    const order = {
      email: String(body.email),
      parts: body.parts,
      total: Number(body.total ?? 0),
      notes: String(body.notes ?? ""),
      createdAt: new Date().toISOString(),
    };

    // Save the order
    await kv.set(`order:${id}`, order);

    // Add id to list (newest first)
    await kv.lpush("orders:ids", id);

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Order failed" },
      { status: 500 }
    );
  }
}
