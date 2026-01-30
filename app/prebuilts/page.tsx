// 1) app/prebuilts/page.tsx
import Link from "next/link";
import { PREBUILTS } from "../lib/prebuilts";

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function finalPrice(price: number, discount?: number) {
  return Math.max(0, price - (discount ?? 0));
}

export default function PrebuiltsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white/80 hover:text-white">
            ← home
          </Link>
          <div className="text-purple-300 font-bold">M-pc’s</div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-5xl font-extrabold">Pre-builts</h1>
          <p className="text-white/70 mt-2">
            Pick a ready-to-go build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {PREBUILTS.map((b) => {
            const hasDiscount = !!b.discount && b.discount > 0;
            const newPrice = finalPrice(b.price, b.discount);

            return (
              <Link
                key={b.slug}
                href={`/prebuilts/${b.slug}`}
                className="bg-white/10 backdrop-blur rounded-3xl p-5 border border-white/10 hover:bg-white/15 transition block"
              >
                <div className="bg-black/25 rounded-2xl border border-white/10 h-44 flex items-center justify-center text-white/60 relative overflow-hidden">
                  No image available

                  {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-green-400 text-black font-extrabold text-xs px-3 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <div className="text-xl font-extrabold">{b.name}</div>

                  <div className="text-right">
                    {hasDiscount ? (
                      <>
                        <div className="text-white/60 line-through text-sm">
                          {euro(b.price)}
                        </div>
                        <div className="font-extrabold text-green-400">
                          {euro(newPrice)}
                        </div>
                      </>
                    ) : (
                      <div className="text-white/90 font-bold">{euro(b.price)}</div>
                    )}
                  </div>
                </div>

                <div className="text-white/60 text-sm mt-1">
                  Click to view parts & price
                </div>

                {hasDiscount && (
                  <div className="text-green-200 text-xs mt-2">
                    Save {euro(b.discount!)}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
