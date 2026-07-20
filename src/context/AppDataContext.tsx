"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Transaction, ProjetPersonnel } from "@/types";
import { chargerDonnees, sauvegarderDonnees, type AppData } from "@/lib/fakeApi";

type NatureFlux = "entree" | "depense" | "epargne" | "vente";

type AppDataContextValue = AppData & {
  ajouterTransaction: (nature: NatureFlux, montant: number, note: string) => void;
  ajouterProjetPersonnel: (projet: Omit<ProjetPersonnel, "id" | "statut">) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

const libelles: Record<NatureFlux, string> = {
  entree: "Entrée d'argent",
  depense: "Dépense",
  epargne: "Épargne investissement",
  vente: "Vente",
};

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    chargerDonnees().then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      sauvegarderDonnees(data);
    }
  }, [data]);

  function ajouterTransaction(nature: NatureFlux, montant: number, note: string) {
    setData((precedent) => {
      if (!precedent) return precedent;

      const sens: Transaction["sens"] = nature === "depense" || nature === "epargne" ? "sortie" : "entree";

      const nouvelleTransaction: Transaction = {
        id: crypto.randomUUID(),
        titre: note.trim() || libelles[nature],
        date: "À l'instant",
        montant,
        sens,
      };

      const nouvelArgentDisponible =
        sens === "sortie"
          ? precedent.compte.argentDisponible - montant
          : precedent.compte.argentDisponible + montant;

      const nouvelleEpargne =
        nature === "epargne"
          ? precedent.compte.epargneInvestissement + montant
          : precedent.compte.epargneInvestissement;

      return {
        ...precedent,
        compte: {
          argentDisponible: nouvelArgentDisponible,
          epargneInvestissement: nouvelleEpargne,
        },
        transactions: [nouvelleTransaction, ...precedent.transactions],
      };
    });
  }

  function ajouterProjetPersonnel(projet: Omit<ProjetPersonnel, "id" | "statut">) {
    setData((precedent) => {
      if (!precedent) return precedent;
      return {
        ...precedent,
        projetsPersonnels: [
          ...precedent.projetsPersonnels,
          { ...projet, id: crypto.randomUUID(), statut: "reporter" },
        ],
      };
    });
  }

  if (!data) {
    return null;
  }

  return (
    <AppDataContext.Provider value={{ ...data, ajouterTransaction, ajouterProjetPersonnel }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData doit être utilisé à l'intérieur de AppDataProvider");
  }
  return context;
}
