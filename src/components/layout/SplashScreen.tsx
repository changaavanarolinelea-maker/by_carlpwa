"use client";

import { useEffect, useState } from "react";
import { MoneyBox } from "./MoneyBox";

const CLE_SESSION = "by-carl-splash-vu";
const DUREE_AFFICHAGE_MS = 9000;

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [enSortie, setEnSortie] = useState(false);

  useEffect(() => {
    const dejaVu = sessionStorage.getItem(CLE_SESSION);

    if (dejaVu) return;

    setVisible(true);

    const timerSortie = setTimeout(() => {
      setEnSortie(true);
    }, DUREE_AFFICHAGE_MS - 500);

    const timerFin = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(CLE_SESSION, "1");
    }, DUREE_AFFICHAGE_MS);

    return () => {
      clearTimeout(timerSortie);
      clearTimeout(timerFin);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-espresso flex flex-col items-center justify-center transition-opacity duration-500 ${
        enSortie ? "opacity-0" : "opacity-100"
      }`}
    >
      <MoneyBox />

      <div className="text-center mt-4 animate-pulse">
        <h1 className="font-display text-headline-md text-cream">
          By_Carl
        </h1>

        <p className="font-sans text-body-sm text-cream/70">
          Ton carnet financier personnel
        </p>
      </div>
    </div>
  );
}