import type {
  Compte,
  Conseil,
  ProjetPersonnelApercu,
  BusinessApercu,
  Transaction,
} from "@/types";

export const compte: Compte = {
  argentDisponible: 12000,
  epargneInvestissement: 30000,
};

export const conseilDuJour: Conseil = {
  message: "Il manque 5 000 FCFA pour lancer Chaussures.",
};

export const projetPersonnelApercu: ProjetPersonnelApercu = {
  nom: "Baskets",
  montant: 10000,
};

export const businessApercu: BusinessApercu = {
  nom: "Sacs",
  vendus: 8,
  restants: 12,
};

export const transactionsRecentes: Transaction[] = [
  {
    id: "1",
    titre: "Vente Sac Cuir",
    date: "Aujourd'hui, 14:20",
    montant: 2500,
    sens: "entree",
  },
];

export function formatFCFA(montant: number): string {
  return `${montant.toLocaleString("fr-FR")} FCFA`;
}

export const projetsPersonnels: ProjetPersonnel[] = [
  {
    id: "baskets",
    nom: "Baskets",
    objectif: 10000,
    epargne: 10000,
    priorite: "haute",
    prevuLe: "15 Oct.",
    statut: "pret",
  },
  {
    id: "parfum",
    nom: "Parfum",
    objectif: 8500,
    epargne: 4500,
    priorite: "moyenne",
    prevuLe: "20 Nov.",
    statut: "ralentit",
  },
  {
    id: "telephone",
    nom: "Téléphone",
    objectif: 120000,
    epargne: 15000,
    priorite: "basse",
    prevuLe: "Jan. 2027",
    statut: "reporter",
  },
];

export const capitalTotal = 124500;
export const profitGlobalPourcent = 18.4;

export const businessProjets: BusinessProjet[] = [
  {
    id: "sacs",
    nom: "Sacs",
    capitalInvesti: 45000,
    profitPrevu: 12200,
    stockRestantPourcent: 84,
    vitesseVente: 3,
    statut: "lancable",
  },
  {
    id: "chaussures",
    nom: "Chaussures",
    capitalInvesti: 62000,
    profitPrevu: 18500,
    stockRestantPourcent: 12,
    vitesseVente: 5,
    statut: "presque",
  },
  {
    id: "parfums",
    nom: "Parfums",
    capitalInvesti: 17500,
    profitPrevu: 4200,
    stockRestantPourcent: 0,
    vitesseVente: 0,
    statut: "attente",
  },
];
