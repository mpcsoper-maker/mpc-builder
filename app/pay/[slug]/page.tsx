// app/pay/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getOrder } from "@/app/lib/orders";

function money(currency: string, amount: number) {
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export default async function PayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const order = getOrder(slug);
  if (!order) return notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* background glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Secure payment link
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {order.title}
          </h1>

          <p className="mt-2 text-zinc-400">
            Order for{" "}
            <span className="font-semibold text-zinc-100">
              {order.customerName}
            </span>{" "}
            • <span className="font-mono">{order.slug}</span>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* left: order details */}
          <section className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
              <h2 className="text-lg font-semibold">Order details</h2>

              {order.items?.length ? (
                <div className="mt-4 grid gap-3">
                  {order.items.map((it) => (
                    <div
                      key={it.label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800/70 px-4 py-3"
                    >
                      <span className="text-zinc-400">{it.label}</span>
                      <span className="font-medium">{it.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-400">
                  Build details not added.
                </p>
              )}

              {order.notes ? (
                <div className="mt-5 rounded-xl border border-white/10 bg-zinc-800/60 p-4 text-sm text-zinc-300">
                  <span className="font-semibold text-zinc-100">Note:</span>{" "}
                  {order.notes}
                </div>
              ) : null}
            </div>
          </section>

          {/* right: payment */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl">
              <h2 className="text-lg font-semibold">Pay now</h2>

              <div className="mt-4 rounded-xl border border-white/10 bg-zinc-800/70 p-4">
                <div className="text-sm text-zinc-400">Total</div>
                <div className="mt-1 text-3xl font-semibold">
                  {money(order.currency, order.price)}
                </div>
                <div className="mt-2 text-xs text-zinc-500">
                  You will be redirected to PayPal to complete payment.
                </div>
              </div>

              <a
                href={order.paypalLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block w-full rounded-xl bg-[#0070BA] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#005EA6]"
              >
                Pay with PayPal →
              </a>

              <p className="mt-4 text-center text-xs text-zinc-500">
                MPCs • Private payment link
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
