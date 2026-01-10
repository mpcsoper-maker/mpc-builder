export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-blue-700 text-white relative p-6 overflow-hidden">
      {/* soft background blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-purple-500/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-48 -right-48 w-[620px] h-[620px] bg-blue-400/20 blur-3xl rounded-full" />

      {/* LOGO */}
      <div className="absolute top-4 left-4 text-purple-400 font-extrabold text-[6.5rem] leading-[0.6] tracking-tighter select-none">
        M-
        <br />
        pc’s
        <div className="h-2 w-40 bg-purple-400 mt-2" />
      </div>

      {/* center content */}
      <div className="max-w-3xl mx-auto pt-16">
        {/* SEARCH BAR */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl bg-white/10 border border-white/15 backdrop-blur-xl rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
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
          <p className="text-white/75 mt-3 text-lg">
            Choose parts, see the total price, and get advice.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col items-center justify-center mt-14 gap-6">
          <a
            href="/pc-make"
            className="w-full max-w-xl bg-purple-500 hover:bg-purple-400 transition px-10 py-8 rounded-3xl text-3xl md:text-4xl font-extrabold text-indigo-950 shadow-2xl shadow-purple-500/25 active:scale-[0.99]"
          >
            make your own pc
          </a>

          <a
            href="/pre-builds"
            className="w-full max-w-xl bg-white/10 hover:bg-white/15 transition px-10 py-6 rounded-3xl text-2xl md:text-3xl font-semibold text-white border border-white/15 backdrop-blur-xl shadow-lg active:scale-[0.99]"
          >
            pre-build’s
          </a>
        </div>

        {/* little footer text */}
        <div className="text-center mt-10 text-sm text-white/60">
          New stock drops soon • Germany/EU builds
        </div>
        <div className="text-center mt-10 text-sm text-white/60">
          FREE SHIPPING IN GERMANY 
        </div>
      </div>
    </main>
  );
}
