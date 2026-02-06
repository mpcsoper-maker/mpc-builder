"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Welcome() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  // Review bar: show once on load, then hide forever (until refresh)
  const [showReview, setShowReview] = useState(true);

  const exitMs = 520;

  // timings for review popup
  const popInMs = 450;     // animation time
  const visibleMs = 3200;  // how long it stays visible before hiding

  useEffect(() => {
    // show on first render, hide after visibleMs
    const t = window.setTimeout(() => setShowReview(false), visibleMs);
    return () => window.clearTimeout(t);
  }, []);

  const onContinue = () => {
    if (leaving) return;
    setLeaving(true);
    setShowReview(false); // hide immediately when leaving
    window.setTimeout(() => router.push("/home"), exitMs);
  };

  const logoClass = useMemo(() => {
    return (
      "absolute top-3 left-3 text-purple-400 font-extrabold " +
      "text-[5rem] sm:text-[6.5rem] leading-[0.6] tracking-tighter " +
      "transition-all duration-700 ease-out " +
      (leaving
        ? "opacity-0 -translate-y-2 blur-[2px]"
        : "opacity-100 translate-y-0")
    );
  }, [leaving]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative overflow-hidden">
      {/* soft background glow */}
      <div
        className={
          "pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full " +
          "bg-purple-500/20 blur-[80px] " +
          "transition-all duration-700 ease-out " +
          (leaving ? "opacity-0 scale-95" : "opacity-100 scale-100")
        }
      />
      <div
        className={
          "pointer-events-none absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full " +
          "bg-blue-400/20 blur-[90px] " +
          "transition-all duration-700 ease-out " +
          (leaving ? "opacity-0 scale-95" : "opacity-100 scale-100")
        }
      />

      {/* LOGO */}
      <div className={logoClass}>
        M-
        <br />
        pc’s
        <div className="h-2 w-32 sm:w-40 bg-purple-400 mt-2" />
      </div>

      {/* TOP REVIEW BAR: pops down then goes back up once */}
      <div
        className={[
          "absolute top-4 left-1/2 -translate-x-1/2 z-20",
          "w-[calc(100%-1.25rem)] max-w-[720px]",
          "px-3 py-2 rounded-2xl",
          "bg-black/35 border border-white/15",
          "backdrop-blur-sm",
          "will-change-transform",
          "transition-all",
          `duration-[${popInMs}ms]`,
          leaving
            ? "opacity-0 -translate-y-3 pointer-events-none"
            : showReview
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none",
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
            <span className="line-clamp-2 sm:line-clamp-1">
              good service, fast response
            </span>
          </div>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <section
        className={[
          "flex flex-col items-center text-center max-w-md px-4",
          "transition-all duration-700 ease-out",
          "animate-[welcomeIn_700ms_ease-out_forwards]",
          leaving ? "opacity-0 translate-y-3 scale-[0.99] blur-[2px]" : "",
        ].join(" ")}
      >
        <h1
          className={[
            "text-3xl sm:text-4xl md:text-5xl mb-3 tracking-wide text-gray-200",
            "transition-all duration-500",
            leaving ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0",
          ].join(" ")}
        >
          welcome
        </h1>

        <p
          className={[
            "text-sm sm:text-base text-white/75 mb-6",
            "transition-all duration-500",
            leaving ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0",
          ].join(" ")}
        >
          We accept PayPal, Apple Pay, debit card & credit card
        </p>

        <button
          onClick={onContinue}
          disabled={leaving}
          className={[
            "relative group",
            "bg-gray-200 text-purple-600 px-12 sm:px-16 py-4 rounded-full text-xl sm:text-2xl font-semibold",
            "transition-all duration-200",
            "hover:bg-white hover:-translate-y-[1px] hover:shadow-[0_14px_45px_rgba(0,0,0,0.35)]",
            "active:scale-[0.98]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            "disabled:opacity-70 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_0_6px_rgba(168,85,247,0.15)]" />
          <span className="relative">{leaving ? "loading..." : "continue"}</span>
        </button>
      </section>

      <style jsx>{`
        @keyframes welcomeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>
    </main>
  );
}
