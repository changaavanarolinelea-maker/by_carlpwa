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
