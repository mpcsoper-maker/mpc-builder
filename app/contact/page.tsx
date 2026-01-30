"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BuildItem = {
  category: string;
  id?: string;
  name: string;
  price: number;
};

type StoredRequest = {
  orderNumber: string;
  createdAt: string;
  parts: BuildItem[];
  total: number;
  source?: "custom" | "prebuilt";
  title?: string;
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

const WHATSAPP_NUMBER = "49XXXXXXXXXXX"; // TODO: set yours (example 4917612345678)
const DISCORD_INVITE = "https://discord.gg/2K2tzrYrn5";

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ContactPage() {
  const [req, setReq] = useState<StoredRequest | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("mpc_last_request");
    if (!raw) return;
    try {
      setReq(JSON.parse(raw));
    } catch {
      setReq(null);
    }
  }, []);

  const whatsappLink = useMemo(() => {
    if (!req) return `https://wa.me/${WHATSAPP_NUMBER}`;
    const text = encodeURIComponent(
      `Hi M-PCs! My Build Code is ${req.orderNumber}. I’m sending my build file now.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }, [req]);

  const buildFile = useMemo(() => {
    if (!req) return "";

    const lines: string[] = [];
    lines.push("M-PCs Build Request");
    lines.push("-------------------");
    lines.push(`Build Code: ${req.orderNumber}`);
    if (req.title) lines.push(`Build: ${req.title}`);
    lines.push(`Created: ${new Date(req.createdAt).toLocaleString("de-DE")}`);
    lines.push("");
    lines.push("Parts:");
    for (const p of req.parts) {
      lines.push(`- ${p.category}: ${p.name} (${euro(p.price)})`);
    }
    lines.push("");
    lines.push(`Total: ${euro(req.total)}`);
    lines.push("");
    lines.push("Send this file + your Build Code to M-PCs on WhatsApp/Discord.");
    return lines.join("\n");
  }, [req]);

  async function copyCode() {
    if (!req?.orderNumber) return;
    try {
      await navigator.clipboard.writeText(req.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/prebuilts" className="text-white/80 hover:text-white">
            ← back
          </Link>
          <div className="text-purple-300 font-bold">M-pc’s</div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-extrabold">Contact</h1>
          <p className="text-white/70 mt-2">
            Download your build file and send it to us on WhatsApp/Discord.
          </p>
        </div>

        {!req?.parts?.length ? (
          <div className="mt-12 bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 text-white/80">
            No build found. Go back and create a build first.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Your build code</h2>

              <div className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-white/70 text-sm">Build Code</div>
                  <div className="text-3xl font-extrabold">{req.orderNumber}</div>
                  <div className="text-white/60 text-xs mt-1">
                    Remember this code — we’ll ask for it.
                  </div>
                </div>

                <button
                  onClick={copyCode}
                  className="bg-white/85 text-black hover:bg-white transition rounded-2xl px-4 py-3 font-bold"
                >
                  {copied ? "Copied ✅" : "Copy"}
                </button>
              </div>

              <button
                onClick={() => downloadTextFile(`${req.orderNumber}.txt`, buildFile)}
                className="mt-6 w-full bg-purple-500 hover:bg-purple-400 transition rounded-2xl py-4 text-xl font-bold text-indigo-950"
              >
                Download build file
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full text-center bg-white/85 text-black hover:bg-white transition rounded-2xl py-4 text-xl font-bold"
              >
                Contact us on WhatsApp
              </a>

              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full text-center bg-white/10 border border-white/20 hover:bg-white/15 transition rounded-2xl py-4 text-xl font-bold"
              >
                Contact us on Discord
              </a>

              <div className="text-white/70 text-sm mt-3">
                Send the downloaded file + your build code to us. We’ll confirm availability and final price in chat.
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Your build</h2>

              <div className="space-y-3">
                {req.parts.map((p, i) => (
                  <div
                    key={`${p.category}-${i}`}
                    className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold">{p.category}</div>
                      <div className="text-white/80 text-sm">{p.name}</div>
                    </div>
                    <div className="font-semibold">{euro(p.price)}</div>
                  </div>
                ))}

                <div className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-center justify-between mt-4">
                  <div className="font-bold">Total</div>
                  <div className="text-2xl font-extrabold">{euro(req.total)}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
