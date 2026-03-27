"use client";

import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const [elapsed, setElapsed] = useState(0); // seconds since down

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const hours = Math.floor(elapsed / 3600);
  const mins  = Math.floor((elapsed % 3600) / 60);
  const secs  = elapsed % 60;



  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000 0%, #1e1b4b 55%, #1d4ed8 100%)",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f3f4f6",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes breathe {
          from { opacity: 0.7; transform: scale(1); }
          to   { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px) scale(0.99); filter: blur(3px); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-4deg); }
          50%       { transform: rotate(4deg); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .glow-tr {
          pointer-events: none;
          position: absolute;
          top: -10rem; right: -10rem;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: rgba(168,85,247,0.22);
          filter: blur(80px);
          animation: breathe 6s ease-in-out infinite alternate;
        }
        .glow-bl {
          pointer-events: none;
          position: absolute;
          bottom: -12rem; left: -12rem;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: rgba(96,165,250,0.18);
          filter: blur(90px);
          animation: breathe 6s ease-in-out infinite alternate;
          animation-delay: 2s;
        }
        .logo {
          position: absolute;
          top: 0.75rem; left: 0.85rem;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(4rem, 10vw, 6.5rem);
          line-height: 0.6;
          letter-spacing: -0.04em;
          color: #c084fc;
          animation: fadeSlideDown 0.7s ease-out forwards;
          z-index: 10;
        }
        .logo-bar {
          height: 6px;
          width: clamp(7rem, 18vw, 10rem);
          background: #c084fc;
          margin-top: 0.5rem;
          border-radius: 2px;
        }
        .card {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 480px;
          width: calc(100% - 2rem);
          padding: 2.8rem 2.2rem 2.4rem;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(0,0,0,0.28);
          backdrop-filter: blur(18px);
          animation: fadeUp 0.75s ease-out both;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(10px);
          font-size: 0.78rem;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.6rem;
        }
        .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #f87171;
          box-shadow: 0 0 8px #f87171;
          animation: pulse-dot 1.4s ease-in-out infinite;
        }
        .icon-wrap {
          width: 64px; height: 64px;
          border-radius: 18px;
          background: rgba(168,85,247,0.18);
          border: 1px solid rgba(192,132,252,0.25);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.4rem;
          font-size: 2rem;
          animation: wobble 3s ease-in-out infinite;
        }
        .time-block { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .time-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 6vw, 2.6rem);
          color: #f3f4f6;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 12px;
          width: clamp(60px, 16vw, 76px);
          height: clamp(60px, 16vw, 76px);
          display: flex; align-items: center; justify-content: center;
        }
        .time-label {
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .sep {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #c084fc;
          align-self: flex-start;
          margin-top: 0.8rem;
          animation: blink 1s step-start infinite;
        }


        .uptime-label {
          font-size: 0.72rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.6rem;
        }
      `}</style>

      <div className="glow-tr" />
      <div className="glow-bl" />

      {/* Logo */}
      <div className="logo">
        M-<br />pc&apos;s
        <div className="logo-bar" />
      </div>

      {/* Card */}
      <div className="card">
        <div className="status-pill">
          <div className="dot" />
          servers offline
        </div>

        <div className="icon-wrap">🔧</div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.65rem, 5vw, 2.4rem)",
            lineHeight: 1.15,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          We&apos;ll be back{" "}
          <span style={{ color: "#c084fc" }}>very soon</span>
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.65,
            maxWidth: 340,
            marginBottom: "1.6rem",
          }}
        >
          Sorry for the inconvenience — our servers are currently down for
          maintenance. We&apos;re working on it and will be back shortly.
        </p>

        {/* Uptime counter */}
        <div className="uptime-label">⏱ down for</div>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem" }}>
          <div className="time-block">
            <div className="time-num">{pad(hours)}</div>
            <div className="time-label">Hours</div>
          </div>
          <div className="sep">:</div>
          <div className="time-block">
            <div className="time-num">{pad(mins)}</div>
            <div className="time-label">Mins</div>
          </div>
          <div className="sep">:</div>
          <div className="time-block">
            <div className="time-num">{pad(secs)}</div>
            <div className="time-label">Secs</div>
          </div>
        </div>


      </div>
    </main>
  );
}