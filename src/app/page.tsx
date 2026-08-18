"use client";

import Link from "next/link";
import { PiggyBank, TrendingUp, Banknote, Plus, ShoppingBag, Package, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAppData } from "@/context/AppDataContext";
import { formatFCFA } from "@/lib/format";
import { conseilDuJour, projetPersonnelApercu, businessApercu } from "@/data/mock";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";



export default function AccueilPage() {
  const { compte, transactions } = useAppData();
  const tauxStock =
    (businessApercu.vendus / (businessApercu.vendus + businessApercu.restants)) * 100;

  return (
    <div>
      <Header variant="home" />

      <div className="px-5 space-y-6 mt-6 md:max-w-xl md:mx-auto">
        {/* Argent disponible */}
        <Card>
          <p className="font-sans text-label-md text-cocoa uppercase mb-1">Argent disponible</p>
          <h2 className="font-display text-display-lg-mobile text-espresso mb-6">
            <AnimatedNumber value={compte.argentDisponible} formatter={formatFCFA} />
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
        <TiltCard>
        <div className="bg-espresso rounded-card p-6 flex items-center justify-between">
          <div className="space-y-2 max-w-[70%]">
            <span className="inline-block px-3 py-1 rounded-full bg-terracotta/20 text-cream font-sans text-label-md">
              Conseil du jour
            </span>
            <p className="font-display text-headline-sm text-cream leading-tight">
              {conseilDuJour.message}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-cocoa/40 flex items-center justify-center shrink-0">
            <TrendingUp className="text-cream" size={28} strokeWidth={1.5} />
          </div>
        </div>
        </TiltCard>

{/* Actions rapides — icônes seules sur mobile, boutons complets sur desktop */}
<Link href="/ajouter" className="block">
  <button className="w-full min-h-11 flex items-center justify-center gap-2 bg-terracotta text-ivory rounded-control py-3 font-sans font-semibold text-body-md shadow-soft transition-all duration-200 hover:shadow-glow-terracotta hover:brightness-105 active:scale-[0.98]">
    <Plus size={18} strokeWidth={2} />
    Nouvelle transaction
  </button>
</Link>

<div className="hidden sm:flex gap-4">
  <Link href="/ajouter" className="flex-1">
    <Button variant="primary" icon={<Banknote size={20} />} className="w-full">
      Vendre maintenant
    </Button>
  </Link>
  <Link href="/ajouter" className="flex-1">
    <Button variant="secondary" icon={<Plus size={20} />} className="w-full">
      Ajouter de l&apos;argent
    </Button>
  </Link>
</div>

        {/* Aperçus projets */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="aspect-square flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center mb-4">
                <ShoppingBag size={18} className="text-cocoa" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-label-md text-espresso">{projetPersonnelApercu.nom}</p>
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
<button className="font-sans text-label-md text-cocoa transition-colors duration-200 hover:text-terracotta">
  Voir tout
</button>
          </div>
          <div className="space-y-1">
            {transactions.length === 0 && (
              <p className="py-4 font-sans text-body-sm text-cocoa">Aucune transaction pour l&apos;instant.</p>
            )}
            {transactions.slice(0, 5).map((transaction, index) => (
             <Reveal key={transaction.id} index={index}>
              <div
                className="flex items-center justify-between p-4 mb-2 rounded-control bg-ivory border border-sand shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-terracotta/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                    {transaction.sens === "sortie" ? (
                      <ArrowUpRight size={18} className="text-brick" strokeWidth={1.5} />
                    ) : (
                      <ArrowDownLeft size={18} className="text-sage" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className="font-sans text-label-md text-espresso">{transaction.titre}</p>
                    <p className="font-sans text-body-sm text-cocoa">{transaction.date}</p>
                  </div>
                </div>
                <p
                  className={`font-sans text-label-md ${
                    transaction.sens === "sortie" ? "text-brick" : "text-sage"
                  }`}
                >
                  {transaction.sens === "sortie" ? "-" : "+"}
                  {formatFCFA(transaction.montant)}
                </p>
              </div>
              </Reveal> 
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
