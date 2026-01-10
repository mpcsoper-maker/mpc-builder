// app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

// Next.js 16: context.params is a Promise
type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
