// app/reviews/page.tsx
import Link from "next/link";
import Image from "next/image";
import { REVIEWS } from "../lib/reviews";

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n);
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "text-yellow-400" : "text-white/20"}
          style={{ fontSize: "1.1rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const avgRating =
  REVIEWS.length > 0
    ? (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1)
    : "0";

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      <div className="max-w-4xl mx-auto pt-6">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white/80 hover:text-white transition">
            ← home
          </Link>
          <div className="text-purple-300 font-bold text-lg">M-pc&apos;s</div>
        </div>

        {/* Title + avg */}
        <div className="text-center mt-6 mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight">Reviews</h1>
          <p className="text-white/60 mt-2 text-base">
            What our customers say
          </p>

          {REVIEWS.length > 0 && (
            <div className="inline-flex items-center gap-3 mt-5 bg-white/10 backdrop-blur border border-white/10 rounded-full px-5 py-2">
              <span className="text-yellow-400 text-xl tracking-tight">★★★★★</span>
              <span className="font-extrabold text-2xl">{avgRating}</span>
              <span className="text-white/50 text-sm">/ 5</span>
              <span className="text-white/30">·</span>
              <span className="text-white/60 text-sm">{REVIEWS.length} review{REVIEWS.length !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* No reviews state */}
        {REVIEWS.length === 0 && (
          <div className="text-center py-24 text-white/40 text-lg">
            No reviews yet — be the first!
          </div>
        )}

        {/* Review cards */}
        <div className="flex flex-col gap-5">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-extrabold text-lg leading-tight">{review.name}</div>
                  {review.build && (
                    <div className="text-purple-300 text-sm mt-0.5">
                      Build: {review.build}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <Stars rating={review.rating} />
                  <div className="text-white/50 text-xs mt-1">{formatDate(review.date)}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Review text */}
              <p className="text-white/80 text-base leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Image (if provided) */}
              {review.image && (
                <div className="mt-4 relative w-full h-56 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={review.image}
                    alt={`${review.name}'s build`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Amount spent */}
              <div className="mt-4 inline-flex items-center gap-2 bg-black/25 border border-white/10 rounded-full px-4 py-1.5 text-sm">
                <span className="text-white/50">Spent</span>
                <span className="font-bold text-white">{euro(review.amountSpent)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </main>
  );
}