"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // lets us trigger a clean enter animation after hydration
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
          pc’s
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
        <div className="relative z-10 flex flex-col items-center justify-center mt-14 gap-6">
          <Link
            href="/pc-make"
            className={[
              "relative group w-full max-w-xl",
              "bg-purple-500 text-indigo-950",
              "px-10 py-8 rounded-3xl",
              "text-3xl md:text-4xl font-extrabold",
              "shadow-2xl shadow-purple-500/25",
              "transition-all duration-200",
              "hover:bg-purple-400 hover:-translate-y-[2px] hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)]",
              "active:translate-y-[0px] active:scale-[0.985]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            ].join(" ")}
          >
            {/* glow ring */}
            <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_0_7px_rgba(168,85,247,0.18)]" />
            <span className="relative">make your own pc</span>
          </Link>

          <Link
            href="/prebuilts"
            className={[
              "relative group w-full max-w-xl",
              "bg-white/10 text-white border border-white/15 backdrop-blur-xl",
              "px-10 py-6 rounded-3xl",
              "text-2xl md:text-3xl font-semibold",
              "shadow-lg",
              "transition-all duration-200",
              "hover:bg-white/15 hover:-translate-y-[2px] hover:border-white/25 hover:shadow-[0_16px_55px_rgba(0,0,0,0.40)]",
              "active:translate-y-[0px] active:scale-[0.985]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            ].join(" ")}
          >
            <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_0_7px_rgba(255,255,255,0.10)]" />
            <span className="relative">pre-build’s</span>
          </Link>
        </div>

        {/* little footer text */}
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
    </main>
  );
}
