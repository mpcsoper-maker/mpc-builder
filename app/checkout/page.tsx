"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type BuildItem = {
  category: string;
  id: string;
  name: string;
  price: number;
};

type StoredBuild = {
  createdAt: string;
  parts: BuildItem[];
  total: number;
};

type StoredRequest = {
  orderNumber: string;
  createdAt: string;
  parts: BuildItem[];
  total: number;
};

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function makeOrderNumber() {
  const num = Math.floor(10000 + Math.random() * 90000); // 5 digits
  return `MPCS-${num}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [build, setBuild] = useState<StoredBuild | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("mpc_checkout_build");
    if (raw) {
      try {
        setBuild(JSON.parse(raw));
      } catch {
        setBuild(null);
      }
    }
  }, []);

  const total = useMemo(() => build?.total ?? 0, [build]);

  function continueToContact() {
    try {
      setError("");
      setLoading(true);

      if (!build?.parts?.length) {
        throw new Error("No build found. Go back and select parts first.");
      }

      const req: StoredRequest = {
        orderNumber: makeOrderNumber(),
        createdAt: new Date().toISOString(),
        parts: build.parts,
        total: build.total,
      };

      // Save the latest request for the next page
      localStorage.setItem("mpc_last_request", JSON.stringify(req));

      // Optional: keep a local history (same device only)
      const history = JSON.parse(localStorage.getItem("mpc_requests") || "[]");
      history.unshift(req);
      localStorage.setItem("mpc_requests", JSON.stringify(history));

      // (Optional) Clear builder checkout cache so they don't re-submit by accident
      // If you prefer keeping it, comment this out:
      // localStorage.removeItem("mpc_checkout_build");

      router.push("/contact");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pc-make" className="text-white/80 hover:text-white">
            ← back to builder
          </Link>
          <div className="text-purple-300 font-bold">M-pc’s</div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-extrabold">Checkout</h1>
          <p className="text-white/70 mt-2">
            Review your build, then continue to contact us on WhatsApp/Discord.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Your build</h2>

            {!build?.parts?.length ? (
              <div className="text-white/70">
                No build found. Go back to the builder and click Checkout.
              </div>
            ) : (
              <div className="space-y-3">
                {build.parts.map((p) => (
                  <div
                    key={`${p.category}-${p.id}`}
                    className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="font-semibold">{p.category}</div>
                      <div className="text-white/80 text-sm">{p.name}</div>
                    </div>
                    <div className="font-semibold">{euro(p.price)}</div>
                  </div>
                ))}

                <div className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-center justify-between mt-4">
                  <div className="font-bold">Total</div>
                  <div className="text-2xl font-extrabold">{euro(total)}</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Next step</h2>
            <p className="text-white/70">
              When you continue, you’ll get a build code + download file to send
              us on WhatsApp/Discord.
            </p>

            <button
              onClick={continueToContact}
              disabled={loading || !build?.parts?.length}
              className="mt-6 w-full bg-purple-500 hover:bg-purple-400 disabled:opacity-60 transition rounded-2xl py-4 text-xl font-bold text-indigo-950"
            >
              {loading ? "Loading..." : "Continue to Contact"}
            </button>

            {error && (
              <div className="mt-3 text-sm bg-red-500/20 border border-red-300/30 rounded-xl p-3">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
