// 2) app/prebuilts/[slug]/page.tsx
import Link from "next/link";
import { PREBUILTS } from "../../lib/prebuilts";
import ContinueToContactButton from "./ContinueToContactButton";

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function finalPrice(price: number, discount?: number) {
  return Math.max(0, price - (discount ?? 0));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PrebuiltDetailsPage(props: PageProps) {
  const { slug } = await props.params;
  const prebuilt = PREBUILTS.find((p) => p.slug === slug);

  if (!prebuilt) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">Build not found</h1>
          <p className="mt-2 text-white/70">
            Slug received: <code>{slug}</code>
          </p>
          <Link href="/prebuilts" className="text-purple-400 mt-6 inline-block">
            ← back to prebuilts
          </Link>
        </div>
      </main>
    );
  }

  const partsTotal = prebuilt.parts.reduce((sum, p) => sum + (p.price || 0), 0);
  const hasDiscount = !!prebuilt.discount && prebuilt.discount > 0;
  const newPrice = finalPrice(prebuilt.price, prebuilt.discount);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/prebuilts" className="text-white/80 hover:text-white">
            ← back to pre-builts
          </Link>
          <div className="text-purple-300 font-bold">M-pc’s</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Left: image + title + price + continue */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <div className="bg-black/25 rounded-2xl border border-white/10 h-64 flex items-center justify-center text-white/60 relative overflow-hidden">
              No image available

              {hasDiscount && (
                <div className="absolute top-3 right-3 bg-green-400 text-black font-extrabold text-xs px-3 py-1 rounded-full">
                  SALE
                </div>
              )}
            </div>

            <div className="mt-5 flex items-baseline justify-between gap-3">
              <h1 className="text-3xl font-extrabold">{prebuilt.name}</h1>

              <div className="text-right">
                {hasDiscount ? (
                  <>
                    <div className="text-white/60 line-through text-lg">
                      {euro(prebuilt.price)}
                    </div>
                    <div className="text-2xl font-extrabold text-green-400">
                      {euro(newPrice)}
                    </div>
                    <div className="text-xs text-green-200">
                      Save {euro(prebuilt.discount!)}
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-extrabold">{euro(prebuilt.price)}</div>
                )}
              </div>
            </div>

            {/* Saves to localStorage and sends user to /contact (uses discounted total) */}
            <ContinueToContactButton prebuilt={prebuilt} />

            <div className="text-white/60 text-sm mt-2">
              You’ll get a build code + download file to send us on WhatsApp/Discord.
            </div>
          </div>

          {/* Right: parts list */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-4">Components</h2>

            <div className="space-y-3">
              {prebuilt.parts.map((p, i) => (
                <div
                  key={`${p.category}-${i}`}
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
                <div className="font-bold">Parts total</div>
                <div className="text-2xl font-extrabold">{euro(partsTotal)}</div>
              </div>

              {hasDiscount && (
                <div className="bg-green-500/10 rounded-2xl p-4 border border-green-300/20 flex items-center justify-between">
                  <div className="font-bold text-green-200">Discount</div>
                  <div className="text-xl font-extrabold text-green-200">
                    -{euro(prebuilt.discount!)}
                  </div>
                </div>
              )}

              <div className="bg-black/25 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div className="font-bold">Final price</div>
                <div className="text-2xl font-extrabold">{euro(newPrice)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
