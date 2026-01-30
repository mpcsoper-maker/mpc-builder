// 3) app/prebuilts/[slug]/ContinueToContactButton.tsx
"use client";

import { useRouter } from "next/navigation";

type Part = { category: string; name: string; price: number };
type Prebuilt = { name: string; price: number; discount?: number; parts: Part[] };

function makeOrderNumber() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `MPCS-${num}`;
}

function finalPrice(price: number, discount?: number) {
  return Math.max(0, price - (discount ?? 0));
}

export default function ContinueToContactButton({ prebuilt }: { prebuilt: Prebuilt }) {
  const router = useRouter();

  function go() {
    const req = {
      orderNumber: makeOrderNumber(),
      createdAt: new Date().toISOString(),
      parts: prebuilt.parts,
      total: finalPrice(prebuilt.price, prebuilt.discount), // ✅ uses discounted price
      source: "prebuilt" as const,
      title: prebuilt.name,
      discount: prebuilt.discount ?? 0,
      originalPrice: prebuilt.price,
    };

    localStorage.setItem("mpc_last_request", JSON.stringify(req));
    router.push("/contact");
  }

  return (
    <button
      onClick={go}
      className="mt-6 w-full bg-purple-500 hover:bg-purple-400 transition rounded-2xl py-4 text-xl font-bold text-indigo-950"
    >
      Continue to Contact
    </button>
  );
}
