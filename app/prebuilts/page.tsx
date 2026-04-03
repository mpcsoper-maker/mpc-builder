"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../lib/useLang";
import { PREBUILTS } from "../lib/prebuilts";

const translations = {
  en: {
    back: "← home",
    heading: "Pre-builts",
    subtitle: "Pick a ready-to-go build.",
    noImage: "No image available",
    sale: "SALE",
    clickView: "Click to view parts & price",
    save: (amount: string) => `Save ${amount}`,
  },
  de: {
    back: "← Startseite",
    heading: "Fertig-PCs",
    subtitle: "Wähle einen sofort bestellbaren PC.",
    noImage: "Kein Bild verfügbar",
    sale: "ANGEBOT",
    clickView: "Klicken für Teile & Preis",
    save: (amount: string) => `Spare ${amount}`,
  },
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function finalPrice(price: number, discount?: number) {
  return Math.max(0, price - (discount ?? 0));
}

export default function PrebuiltsPage() {
  const { lang, setLang } = useLang();
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white/80 hover:text-white">{t.back}</Link>
          <div className="text-purple-300 font-bold">M-pc's</div>

          {/* LANGUAGE SWITCHER */}
          <div className="flex items-center gap-1 rounded-full bg-black/35 border border-white/15 backdrop-blur-sm p-1">
            <button onClick={() => setLang("en")} className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "en" ? "bg-purple-500 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}>EN</button>
            <button onClick={() => setLang("de")} className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "de" ? "bg-purple-500 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}>DE</button>
          </div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-extrabold">{t.heading}</h1>
          <p className="text-white/70 mt-2">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {PREBUILTS.map((b) => {
            const hasDiscount = !!b.discount && b.discount > 0;
            const newPrice = finalPrice(b.price, b.discount);

            return (
              <Link key={b.slug} href={`/prebuilts/${b.slug}`} className="bg-white/10 backdrop-blur rounded-3xl p-5 border border-white/10 hover:bg-white/15 transition block">
                <div className="bg-black/25 rounded-2xl border border-white/10 h-44 flex items-center justify-center text-white/60 relative overflow-hidden">
                  {b.image ? (
                    <Image src={b.image} alt={b.name} fill className="object-contain" />
                  ) : (
                    <span>{t.noImage}</span>
                  )}
                  {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-green-400 text-black font-extrabold text-xs px-3 py-1 rounded-full">{t.sale}</div>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div className="text-xl font-extrabold">{b.name}</div>
                  <div className="text-right">
                    {hasDiscount ? (
                      <>
                        <div className="text-white/60 line-through text-sm">{euro(b.price)}</div>
                        <div className="font-extrabold text-green-400">{euro(newPrice)}</div>
                      </>
                    ) : (
                      <div className="text-white/90 font-bold">{euro(b.price)}</div>
                    )}
                  </div>
                </div>

                <div className="text-white/60 text-sm mt-1">{t.clickView}</div>
                {hasDiscount && <div className="text-green-200 text-xs mt-2">{t.save(euro(b.discount!))}</div>}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}