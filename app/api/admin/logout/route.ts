import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/app/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const c = await cookies();
  c.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
