import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  db.prepare("DELETE FROM orders WHERE id = ?").run(id);

  return NextResponse.json({ success: true });
}
