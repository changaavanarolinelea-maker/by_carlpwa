import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { BusinessCard } from "@/components/features/BusinessCard";
import { businessProjets, capitalTotal, profitGlobalPourcent , } from "@/data/mock";
import { formatFCFA } from "@/lib/format";


export default function BusinessPage() {
  return (
    <div>
      <Header />

      <div className="px-5 space-y-6">
        <div>
          <h2 className="font-display text-headline-md text-espresso mb-1">Mes Business</h2>
          <p className="font-sans text-body-md text-cocoa">
            Vue d&apos;ensemble de vos investissements et stocks actifs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Capital total</p>
            <p className="font-display text-headline-sm text-espresso">
              {formatFCFA(capitalTotal)}
            </p>
          </Card>
          <Card className="p-4">
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Profit global</p>
            <p className="font-display text-headline-sm text-terracotta">
              +{profitGlobalPourcent}%
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          {businessProjets.map((projet) => (
            <BusinessCard key={projet.id} projet={projet} />
          ))}
        </div>
      </div>
    </div>
  );
}
