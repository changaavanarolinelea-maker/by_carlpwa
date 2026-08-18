"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight  } from "lucide-react";

type Toast = { id: string; message: string };

const ToastContext = createContext<{ afficherToast: (message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function afficherToast(message: string) {
    const id = crypto.randomUUID();
    setToasts((precedent) => [...precedent, { id, message }]);
    setTimeout(() => {
      setToasts((precedent) => precedent.filter((t) => t.id !== id));
    }, 3200);
  }

  return (
    <ToastContext.Provider value={{ afficherToast }}>
      {children}
      <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-90 flex flex-col gap-2 items-center px-4 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="w-full bg-espresso rounded-card px-5 py-4 shadow-elevated flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                className="w-9 h-9 rounded-full bg-sage/15 flex items-center justify-center shrink-0"
              >
                <ArrowUpRight size={20} className="text-sage" strokeWidth={2.5} />
              </motion.div>
              <p className="font-display italic text-body-lg text-cream leading-snug">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast doit être utilisé à l'intérieur de ToastProvider");
  }
  return context;
}
