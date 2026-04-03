"use client";

import { useEffect, useState } from "react";

export type Lang = "en" | "de";

export function useLang() {
  const [lang, setLangState] = useState<Lang>("en");

  // On mount, read saved preference
  useEffect(() => {
    const saved = localStorage.getItem("mpc_lang");
    if (saved === "en" || saved === "de") setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("mpc_lang", l);
  }

  return { lang, setLang };
}