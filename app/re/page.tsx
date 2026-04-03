"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { REVIEWS } from "../lib/reviews";

const translations = {
  en: {
    back: "← home",
    heading: "Reviews",
    subtitle: "What our customers say",
    noReviews: "No reviews yet — be the first!",
    reviewCount: (n: number) => `${n} review${n !== 1 ? "s" : ""}`,
    build: (name: string) => `Build: ${name}`,
    spent: "Spent",
    locale: "en-GB",
  },
  de: {
    back: "← Startseite",
    heading: "Bewertungen",
    subtitle: "Was unsere Kunden sagen",
    noReviews: "Noch keine Bewertungen — sei der Erste!",
    reviewCount: (n: number) => `${n} Bewertung${n !== 1 ? "en" : ""}`,
    build: (name: string) => `Build: ${name}`,
    spent: "Ausgegeben",
    locale: "de-DE",
  },
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "text-yellow-400" : "text-white/20"}
          style={{ fontSize: "1.1rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const avgRating =
  REVIEWS.length > 0
    ? (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1)
    : "0";

export default function ReviewsPage() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-4xl mx-auto pt-6">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white/80 hover:text-white transition">
            {t.back}
          </Link>
          <div className="text-purple-300 font-bold text-lg">M-pc&apos;s</div>

          {/* LANGUAGE SWITCHER */}
          <div className="flex items-center gap-1 rounded-full bg-black/35 border border-white/15 backdrop-blur-sm p-1">
            <button
              onClick={() => setLang("en")}
              className={[
                "px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200",
                lang === "en"
                  ? "bg-purple-500 text-white shadow"
                  : "text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              EN
            </button>
            <button
              onClick={() => setLang("de")}
              className={[
                "px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200",
                lang === "de"
                  ? "bg-purple-500 text-white shadow"
                  : "text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              DE
            </button>
          </div>
        </div>

        {/* Title + avg */}
        <div className="text-center mt-6 mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight">{t.heading}</h1>
          <p className="text-white/60 mt-2 text-base">{t.subtitle}</p>

          {REVIEWS.length > 0 && (
            <div className="inline-flex items-center gap-3 mt-5 bg-white/10 backdrop-blur border border-white/10 rounded-full px-5 py-2">
              <span className="text-yellow-400 text-xl tracking-tight">★★★★★</span>
              <span className="font-extrabold text-2xl">{avgRating}</span>
              <span className="text-white/50 text-sm">/ 5</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60 text-sm">{t.reviewCount(REVIEWS.length)}</span>
            </div>
          )}
        </div>

        {/* No reviews state */}
        {REVIEWS.length === 0 && (
          <div className="text-center py-24 text-white/40 text-lg">
            {t.noReviews}
          </div>
        )}

        {/* Review cards */}
        <div className="flex flex-col gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-extrabold text-lg leading-tight">{review.name}</div>
                  {review.build && (
                    <div className="text-purple-300 text-sm mt-0.5">
                      {t.build(review.build)}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <Stars rating={review.rating} />
                  <div className="text-white/50 text-xs mt-1">{formatDate(review.date, t.locale)}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Review text */}
              <p className="text-white/80 text-base leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Image (if provided) */}
              {review.image && (
                <div className="mt-4 relative w-full h-56 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={review.image}
                    alt={`${review.name}'s build`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Amount spent */}
              <div className="mt-4 inline-flex items-center gap-2 bg-black/25 border border-white/10 rounded-full px-4 py-1.5 text-sm">
                <span className="text-white/50">{t.spent}</span>
                <span className="font-bold text-white">{euro(review.amountSpent)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </main>
  );
}