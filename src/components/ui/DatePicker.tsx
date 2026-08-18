"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

function joursDuMois(annee: number, mois: number) {
  return new Date(annee, mois + 1, 0).getDate();
}

function premierJourSemaine(annee: number, mois: number) {
  const jour = new Date(annee, mois, 1).getDay();
  return jour === 0 ? 6 : jour - 1;
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (date: string) => void;
}) {
  const [ouvert, setOuvert] = useState(false);
  const aujourdHui = new Date();
  const [vueAnnee, setVueAnnee] = useState(aujourdHui.getFullYear());
  const [vueMois, setVueMois] = useState(aujourdHui.getMonth());

  function selectionner(jour: number) {
    const date = new Date(vueAnnee, vueMois, jour);
    const formate = `${MOIS[vueMois]} ${date.getFullYear()}`;
    onChange(formate);
    setOuvert(false);
  }

  function moisPrecedent() {
    if (vueMois === 0) {
      setVueMois(11);
      setVueAnnee((a) => a - 1);
    } else {
      setVueMois((m) => m - 1);
    }
  }

  function moisSuivant() {
    if (vueMois === 11) {
      setVueMois(0);
      setVueAnnee((a) => a + 1);
    } else {
      setVueMois((m) => m + 1);
    }
  }

  const total = joursDuMois(vueAnnee, vueMois);
  const decalage = premierJourSemaine(vueAnnee, vueMois);
  const cases = [...Array(decalage).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOuvert(true)}
        className="w-full flex items-center justify-between bg-ivory border-2 border-sand rounded-control p-4 font-sans text-body-md text-left transition-all duration-200 focus:border-terracotta"
      >
        <span className={value ? "text-espresso" : "text-cocoa/50"}>
          {value || "Choisir une échéance"}
        </span>
        <Calendar size={18} className="text-terracotta" strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {ouvert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOuvert(false)}
              className="fixed inset-0 bg-espresso/40 z-[95]"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 md:absolute md:top-full md:bottom-auto md:mt-2 z-[96] bg-espresso rounded-t-card md:rounded-card p-5 shadow-elevated md:max-w-sm md:mx-auto md:left-1/2 md:-translate-x-1/2"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={moisPrecedent}
                  className="p-2 rounded-control text-cream/70 transition-colors hover:bg-cream/10"
                >
                  <ChevronLeft size={18} />
                </button>
                <p className="font-display italic text-headline-sm text-cream">
                  {MOIS[vueMois]} {vueAnnee}
                </p>
                <button
                  type="button"
                  onClick={moisSuivant}
                  className="p-2 rounded-control text-cream/70 transition-colors hover:bg-cream/10"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {JOURS.map((jour, i) => (
                  <p
                    key={i}
                    className="text-center font-sans italic text-label-md text-cream/50"
                  >
                    {jour}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {cases.map((jour, i) =>
                  jour === null ? (
                    <div key={`vide-${i}`} />
                  ) : (
                    <button
                      key={jour}
                      type="button"
                      onClick={() => selectionner(jour)}
                      className="aspect-square flex items-center justify-center rounded-full font-sans italic text-body-sm text-cream shadow-[0_1px_4px_rgba(0,0,0,0.25)] bg-espresso transition-all duration-150 hover:bg-cream/15 hover:ring-2 hover:ring-cream/30"
                    >
                      {jour}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
