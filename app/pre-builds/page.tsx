"use client";

import Link from "next/link";

export default function PreBuildsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f2c] via-[#2b2f8f] to-[#5b2bbf] text-white">
      <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-xl w-full text-center border border-white/20">
        <h1 className="text-4xl font-bold mb-6 text-purple-300">
          Pre-Built PCs
        </h1>

        <p className="text-lg text-gray-200 mb-8">
          We currently don’t have any pre-built PCs available.
        </p>

        <p className="text-sm text-gray-400 mb-10">
          Our team is working on high-quality gaming builds.  
          Please check back soon or build your own custom PC now.
        </p>

        <Link href="/pc-make">
          <button className="px-8 py-4 rounded-full bg-purple-500 hover:bg-purple-600 transition font-semibold shadow-lg">
            Build Your Own PC
          </button>
        </Link>
      </div>
    </div>
  );
}
