import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type IncomingPart = {
  category: string;
  id?: string;
  name: string;
  price: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim();
    const notes = String(body.notes || "").trim();
    const parts = (body.parts || []) as IncomingPart[];
    const total = Number(body.total || 0);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }
    if (!Array.isArray(parts) || parts.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!Number.isFinite(total)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEADS_TO_EMAIL;
    const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey || !to) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY or LEADS_TO_EMAIL in .env.local" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `New M-pc’s Build Request — €${total} — ${email}`;

    const html = `
      <h2>New M-pc’s Build Request</h2>
      <p><b>Customer email:</b> ${email}</p>
      <p><b>Total:</b> €${total}</p>
      <h3>Parts</h3>
      <ul>
        ${parts
          .map(
            (p) =>
              `<li><b>${p.category}:</b> ${p.name} — €${Number(p.price).toFixed(
                2
              )}</li>`
          )
          .join("")}
      </ul>
      <h3>Notes</h3>
      <p>${notes ? notes.replace(/\n/g, "<br/>") : "(none)"}</p>
    `.trim();

    const result = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo: email,
    });

    // Helpful for debugging in terminal
    console.log("RESEND RESULT:", result);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("LEAD ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Lead submit failed." },
      { status: 500 }
    );
  }
}
