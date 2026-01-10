import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !body.parts?.length) {
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
    body.total,
    body.notes || "",
    new Date().toISOString()
  );

  return NextResponse.json({ success: true });
}
