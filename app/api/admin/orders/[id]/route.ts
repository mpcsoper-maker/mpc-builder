// app/api/admin/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { kv } from "@/app/lib/kv";

export const dynamic = "force-dynamic";

// Next.js 16 route handlers: params is a Promise
type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    await kv.del(`order:${id}`);
    await kv.lrem("orders:ids", 0, id);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
