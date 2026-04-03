"use client";

import { notFound } from "next/navigation";
import { getOrder } from "@/app/lib/orders";
import { useLang } from "@/app/lib/useLang";
import { use } from "react";

const translations = {
  en: {
    secureLink: "Secure payment link",
    orderFor: "Order for",
    orderDetails: "Order details",
    noBuildDetails: "Build details not added.",
    note: "Note:",
    payNow: "Pay now",
    total: "Total",
    payCard: "Pay by Card →",
    cardNote: "Credit / debit card via Stripe · 2.9% + $0.30",
    payPal: "Pay with PayPal →",
    paypalNote: "PayPal · ~3.49% + $0.49",
    footer: "MPCs • Private payment link",
  },
  de: {
    secureLink: "Sicherer Zahlungslink",
    orderFor: "Bestellung für",
    orderDetails: "Bestelldetails",
    noBuildDetails: "Keine Build-Details hinzugefügt.",
    note: "Hinweis:",
    payNow: "Jetzt bezahlen",
    total: "Gesamt",
    payCard: "Per Karte bezahlen →",
    cardNote: "Kredit- / Debitkarte via Stripe · 2,9 % + 0,30 $",
    payPal: "Mit PayPal bezahlen →",
    paypalNote: "PayPal · ~3,49 % + 0,49 $",
    footer: "MPCs • Privater Zahlungslink",
  },
};

function money(currency: string, amount: number) {
  try {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export default function PayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const order = getOrder(slug);
  if (!order) return notFound();

  const { lang, setLang } = useLang();
  const t = translations[lang];

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* background glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-600/15 blur-3xl" />

      {/* LANGUAGE SWITCHER */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1 rounded-full bg-white/5 border border-white/15 backdrop-blur-sm p-1">
        <button
          onClick={() => setLang("en")}
          className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "en" ? "bg-indigo-600 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}
        >EN</button>
        <button
          onClick={() => setLang("de")}
          className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "de" ? "bg-indigo-600 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}
        >DE</button>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {t.secureLink}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{order.title}</h1>

          <p className="mt-2 text-zinc-400">
            {t.orderFor}{" "}
            <span className="font-semibold text-zinc-100">{order.customerName}</span>{" "}
            • <span className="font-mono">{order.slug}</span>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* left: order details */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
              <h2 className="text-lg font-semibold">{t.orderDetails}</h2>

              {order.items?.length ? (
                <div className="mt-4 grid gap-3">
                  {order.items.map((it: { label: string; value: string }) => (
                    <div key={it.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800/70 px-4 py-3">
                      <span className="text-zinc-400">{it.label}</span>
                      <span className="font-medium">{it.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-400">{t.noBuildDetails}</p>
              )}

              {order.notes && (
                <div className="mt-5 rounded-xl border border-white/10 bg-zinc-800/60 p-4 text-sm text-zinc-300">
                  <span className="font-semibold text-zinc-100">{t.note}</span>{" "}
                  {order.notes}
                </div>
              )}
            </div>
          </section>

          {/* right: payment */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
              <h2 className="text-lg font-semibold">{t.payNow}</h2>

              <div className="mt-4 rounded-xl border border-white/10 bg-zinc-800/70 p-4">
                <div className="text-sm text-zinc-400">{t.total}</div>
                <div className="mt-1 text-3xl font-semibold">{money(order.currency, order.price)}</div>
              </div>

              <div className="mt-5 grid gap-3">
                {order.stripeLink && (
                  <div>
                    <a href={order.stripeLink} target="_blank" rel="noreferrer" className="block w-full rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-500">
                      {t.payCard}
                    </a>
                    <p className="mt-1 text-center text-xs text-zinc-500">{t.cardNote}</p>
                  </div>
                )}

                {order.paypalLink && (
                  <div>
                    <a href={order.paypalLink} target="_blank" rel="noreferrer" className="block w-full rounded-xl bg-[#0070BA] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#005EA6]">
                      {t.payPal}
                    </a>
                    <p className="mt-1 text-center text-xs text-zinc-500">{t.paypalNote}</p>
                  </div>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-zinc-500">{t.footer}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}