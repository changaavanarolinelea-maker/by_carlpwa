import type {
  Compte,
  Transaction,
  ProjetPersonnel,
  BusinessProjet,
  BusinessDetail,
} from "@/types";
import {
  compte as compteSeed,
  transactionsRecentes as transactionsSeed,
  projetsPersonnels as projetsSeed,
  businessProjets as businessProjetsSeed,
  businessDetails as businessDetailsSeed,
} from "@/data/mock";

export type AppData = {
  compte: Compte;
  transactions: Transaction[];
  projetsPersonnels: ProjetPersonnel[];
  businessProjets: BusinessProjet[];
  businessDetails: Record<string, BusinessDetail>;
};

const CLE_STOCKAGE = "by-carl-data";
const DELAI_RESEAU_MS = 400;

function attendre(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function donneesSeed(): AppData {
  return {
    compte: compteSeed,
    transactions: transactionsSeed,
    projetsPersonnels: projetsSeed,
    businessProjets: businessProjetsSeed,
    businessDetails: businessDetailsSeed,
  };
}

function fusionnerListeParId<T extends { id: string }>(
  listeSeed: T[],
  listeSauvegardee: T[] | undefined
): T[] {
  const table = new Map<string, T>();
  listeSeed.forEach((item) => table.set(item.id, item));
  (listeSauvegardee ?? []).forEach((item) => table.set(item.id, item));
  return Array.from(table.values());
}

export async function chargerDonnees(): Promise<AppData> {
  await attendre(DELAI_RESEAU_MS);

  const seed = donneesSeed();
  const sauvegarde = window.localStorage.getItem(CLE_STOCKAGE);

  if (!sauvegarde) {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(seed));
    return seed;
  }

  const donneesSauvegardees = JSON.parse(sauvegarde) as Partial<AppData>;

  const donneesFusionnees: AppData = {
    compte: donneesSauvegardees.compte ?? seed.compte,
    transactions: donneesSauvegardees.transactions ?? seed.transactions,
    projetsPersonnels: fusionnerListeParId(
      seed.projetsPersonnels,
      donneesSauvegardees.projetsPersonnels
    ),
    businessProjets: fusionnerListeParId(
      seed.businessProjets,
      donneesSauvegardees.businessProjets
    ),
    businessDetails: {
      ...seed.businessDetails,
      ...(donneesSauvegardees.businessDetails ?? {}),
    },
  };

  window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(donneesFusionnees));
  return donneesFusionnees;
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
