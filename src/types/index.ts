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
  statut: StatutProjet;
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
};
