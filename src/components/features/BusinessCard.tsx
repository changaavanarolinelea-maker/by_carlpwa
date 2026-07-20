import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatFCFA } from "@/lib/format";
import type { BusinessProjet } from "@/types";

const statutConfig = {
  lancable: { variant: "success" as const, label: "Projet lançable maintenant" },
  presque: { variant: "warning" as const, label: "Presque lançable" },
  attente: { variant: "neutral" as const, label: "En attente de stock" },
};

export function BusinessCard({ projet }: { projet: BusinessProjet }) {
  const { variant, label } = statutConfig[projet.statut];

  return (
    <Link href={`/business/${projet.id}`}>
      <Card>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-headline-sm text-espresso">{projet.nom}</h3>
          <Badge variant={variant}>{label}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Capital investi</p>
            <p className="font-sans text-body-lg font-semibold text-espresso">
              {formatFCFA(projet.capitalInvesti)}
            </p>
          </div>
          <div>
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Profit prévu</p>
            <p className="font-sans text-body-lg font-semibold text-terracotta">
              {formatFCFA(projet.profitPrevu)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Stock restant</p>
            <p className="font-sans text-body-md text-espresso">{projet.stockRestantPourcent}%</p>
          </div>
          <div>
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Vitesse de vente</p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < projet.vitesseVente ? "bg-terracotta" : "bg-sand"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
