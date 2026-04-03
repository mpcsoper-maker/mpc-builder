"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "./lib/useLang";

const translations = {
  en: {
    badge: "build your dream pc",
    heading: "welcome",
    accepts: "We accept",
    cta: "continue",
    loading: "loading...",
    shipping: "FREE SHIPPING IN GERMANY",
    reviews: "see all reviews →",
  },
  de: {
    badge: "Bau deinen Traum-PC",
    heading: "Willkommen",
    accepts: "Wir akzeptieren",
    cta: "weiter",
    loading: "Lädt...",
    shipping: "KOSTENLOSER VERSAND IN DEUTSCHLAND",
    reviews: "Alle Bewertungen →",
  },
};

export default function Welcome() {
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [leaving, setLeaving] = useState(false);
  const [showReview, setShowReview] = useState(true);
  const [mounted, setMounted] = useState(false);

  const t = translations[lang];
  const exitMs = 520;
  const visibleMs = 6000;

  useEffect(() => {
    const m = window.setTimeout(() => setMounted(true), 30);
    const t = window.setTimeout(() => setShowReview(false), visibleMs);
    return () => { window.clearTimeout(t); window.clearTimeout(m); };
  }, []);

  const onContinue = () => {
    if (leaving) return;
    setLeaving(true);
    setShowReview(false);
    window.setTimeout(() => router.push("/home"), exitMs);
  };

  const logoClass = useMemo(() => {
    return (
      "absolute top-3 left-3 text-purple-400 font-extrabold " +
      "text-[5rem] sm:text-[6.5rem] leading-[0.6] tracking-tighter " +
      "transition-all duration-700 ease-out " +
      (leaving ? "opacity-0 -translate-y-2 blur-[2px]" : "opacity-100 translate-y-0")
    );
  }, [leaving]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative overflow-hidden">
      <div className={
        "pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full " +
        "bg-purple-500/20 blur-[80px] transition-all duration-700 ease-out " +
        (leaving ? "opacity-0 scale-95" : "opacity-100 scale-100")
      } />
      <div className={
        "pointer-events-none absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full " +
        "bg-blue-400/20 blur-[90px] transition-all duration-700 ease-out " +
        (leaving ? "opacity-0 scale-95" : "opacity-100 scale-100")
      } />

      {/* LOGO */}
      <div className={logoClass}>
        M-<br />pc&apos;s
        <div className="h-2 w-32 sm:w-40 bg-purple-400 mt-2" />
      </div>

      {/* LANGUAGE SWITCHER */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1 rounded-full bg-black/35 border border-white/15 backdrop-blur-sm p-1">
        <button
          onClick={() => setLang("en")}
          className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "en" ? "bg-purple-500 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}
        >EN</button>
        <button
          onClick={() => setLang("de")}
          className={["px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200", lang === "de" ? "bg-purple-500 text-white shadow" : "text-white/50 hover:text-white/80"].join(" ")}
        >DE</button>
      </div>

      {/* REVIEW BAR */}
      <Link
        href="/re"
        className={[
          "absolute top-4 left-1/2 -translate-x-1/2 z-20",
          "w-[calc(100%-1.25rem)] max-w-[720px]",
          "px-3 py-2 rounded-2xl bg-black/35 border border-white/15 backdrop-blur-sm cursor-pointer",
          "hover:bg-black/50 hover:border-white/30 transition-colors duration-200",
          "transition-all duration-500",
          leaving || !showReview
            ? "opacity-0 -translate-y-6 pointer-events-none"
            : mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6",
        ].join(" ")}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 text-[12px] sm:text-sm text-white/90 leading-snug">
          <div className="flex items-center justify-center gap-2">
            <span className="text-yellow-400 tracking-tight">★★★★☆</span>
            <span className="font-medium">4.5</span>
            <span className="text-white/60">/ 5</span>
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <div className="text-center sm:text-left text-white/80 break-words">
            <span className="font-medium text-white/90">Lucko</span>
            <span className="text-white/60"> — </span>
            <span className="whitespace-nowrap">€1,599</span>
            <span className="text-white/60"> • </span>
            <span className="line-clamp-2 sm:line-clamp-1">good service, fast response</span>
          </div>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/50 text-xs">{t.reviews}</span>
        </div>
      </Link>

      {/* CENTER CONTENT */}
      <section className={[
        "flex flex-col items-center text-center max-w-md px-4 transition-all duration-700 ease-out",
        mounted && !leaving ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-[3px]",
      ].join(" ")}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase bg-white/10 border border-white/20 text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
          {t.badge}
        </div>

        <h1 className={["text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 tracking-tight transition-all duration-500", leaving ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"].join(" ")}>
          {t.heading}
        </h1>

        <p className={["text-sm sm:text-base text-white/70 mb-4 transition-all duration-500", leaving ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"].join(" ")}>
          {t.accepts}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {["💳 Card", "🟠 Klarna"].map((m) => (
            <span key={m} className="text-xs font-medium px-3 py-1.5 rounded-full text-white/80 bg-white/10 border border-white/15">
              {m}
            </span>
          ))}
        </div>

        <button
          onClick={onContinue}
          disabled={leaving}
          className={[
            "relative group bg-gray-200 text-purple-700 px-14 sm:px-16 py-4 rounded-full text-xl sm:text-2xl font-bold",
            "transition-all duration-200 hover:bg-white hover:-translate-y-[2px] hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]",
            "active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:opacity-70 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_0_6px_rgba(168,85,247,0.15)]" />
          <span className="relative flex items-center gap-2">
            {leaving ? (
              <><span className="w-4 h-4 border-2 border-purple-400/40 border-t-purple-600 rounded-full animate-spin" />{t.loading}</>
            ) : (
              <>{t.cta}<span className="transition-transform duration-200 group-hover:translate-x-1">→</span></>
            )}
          </span>
        </button>

        <p className="mt-5 text-white/30 text-xs tracking-wide">{t.shipping}</p>
      </section>

      <style jsx>{`
        @keyframes welcomeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.99); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0px)  scale(1);    filter: blur(0px); }
        }
      `}</style>
    </main>
  );
}