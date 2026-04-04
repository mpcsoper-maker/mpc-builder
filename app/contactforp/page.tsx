"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "491603357458";
const DISCORD_INVITE = "https://discord.gg/2K2tzrYrn5";
const TELEGRAM_USERNAME = "mpcs_support";

const contacts = [
  {
    label: "WhatsApp",
    description: "Chat with us directly",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    className: "bg-green-500 hover:bg-green-400 text-black",
  },
  {
    label: "Telegram",
    description: "Message us on Telegram",
    href: `https://t.me/${TELEGRAM_USERNAME}`,
    className: "bg-sky-400 hover:bg-sky-300 text-black",
  },
  {
    label: "Discord",
    description: "Join our server",
    href: DISCORD_INVITE,
    className: "bg-indigo-500 hover:bg-indigo-400 text-white",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white p-6">
      <div className="max-w-xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white/80 hover:text-white">
            back
          </Link>
          <div className="text-purple-300 font-bold">M-pc&apos;s</div>
        </div>

        <div className="text-center mt-10 mb-10">
          <h1 className="text-5xl font-extrabold">Contact</h1>
          <p className="text-white/70 mt-2">Reach out to us on any platform below</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 space-y-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between w-full ${c.className} transition rounded-2xl px-6 py-4 font-bold text-lg`}
            >
              <span>{c.label}</span>
              <span className="text-sm font-normal opacity-80">{c.description}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}