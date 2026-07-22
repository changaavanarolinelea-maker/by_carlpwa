import type { StatutProjet } from "@/types";

export function calculerStatutProjet(
  projet: { objectif: number; epargne: number },
  argentDisponible: number
): StatutProjet {
  const reste = projet.objectif - projet.epargne;

  if (reste <= 0) return "pret";
  if (reste <= argentDisponible) return "ralentit";
  return "reporter";
}
