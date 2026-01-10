import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { randomUUID } from "crypto";


type OrderBody = {
  email?: string;
  parts?: unknown[];
  total?: number;
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderBody;

    if (!body.email || !Array.isArray(body.parts) || body.parts.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const id = randomUUID();

    db.prepare(`
      INSERT INTO orders (id, email, parts, total, notes, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.email,
      JSON.stringify(body.parts),
      Number(body.total ?? 0),
      body.notes ?? "",
      new Date().toISOString()
    );

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Order POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
