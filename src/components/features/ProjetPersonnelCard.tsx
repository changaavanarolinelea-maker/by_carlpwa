"use client";

import { useState } from "react";
import { Pencil, Archive, Trash2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionsMenu } from "@/components/ui/OptionsMenu";
import { ConfirmSheet } from "@/components/ui/ConfirmSheet";
import { formatFCFA } from "@/lib/format";
import { calculerStatutProjet } from "@/lib/projets";
import { useAppData } from "@/context/AppDataContext";
import type { ProjetPersonnel } from "@/types";

const statutStyle = {
  pret: { fond: "bg-sage/10", texte: "text-sage", message: "Tu peux acheter maintenant" },
  ralentit: {
    fond: "bg-ochre/10",
    texte: "text-ochre",
    message: "Possible, mais ça ralentit ton business",
  },
  reporter: { fond: "bg-brick/10", texte: "text-brick", message: "À reporter pour le moment" },
};

const prioriteAccent = {
  haute: "border-l-brick",
  moyenne: "border-l-ochre",
  basse: "border-l-sage",
};

const prioriteTexte = {
  haute: "text-brick",
  moyenne: "text-ochre",
  basse: "text-sage",
};

export function ProjetPersonnelCard({ projet }: { projet: ProjetPersonnel }) {
  const { compte, archiverProjetPersonnel, supprimerProjetPersonnel } = useAppData();
  const [confirmationOuverte, setConfirmationOuverte] = useState(false);

  const reste = projet.objectif - projet.epargne;
  const progression = (projet.epargne / projet.objectif) * 100;
  const statut = calculerStatutProjet(projet, compte.argentDisponible);
  const { fond, texte, message } = statutStyle[statut];

  return (
    <div
      className={`bg-ivory border border-sand border-l-4 ${prioriteAccent[projet.priorite]} rounded-card p-4 sm:p-6 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5`}
    >
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {projet.imageUrl && (
    <img
      src={projet.imageUrl}
      alt=""
      className="w-11 h-11 rounded-control object-cover border border-sand shrink-0"
    />
  )}
  <div className="min-w-0">
          <h3 className="font-display text-headline-sm text-espresso truncate">{projet.nom}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`font-sans text-label-md font-semibold uppercase ${prioriteTexte[projet.priorite]}`}>
              {projet.priorite}
            </span>
            <span className="text-sand">•</span>
            <span className="font-sans text-body-sm text-cocoa">{projet.prevuLe}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <p className="font-display text-headline-sm text-espresso">
            {formatFCFA(projet.objectif)}
          </p>
          <OptionsMenu
            options={[
              { label: "Modifier", icon: <Pencil size={15} />, onClick: () => {} },
              {
                label: projet.archive ? "Désarchiver" : "Archiver",
                icon: <Archive size={15} />,
                onClick: () => archiverProjetPersonnel(projet.id),
              },
              {
                label: "Supprimer",
                icon: <Trash2 size={15} />,
                danger: true,
                onClick: () => setConfirmationOuverte(true),
              },
            ]}
          />
        </div>
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
      <ProgressBar value={progression} className="mb-3" />

      <div className={`w-full rounded-control px-3 py-2 text-center ${fond}`}>
        <p className={`font-sans text-body-sm font-medium leading-snug ${texte}`}>{message}</p>
      </div>

      <ConfirmSheet
        ouvert={confirmationOuverte}
        titre={`Supprimer "${projet.nom}" ?`}
        message="Cette action est définitive et ne peut pas être annulée."
        onConfirmer={() => {
          supprimerProjetPersonnel(projet.id);
          setConfirmationOuverte(false);
        }}
        onAnnuler={() => setConfirmationOuverte(false)}
      />
    </div>
  );
}
