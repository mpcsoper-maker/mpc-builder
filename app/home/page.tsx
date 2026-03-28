"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 20);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6 overflow-hidden">
      {/* soft background blobs */}
      <div
        className={[
          "pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] bg-purple-500/25 blur-3xl rounded-full",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none absolute -bottom-48 -right-48 w-[620px] h-[620px] bg-blue-400/20 blur-3xl rounded-full",
          "transition-all duration-700 ease-out delay-75",
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      />

      {/* LOGO */}
      <div
        className={[
          "pointer-events-none absolute top-4 left-4 text-purple-400 font-extrabold tracking-tighter select-none leading-[0.75]",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 blur-[2px]",
        ].join(" ")}
      >
        <div className="text-[4.2rem] sm:text-[5.2rem] md:text-[6.5rem]">
          M-
          <br />
          pc's
        </div>
        <div className="h-2 w-28 sm:w-36 md:w-40 bg-purple-400 mt-2" />
      </div>

      {/* CONTENT WRAP */}
      <div
        className={[
          "max-w-3xl mx-auto pt-40 sm:pt-44 md:pt-16",
          "transition-all duration-700 ease-out",
          mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-[3px]",
        ].join(" ")}
      >
        {/* SEARCH BAR */}
        <div className="flex justify-center">
          <div
            className={[
              "w-full max-w-xl bg-white/10 border border-white/15 backdrop-blur-xl rounded-full px-4 py-3 flex items-center gap-3 shadow-lg",
              "transition-all duration-200",
              "hover:bg-white/12 hover:border-white/20 hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]",
            ].join(" ")}
          >
            <div className="w-2 h-2 rounded-full bg-purple-300" />
            <input
              placeholder="search (CPUs, GPUs, builds...)"
              className="w-full bg-transparent text-center text-lg outline-none placeholder:text-white/60"
            />
          </div>
        </div>

        {/* headline */}
        <div className="text-center mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            build your dream pc
          </h1>
          <p className="text-white/75 mt-3 text-lg"></p>
        </div>

        {/* BUTTONS */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-14 gap-4">

          {/* PREBUILTS — hero button */}
          <Link
            href="/prebuilts"
            className={[
              "relative group w-full max-w-xl",
              "px-10 py-8 rounded-3xl",
              "text-3xl md:text-4xl font-extrabold text-white",
              "shadow-2xl",
              "transition-all duration-200",
              "hover:-translate-y-[3px]",
              "active:translate-y-[0px] active:scale-[0.985]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            ].join(" ")}
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
              boxShadow: "0 0 40px rgba(124,58,237,0.5), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* animated shimmer */}
            <span className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  transform: "translateX(-100%)",
                  animation: "shimmer 1.2s ease forwards",
                }}
              />
            </span>

            <span className="relative flex items-center justify-between">
              <span>
                pre-builds
                <span className="block text-sm font-normal text-white/70 mt-1">
                  ready-to-order
                </span>
              </span>
              <span className="text-4xl">→</span>
            </span>

            {/* HOT badge */}
            <span className="absolute -top-3 -right-3 bg-orange-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg rotate-3">
              ⭐ RECOMMENDED
            </span>
          </Link>

          {/* divider */}
          <div className="flex items-center gap-3 w-full max-w-xl text-white/30 text-sm">
            <div className="flex-1 h-px bg-white/15" />
            or
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* CUSTOM — secondary */}
          <Link
            href="/pc-make"
            className={[
              "relative group w-full max-w-xl",
              "bg-white/8 text-white/80 border border-white/12 backdrop-blur-xl",
              "px-10 py-5 rounded-3xl",
              "text-xl font-semibold",
              "transition-all duration-200",
              "hover:bg-white/12 hover:-translate-y-[1px] hover:text-white",
              "active:translate-y-[0px] active:scale-[0.985]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            ].join(" ")}
          >
            <span className="absolute -top-3 -right-3 bg-blue-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-lg rotate-3">
              🔧 ADVANCED
            </span>
            <span className="relative flex items-center justify-between">
              <span>make your own pc</span>
              <span className="text-2xl opacity-50 group-hover:opacity-80 transition-opacity">→</span>
            </span>
          </Link>
        </div>

        {/* footer text */}
        <div
          className={[
            "text-center mt-10 text-sm text-white/60",
            "transition-all duration-700 ease-out delay-100",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          ].join(" ")}
        >
          FREE SHIPPING IN GERMANY
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 1; }
        }
      `}</style>
    </main>
  );
}