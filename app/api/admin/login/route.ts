import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, ADMIN_PASSWORD } from "@/app/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pass = String(body?.password ?? "");

  if (pass !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const c = await cookies();
  c.set(ADMIN_COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // secure: true, // Vercel uses HTTPS; leaving off keeps localhost working
  });

  return NextResponse.json({ ok: true });
}
