"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatFCFA } from "@/lib/format";
import { calculerStatutProjet } from "@/lib/projets";
import { useAppData } from "@/context/AppDataContext";
import type { ProjetPersonnel } from "@/types";

const statutConfig = {
  pret: {
    variant: "success" as const,
    message: "Tu peux acheter maintenant",
  },
  ralentit: {
    variant: "warning" as const,
    message: "Possible, mais cela ralentit ton projet business",
  },
  reporter: {
    variant: "risk" as const,
    message: "À reporter pour le moment",
  },
};

export function ProjetPersonnelCard({ projet }: { projet: ProjetPersonnel }) {
  const { compte } = useAppData();

  const reste = projet.objectif - projet.epargne;
  const progression = (projet.epargne / projet.objectif) * 100;
  const statut = calculerStatutProjet(projet, compte.argentDisponible);
  const { variant, message } = statutConfig[statut];

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-headline-sm text-espresso">{projet.nom}</h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="neutral">Priorité {projet.priorite}</Badge>
            <span className="font-sans text-body-sm text-cocoa">
              Prévu : {projet.prevuLe}
            </span>
          </div>
        </div>
        <p className="font-display text-headline-sm text-espresso">
          {formatFCFA(projet.objectif)}
        </p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="font-sans text-body-sm text-cocoa">
          Économisé : <span className="text-espresso font-semibold">{formatFCFA(projet.epargne)}</span>
        </p>
        <p className="font-sans text-body-sm text-cocoa">
          Reste : <span className="text-espresso font-semibold">{formatFCFA(Math.max(reste, 0))}</span>
        </p>
      </div>
      <ProgressBar value={progression} className="mb-4" />

      <Badge variant={variant} className="w-full justify-center normal-case text-body-sm py-2">
        {message}
      </Badge>
    </Card>
  );
}
