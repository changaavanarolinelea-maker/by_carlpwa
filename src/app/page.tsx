import { PiggyBank, TrendingUp, Banknote, Plus, ShoppingBag, Package, ArrowDownLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  compte,
  conseilDuJour,
  projetPersonnelApercu,
  businessApercu,
  transactionsRecentes,
  formatFCFA,
} from "@/data/mock";

export default function AccueilPage() {
  const tauxStock =
    (businessApercu.vendus / (businessApercu.vendus + businessApercu.restants)) * 100;

  return (
    <div>
      <Header variant="home" />

      <div className="px-5 space-y-6">
        {/* Argent disponible */}
        <Card>
          <p className="font-sans text-label-md text-cocoa uppercase mb-1">
            Argent disponible
          </p>
          <h2 className="font-display text-display-lg-mobile text-espresso mb-6">
            {formatFCFA(compte.argentDisponible)}
          </h2>
          <div className="flex items-center gap-4 pt-6 border-t border-sand">
            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
              <PiggyBank size={20} className="text-terracotta" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-sans text-body-sm text-cocoa">Épargne investissement</p>
              <p className="font-sans text-label-md text-espresso">
                {formatFCFA(compte.epargneInvestissement)}
              </p>
            </div>
          </div>
        </Card>

        {/* Conseil du jour */}
        <div className="bg-espresso rounded-card p-6 flex items-center justify-between">
          <div className="space-y-2 max-w-[70%]">
            <Badge variant="neutral" className="bg-terracotta/20 text-cream">
              Conseil du jour
            </Badge>
            <p className="font-display text-headline-sm text-cream leading-tight">
              {conseilDuJour.message}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-cocoa/40 flex items-center justify-center shrink-0">
            <TrendingUp className="text-cream" size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex gap-4">
          <Button variant="primary" icon={<Banknote size={20} />} className="flex-1">
            Vendre maintenant
          </Button>
          <Button variant="secondary" icon={<Plus size={20} />} className="flex-1">
            Ajouter de l&apos;argent
          </Button>
        </div>

        {/* Aperçus projets */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="aspect-square flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center mb-4">
                <ShoppingBag size={18} className="text-cocoa" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-label-md text-espresso">
                {projetPersonnelApercu.nom}
              </p>
            </div>
            <p className="font-display text-headline-sm text-terracotta">
              {formatFCFA(projetPersonnelApercu.montant)}
            </p>
          </Card>

          <Card className="aspect-square flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center mb-4">
                <Package size={18} className="text-cocoa" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-label-md text-espresso">{businessApercu.nom}</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="font-sans text-body-sm text-cocoa">
                  {businessApercu.vendus} vendus
                </span>
                <span className="font-sans text-label-md text-terracotta">
                  {businessApercu.restants} restants
                </span>
              </div>
              <ProgressBar value={tauxStock} />
            </div>
          </Card>
        </div>

        {/* Activités récentes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-headline-sm text-espresso">Activités récentes</h3>
            <button className="font-sans text-label-md text-cocoa">Voir tout</button>
          </div>
          <div className="space-y-1">
            {transactionsRecentes.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-4 border-b border-sand"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                    <ArrowDownLeft size={18} className="text-cocoa" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-label-md text-espresso">{transaction.titre}</p>
                    <p className="font-sans text-body-sm text-cocoa">{transaction.date}</p>
                  </div>
                </div>
                <p className="font-sans text-label-md text-terracotta">
                  +{formatFCFA(transaction.montant)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
