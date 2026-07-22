"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Transaction, ProjetPersonnel, BusinessProjet, BusinessDetail } from "@/types";
import { chargerDonnees, sauvegarderDonnees, type AppData } from "@/lib/fakeApi";
import { calculerStockRestantPourcent, genererSlug } from "@/lib/business";

type NatureFlux = "entree" | "depense" | "epargne" | "vente";

type AppDataContextValue = AppData & {
  ajouterTransaction: (nature: NatureFlux, montant: number, note: string) => void;
  ajouterProjetPersonnel: (projet: Omit<ProjetPersonnel, "id" | "statut">) => void;
  ajouterBusiness: (input: { nom: string; capitalInvesti: number; categorie: string }) => void;
  enregistrerVente: (businessId: string, produitId: string) => void;
  ajouterProduit: (businessId: string, produit: { nom: string; prixVente: number; stockInitial: number }) => void;
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

      const sens: Transaction["sens"] =
        nature === "depense" || nature === "epargne" ? "sortie" : "entree";

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

  function ajouterBusiness(input: { nom: string; capitalInvesti: number; categorie: string }) {
    setData((precedent) => {
      if (!precedent) return precedent;

      const id = genererSlug(input.nom);

      const nouveauProjet: BusinessProjet = {
        id,
        nom: input.nom,
        capitalInvesti: input.capitalInvesti,
        profitPrevu: 0,
        stockRestantPourcent: 100,
        vitesseVente: 0,
        statut: "attente",
      };

      const nouveauDetail: BusinessDetail = {
        nom: input.nom,
        investissementInitial: input.capitalInvesti,
        categorie: input.categorie,
        produits: [],
        ventes: [],
      };

      return {
        ...precedent,
        businessProjets: [...precedent.businessProjets, nouveauProjet],
        businessDetails: { ...precedent.businessDetails, [id]: nouveauDetail },
      };
    });
  }


  function enregistrerVente(businessId: string, produitId: string) {
    setData((precedent) => {
      if (!precedent) return precedent;

      const detail = precedent.businessDetails[businessId];
      const produit = detail?.produits.find((p) => p.id === produitId);
      if (!detail || !produit || produit.stockRestant <= 0) return precedent;

      const produitsMisAJour = detail.produits.map((p) =>
        p.id === produitId ? { ...p, stockRestant: p.stockRestant - 1 } : p
      );

      const nouvelleVente = {
        id: crypto.randomUUID(),
        produitNom: produit.nom,
        montant: produit.prixVente,
        date: "À l'instant",
      };

      const detailMisAJour: BusinessDetail = {
        ...detail,
        produits: produitsMisAJour,
        ventes: [nouvelleVente, ...detail.ventes],
      };

      const businessProjetsMisAJour = precedent.businessProjets.map((projet) =>
        projet.id === businessId
          ? { ...projet, stockRestantPourcent: calculerStockRestantPourcent(produitsMisAJour) }
          : projet
      );

      const nouvelleTransaction: Transaction = {
        id: crypto.randomUUID(),
        titre: `Vente ${produit.nom}`,
        date: "À l'instant",
        montant: produit.prixVente,
        sens: "entree",
      };

      return {
        ...precedent,
        compte: {
          ...precedent.compte,
          argentDisponible: precedent.compte.argentDisponible + produit.prixVente,
        },
        transactions: [nouvelleTransaction, ...precedent.transactions],
        businessDetails: { ...precedent.businessDetails, [businessId]: detailMisAJour },
        businessProjets: businessProjetsMisAJour,
      };
    });
  }

  function ajouterProduit(
  businessId: string,
  produit: { nom: string; prixVente: number; stockInitial: number }
) {
  setData((precedent) => {
    if (!precedent) return precedent;

    const detail = precedent.businessDetails[businessId];
    if (!detail) return precedent;

    const nouveauProduit = {
      id: crypto.randomUUID(),
      nom: produit.nom,
      prixVente: produit.prixVente,
      stockInitial: produit.stockInitial,
      stockRestant: produit.stockInitial,
    };

    const produitsMisAJour = [...detail.produits, nouveauProduit];

    const detailMisAJour = { ...detail, produits: produitsMisAJour };

    const businessProjetsMisAJour = precedent.businessProjets.map((projet) =>
      projet.id === businessId
        ? { ...projet, stockRestantPourcent: calculerStockRestantPourcent(produitsMisAJour) }
        : projet
    );

    return {
      ...precedent,
      businessDetails: { ...precedent.businessDetails, [businessId]: detailMisAJour },
      businessProjets: businessProjetsMisAJour,
    };
  });
}

  if (!data) {
    return null;
  }

  return (
    <AppDataContext.Provider
      value={{
        ...data,
        ajouterTransaction,
        ajouterProjetPersonnel,
        ajouterBusiness,
        enregistrerVente,
        ajouterProduit,
      }}
    >
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
