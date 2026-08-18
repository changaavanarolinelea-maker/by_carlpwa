export type Compte = {
  argentDisponible: number;
  epargneInvestissement: number;
};

export type Conseil = {
  message: string;
};

export type ProjetPersonnelApercu = {
  nom: string;
  montant: number;
};

export type BusinessApercu = {
  nom: string;
  vendus: number;
  restants: number;
};

export type Transaction = {
  id: string;
  titre: string;
  date: string;
  montant: number;
  sens: "entree" | "sortie";
};

export type StatutProjet = "pret" | "ralentit" | "reporter";

export type ProjetPersonnel = {
  id: string;
  nom: string;
  objectif: number;
  epargne: number;
  priorite: "haute" | "moyenne" | "basse";
  prevuLe: string;
  archive?: boolean;
  supprimeLe?: string;
  imageUrl?: string;
  
};

export type StatutBusiness = "lancable" | "presque" | "attente";

export type BusinessProjet = {
  id: string;
  nom: string;
  capitalInvesti: number;
  profitPrevu: number;
  stockRestantPourcent: number;
  vitesseVente: number; // de 0 à 5
  statut: StatutBusiness;
  archive?: boolean;
  supprimeLe?: string;
};

export type Produit = {
  id: string;
  nom: string;
  prixVente: number;
  stockRestant: number;
  stockInitial: number;
  imageUrl?: string;
};

export type Vente = {
  id: string;
  produitNom: string;
  montant: number;
  date: string;
};

export type BusinessDetail = {
  nom: string;
  investissementInitial: number;
  categorie: string;
  produits: Produit[];
  ventes: Vente[];
};

export type DepenseJournaliere = {
  jour: string;
  pourcentage: number;
};

export type ConseilAnalyse = {
  message: string;
  type: "positif" | "attention";
};
