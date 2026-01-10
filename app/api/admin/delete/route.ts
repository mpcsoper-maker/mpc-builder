import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const { id, pass } = await req.json();

  if (pass !== "1234") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`DELETE FROM orders WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
