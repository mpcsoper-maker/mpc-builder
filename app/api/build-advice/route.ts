import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY. Put it in pc-builder/.env.local and restart npm run dev." },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const body = await req.json();
    const parts = body.parts || [];
    const total = body.total || 0;

    const prompt = `
You are a PC building expert.
Give bullet-point advice about:
- compatibility
- bottlenecks
- value
- and make it short
End with: Rating: Good / Mixed / Bad

Parts:
${parts.map((p: any) => `- ${p.category}: ${p.name} (€${p.price})`).join("\n")}
Total: €${total}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 200,
    });

    return NextResponse.json({ advice: response.output_text || "No advice returned." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "AI error" }, { status: 500 });
  }
}
