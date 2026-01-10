"use client";

import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative">

      {/* LOGO */}
      <div className="absolute top-3 left-3 text-purple-400 font-extrabold text-[6.5rem] leading-[0.6] tracking-tighter">
  M-
  <br />
  pc’s
  <div className="h-2 w-40 bg-purple-400 mt-2"></div>
</div>


      {/* TEXT */}
      <h1 className="text-4xl mb-10 text-gray-200">welcome</h1>

      {/* BUTTON */}
      <button
        onClick={() => router.push("/home")}
        className="bg-gray-200 text-purple-500 px-16 py-4 rounded-full text-2xl font-semibold hover:bg-white transition"
      >
        continue
      </button>

    </main>
  );
}
