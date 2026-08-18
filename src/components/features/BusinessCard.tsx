"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Archive, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { OptionsMenu } from "@/components/ui/OptionsMenu";
import { ConfirmSheet } from "@/components/ui/ConfirmSheet";
import { formatFCFA } from "@/lib/format";
import { useAppData } from "@/context/AppDataContext";
import type { BusinessProjet } from "@/types";

const statutConfig = {
  lancable: { dot: "bg-sage", texte: "text-sage", label: "Lançable maintenant" },
  presque: { dot: "bg-ochre", texte: "text-ochre", label: "Presque lançable" },
  attente: { dot: "bg-cocoa/50", texte: "text-cocoa", label: "En attente de stock" },
};

export function BusinessCard({ projet }: { projet: BusinessProjet }) {
  const { archiverBusiness, supprimerBusiness } = useAppData();
  const [confirmationOuverte, setConfirmationOuverte] = useState(false);
  const { dot, texte, label } = statutConfig[projet.statut];

  return (
    <>
      <Link href={`/business/${projet.id}`} className="block">
        <Card>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="font-display text-headline-sm text-espresso truncate min-w-0">
              {projet.nom}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`flex items-center gap-1.5 font-sans text-label-md font-semibold ${texte}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                {label}
              </span>
              <OptionsMenu
                options={[
                  { label: "Modifier", icon: <Pencil size={15} />, onClick: () => {} },
                  {
                    label: projet.archive ? "Désarchiver" : "Archiver",
                    icon: <Archive size={15} />,
                    onClick: () => archiverBusiness(projet.id),
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

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="font-sans text-label-md text-cocoa uppercase mb-0.5">Capital</p>
              <p className="font-sans text-body-md font-semibold text-espresso">
                {formatFCFA(projet.capitalInvesti)}
              </p>
            </div>
            <div>
              <p className="font-sans text-label-md text-cocoa uppercase mb-0.5">Profit prévu</p>
              <p className="font-sans text-body-md font-semibold text-terracotta">
                {formatFCFA(projet.profitPrevu)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-sand/70">
            <span className="font-sans text-label-md text-cocoa">
              Stock: {projet.stockRestantPourcent}%
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index < projet.vitesseVente ? "bg-terracotta" : "bg-sand"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </Link>

      <ConfirmSheet
        ouvert={confirmationOuverte}
        titre={`Supprimer "${projet.nom}" ?`}
        message="Cette action est définitive et ne peut pas être annulée."
        onConfirmer={() => {
          supprimerBusiness(projet.id);
          setConfirmationOuverte(false);
        }}
        onAnnuler={() => setConfirmationOuverte(false)}
      />
    </>
  );
}
