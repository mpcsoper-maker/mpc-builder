import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const pass = new URL(req.url).searchParams.get("pass");

  if (pass !== "1234") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`DELETE FROM orders WHERE id = ${params.id}`;

  return NextResponse.json({ success: true });
}
