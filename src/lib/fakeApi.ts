import type { Compte, Transaction, ProjetPersonnel, BusinessProjet } from "@/types";
import {
  compte as compteSeed,
  transactionsRecentes as transactionsSeed,
  projetsPersonnels as projetsSeed,
  businessProjets as businessSeed,
} from "@/data/mock";

export type AppData = {
  compte: Compte;
  transactions: Transaction[];
  projetsPersonnels: ProjetPersonnel[];
  businessProjets: BusinessProjet[];
};

const CLE_STOCKAGE = "by-carl-data";
const DELAI_RESEAU_MS = 300;

function attendre(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function donneesSeed(): AppData {
  return {
    compte: compteSeed,
    transactions: transactionsSeed,
    projetsPersonnels: projetsSeed,
    businessProjets: businessSeed,
  };
}

export async function chargerDonnees(): Promise<AppData> {
  await attendre(DELAI_RESEAU_MS);

  const sauvegarde = window.localStorage.getItem(CLE_STOCKAGE);
  if (sauvegarde) {
    return JSON.parse(sauvegarde) as AppData;
  }

  const donnees = donneesSeed();
  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees));
  return donnees;
}

export async function sauvegarderDonnees(donnees: AppData): Promise<void> {
  await attendre(DELAI_RESEAU_MS / 2);
  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees));
}

export async function reinitialiserSeed(): Promise<AppData> {
  const donnees = donneesSeed();
  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donnees));
  return donnees;
}
