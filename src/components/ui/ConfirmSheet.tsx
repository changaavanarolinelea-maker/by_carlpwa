"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ConfirmSheet({
  ouvert,
  titre,
  message,
  libelleConfirmer = "Supprimer",
  onConfirmer,
  onAnnuler,
}: {
  ouvert: boolean;
  titre: string;
  message: string;
  libelleConfirmer?: string;
  onConfirmer: () => void;
  onAnnuler: () => void;
}) {
  return (
    <AnimatePresence>
      {ouvert && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onAnnuler}
            className="fixed inset-0 bg-espresso/40 z-[95]"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:max-w-sm md:mx-auto md:left-1/2 md:-translate-x-1/2 md:top-1/3 z-[96] bg-espresso rounded-t-card md:rounded-card p-6 shadow-elevated"
          >
            <div className="w-11 h-11 rounded-full bg-brick/20 flex items-center justify-center mb-4">
              <AlertTriangle size={22} className="text-brick" strokeWidth={2} />
            </div>
            <p className="font-display italic text-headline-sm text-cream mb-2">{titre}</p>
            <p className="font-sans text-body-sm text-cream/70 mb-6">{message}</p>
            <div className="flex gap-3">
              <button
                onClick={onAnnuler}
                className="flex-1 py-3 rounded-control border border-cream/20 text-cream font-sans text-body-md font-medium transition-colors hover:bg-cream/10"
              >
                Annuler
              </button>
              <button
                onClick={onConfirmer}
                className="flex-1 py-3 rounded-control bg-brick text-cream font-sans text-body-md font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              >
                {libelleConfirmer}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
