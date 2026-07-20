import type {
  Compte,
  Conseil,
  ProjetPersonnelApercu,
  BusinessApercu,
  Transaction,
  ProjetPersonnel,
  BusinessProjet,
  BusinessDetail,
  DepenseJournaliere,
  ConseilAnalyse,
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

export const businessDetails: Record<string, BusinessDetail> = {
  sacs: {
    nom: "Vente de sacs",
    investissementInitial: 100000,
    categorie: "Luxe",
    produits: [
      { id: "modele-a", nom: "Sac modèle A", prixVente: 20000, stockRestant: 12, stockInitial: 48 },
      { id: "modele-b", nom: "Sac modèle B — Édition limitée", prixVente: 35000, stockRestant: 8, stockInitial: 20 },
    ],
    ventes: [
      { id: "v1", produitNom: "Vente Modèle A", montant: 20000, date: "Il y a 2 heures" },
      { id: "v2", produitNom: "Vente Modèle B", montant: 35000, date: "Hier, 18:45" },
    ],
  },
  chaussures: {
    nom: "Vente de chaussures",
    investissementInitial: 62000,
    categorie: "Sport",
    produits: [
      { id: "paire-a", nom: "Paire modèle Runner", prixVente: 15000, stockRestant: 4, stockInitial: 30 },
    ],
    ventes: [
      { id: "v1", produitNom: "Vente Runner", montant: 15000, date: "Ce matin" },
    ],
  },
  parfums: {
    nom: "Vente de parfums",
    investissementInitial: 17500,
    categorie: "Beauté",
    produits: [
      { id: "flacon-a", nom: "Flacon 50ml", prixVente: 6000, stockRestant: 0, stockInitial: 15 },
    ],
    ventes: [],
  },
};

export const profitMensuel = 60000;
export const profitVariationPourcent = 12;

export const depensesSemaine: DepenseJournaliere[] = [
  { jour: "Lun", pourcentage: 40 },
  { jour: "Mar", pourcentage: 65 },
  { jour: "Mer", pourcentage: 50 },
  { jour: "Jeu", pourcentage: 85 },
  { jour: "Ven", pourcentage: 45 },
];

export const conseilsAnalyse: ConseilAnalyse[] = [
  { message: "Ton business marche bien : tes ventes progressent.", type: "positif" },
  {
    message: "Réduis les dépenses plaisir pour atteindre ton prochain projet plus vite.",
    type: "attention",
  },
];
