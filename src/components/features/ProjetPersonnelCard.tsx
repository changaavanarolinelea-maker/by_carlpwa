"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatFCFA } from "@/lib/format";
import { calculerStatutProjet } from "@/lib/projets";
import { useAppData } from "@/context/AppDataContext";
import type { ProjetPersonnel } from "@/types";

const statutStyle = {
  pret: {
    fond: "bg-sage/10",
    texte: "text-sage",
    message: "Tu peux acheter maintenant",
  },
  ralentit: {
    fond: "bg-ochre/10",
    texte: "text-ochre",
    message: "Possible, mais cela ralentit ton projet business",
  },
  reporter: {
    fond: "bg-brick/10",
    texte: "text-brick",
    message: "À reporter pour le moment",
  },
};

export function ProjetPersonnelCard({ projet }: { projet: ProjetPersonnel }) {
  const { compte } = useAppData();

  const reste = projet.objectif - projet.epargne;
  const progression = (projet.epargne / projet.objectif) * 100;
  const statut = calculerStatutProjet(projet, compte.argentDisponible);
  const { fond, texte, message } = statutStyle[statut];

  return (
    <Card>
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-headline-sm text-espresso truncate">{projet.nom}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="neutral">Priorité {projet.priorite}</Badge>
            <span className="font-sans text-body-sm text-cocoa">Prévu : {projet.prevuLe}</span>
          </div>
        </div>
        <p className="font-display text-headline-sm text-espresso shrink-0">
          {formatFCFA(projet.objectif)}
        </p>
      </div>

      <div className="flex justify-between mb-2 gap-3">
        <p className="font-sans text-body-sm text-cocoa">
          Économisé :{" "}
          <span className="text-espresso font-semibold">{formatFCFA(projet.epargne)}</span>
        </p>
        <p className="font-sans text-body-sm text-cocoa text-right">
          Reste :{" "}
          <span className="text-espresso font-semibold">{formatFCFA(Math.max(reste, 0))}</span>
        </p>
      </div>
      <ProgressBar value={progression} className="mb-4" />

      <div className={`w-full rounded-control px-4 py-3 text-center ${fond}`}>
        <p className={`font-sans text-body-sm font-medium leading-snug ${texte}`}>{message}</p>
      </div>
    </Card>
  );
}
