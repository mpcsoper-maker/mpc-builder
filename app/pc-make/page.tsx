"use client";

import { useMemo, useState } from "react";
import { parts, PartCategory, Part } from "../lib/parts";

type Selected = Partial<Record<PartCategory, string>>;

const categoryLabels: Record<PartCategory, string> = {
  cpu: "CPU",
  gpu: "GPU",
  motherboard: "Motherboard",
  ram: "RAM",
  ssd: "SSD",
  psu: "Power Supply",
  case: "Case",
  cooler: "Cooler",
};

const categories: PartCategory[] = [
  "cpu",
  "gpu",
  "motherboard",
  "ram",
  "ssd",
  "psu",
  "case",
  "cooler",
];

function euro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export default function PcMakePage() {
  const [selected, setSelected] = useState<Selected>({});
  const [search, setSearch] = useState<Partial<Record<PartCategory, string>>>(
    {}
  );

  // AI state
  const [aiText, setAiText] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>("");

  const selectedParts = useMemo(() => {
    return categories
      .map((cat) => {
        const id = selected[cat];
        if (!id) return null;
        const p = parts[cat].find((x) => x.id === id);
        return p ? { cat, part: p } : null;
      })
      .filter(Boolean) as { cat: PartCategory; part: Part }[];
  }, [selected]);

  const total = useMemo(() => {
    return selectedParts.reduce((sum, x) => sum + x.part.price, 0);
  }, [selectedParts]);

  const completedCount = categories.filter((c) => !!selected[c]).length;

  function setPart(cat: PartCategory, id: string) {
    setSelected((prev) => ({
      ...prev,
      [cat]: id === "" ? undefined : id,
    }));
  }

  function setSearchText(cat: PartCategory, text: string) {
    setSearch((prev) => ({
      ...prev,
      [cat]: text,
    }));
  }

  function filteredParts(cat: PartCategory) {
    const q = (search[cat] ?? "").trim().toLowerCase();
    if (!q) return parts[cat];
    return parts[cat].filter((p) => p.name.toLowerCase().includes(q));
  }

  function resetAll() {
    setSelected({});
    setSearch({});
    setAiText("");
    setAiError("");
  }

  async function getAiAdvice() {
    try {
      setAiLoading(true);
      setAiError("");
      setAiText("");

      const payloadParts = selectedParts.map(({ cat, part }) => ({
        category: categoryLabels[cat],
        name: part.name,
        price: part.price,
      }));

      const res = await fetch("/api/build-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parts: payloadParts, total }),
      });

      const text = await res.text();
      let data: any = null;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("API returned non-JSON (likely an error page).");
      }

      if (!res.ok) throw new Error(data?.error || "AI request failed");

      setAiText(data.advice || "No advice returned.");
    } catch (e: any) {
      setAiError(e?.message ?? "AI error");
    } finally {
      setAiLoading(false);
    }
  }

  function goToCheckout() {
    const payload = {
      createdAt: new Date().toISOString(),
      parts: selectedParts.map(({ cat, part }) => ({
        category: categoryLabels[cat],
        id: part.id,
        name: part.name,
        price: part.price,
      })),
      total,
    };

    // ✅ IMPORTANT: key must match checkout page
    localStorage.setItem("mpc_checkout_build", JSON.stringify(payload));

    // ✅ ALWAYS works
    window.location.href = "/checkout";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6">
      {/* Logo */}
      <div className="absolute top-4 left-4 text-purple-400 font-extrabold text-[6.5rem] leading-[0.6] tracking-tighter select-none">
        M-
        <br />
        pc’s
        <div className="h-2 w-40 bg-purple-400 mt-2"></div>
      </div>

      <div className="max-w-5xl mx-auto pt-6">
        <div className="flex flex-col items-center text-center mt-10">
          <h1 className="text-4xl font-extrabold text-gray-100">
            make your own pc
          </h1>
          <p className="text-gray-200/80 mt-2">Prices can be fales.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Parts</h2>
              <button
                onClick={resetAll}
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 transition text-sm"
              >
                Reset
              </button>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => {
                const list = filteredParts(cat);

                return (
                  <div
                    key={cat}
                    className="bg-black/25 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold">
                            {categoryLabels[cat]}
                          </div>
                          <div className="text-sm text-gray-200/70">
                            {selected[cat] ? "Selected" : "Not selected"}
                          </div>
                        </div>

                        <input
                          value={search[cat] ?? ""}
                          onChange={(e) => setSearchText(cat, e.target.value)}
                          placeholder={`Search ${categoryLabels[cat]}...`}
                          className="bg-white/80 text-black rounded-xl px-4 py-2 outline-none w-full md:w-[320px]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <select
                          value={selected[cat] ?? ""}
                          onChange={(e) => setPart(cat, e.target.value)}
                          className="bg-white/80 text-black rounded-xl px-4 py-2 w-full outline-none"
                        >
                          <option value="">Choose {categoryLabels[cat]}</option>
                          {list.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — {euro(p.price)}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => setPart(cat, "")}
                          className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 transition text-sm disabled:opacity-40"
                          disabled={!selected[cat]}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="text-xs text-gray-200/60">
                        Showing {list.length} option(s)
                        {search[cat] ? ` for “${search[cat]}”` : ""}.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 h-fit">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>

            <div className="bg-black/25 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-200/80">Selected</span>
                <span className="font-semibold">
                  {completedCount}/{categories.length}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-gray-200/80">Total</span>
                <span className="text-2xl font-extrabold text-white">
                  {euro(total)}
                </span>
              </div>
            </div>

            <button
              onClick={getAiAdvice}
              disabled={aiLoading || selectedParts.length === 0}
              className="mt-6 w-full bg-purple-500 hover:bg-purple-400 disabled:opacity-60 transition rounded-2xl py-4 text-xl font-bold text-indigo-950"
            >
              {aiLoading ? "AI thinking..." : "AI Advice"}
            </button>

            {aiError ? (
              <div className="mt-3 text-sm bg-red-500/20 border border-red-300/30 rounded-xl p-3">
                {aiError}
              </div>
            ) : null}

            {aiText ? (
              <pre className="mt-3 whitespace-pre-wrap text-sm bg-black/25 border border-white/10 rounded-xl p-3">
                {aiText}
              </pre>
            ) : (
              <p className="text-xs text-gray-200/70 mt-3">
                Click <b>AI Advice</b> for compatibility/bottleneck/value tips.
              </p>
            )}

            {/* ✅ CHECKOUT */}
            <button
              onClick={goToCheckout}
              disabled={selectedParts.length === 0}
              className="mt-4 w-full bg-white/15 hover:bg-white/20 disabled:opacity-60 transition rounded-2xl py-4 text-lg font-bold"
            >
              Continue (Checkout)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
