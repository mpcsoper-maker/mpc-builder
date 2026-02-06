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
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

const WHATSAPP_NUMBER = "491603357458"; // no +
const DISCORD_INVITE = "https://discord.gg/2K2tzrYrn5";
const TELEGRAM_USERNAME = "mpcs_support"; // without @

export default function ContactPage() {
  const [req, setReq] = useState<StoredRequest | null>(null);
  const [copied, setCopied] = useState<"none" | "build" | "discord">("none");

  useEffect(() => {
    const raw = localStorage.getItem("mpc_last_request");
    if (!raw) return;
    try {
      setReq(JSON.parse(raw));
    } catch {
      setReq(null);
    }
  }, []);

  /** FULL BUILD TEXT */
  const buildMessage = useMemo(() => {
    if (!req) return "";

    const lines: string[] = [];
    lines.push("Hi M-PCs 👋");
    lines.push("");
    lines.push(`Build Code: ${req.orderNumber}`);
    if (req.title) lines.push(`Build: ${req.title}`);
    lines.push(
      `Created: ${new Date(req.createdAt).toLocaleString("de-DE")}`
    );
    lines.push("");
    lines.push("Parts:");
    for (const p of req.parts) {
      lines.push(`- ${p.category}: ${p.name} (${euro(p.price)})`);
    }
    lines.push("");
    lines.push(`Total: ${euro(req.total)}`);
    lines.push("");
    lines.push("Please confirm availability and final price. Thanks!");

    return lines.join("\n");
  }, [req]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage
    )}`;
  }, [buildMessage]);

  const telegramLink = useMemo(() => {
    return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(
      buildMessage
    )}`;
  }, [buildMessage]);

  async function copyBuild() {
    try {
      await navigator.clipboard.writeText(buildMessage);
      setCopied("build");
      setTimeout(() => setCopied("none"), 1500);
    } catch {}
  }

  async function sendToDiscord() {
    try {
      await navigator.clipboard.writeText(buildMessage);
      setCopied("discord");
      setTimeout(() => setCopied("none"), 1500);
      window.open(DISCORD_INVITE, "_blank");
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
            
          </p>
        </div>

        {!req?.parts?.length ? (
          <div className="mt-12 bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 text-white/80">
            No build found. Go back and create a build first.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {/* LEFT */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4"></h2>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-green-500 hover:bg-green-400 transition rounded-2xl py-4 text-xl font-bold text-black"
              >
                Send via WhatsApp
              </a>

              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full text-center bg-sky-400 hover:bg-sky-300 transition rounded-2xl py-4 text-xl font-bold text-black"
              >
                Send via Telegram
              </a>

              <button
                onClick={sendToDiscord}
                className="mt-3 w-full bg-indigo-500 hover:bg-indigo-400 transition rounded-2xl py-4 text-xl font-bold"
              >
                {copied === "discord"
                  ? "Copied! Paste in Discord ✅"
                  : "Send via Discord"}
              </button>

              <button
                onClick={copyBuild}
                className="mt-3 w-full bg-white/85 text-black hover:bg-white transition rounded-2xl py-4 text-xl font-bold"
              >
                {copied === "build"
                  ? "Build copied ✅"
                  : "Copy build to clipboard"}
              </button>

              <div className="text-white/70 text-sm mt-3">
                for discord you need to copy.
              </div>
            </div>

            {/* RIGHT */}
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
                  <div className="text-2xl font-extrabold">
                    {euro(req.total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
