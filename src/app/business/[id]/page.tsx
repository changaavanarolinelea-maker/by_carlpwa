import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag, Banknote, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { businessDetails, formatFCFA } from "@/data/mock";

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = businessDetails[id];

  if (!detail) {
    notFound();
  }

  const chiffreAffaires = detail.ventes.reduce((total, vente) => total + vente.montant, 0);
  const capitalRecupere = Math.min(chiffreAffaires, detail.investissementInitial);
  const beneficeReel = Math.max(chiffreAffaires - detail.investissementInitial, 0);

  return (
    <div>
      <header className="w-full sticky top-0 z-40 bg-cream flex items-center gap-3 px-5 py-4">
        <ArrowLeft size={22} className="text-espresso" strokeWidth={1.5} />
        <h1 className="font-display text-display-lg-mobile text-espresso">{detail.nom}</h1>
      </header>

      <div className="px-5 pb-40 space-y-6">
        {/* Investissement initial */}
        <Card>
          <p className="font-sans text-label-md text-cocoa uppercase mb-1">
            Investissement initial
          </p>
          <p className="font-sans text-number-xl text-espresso">
            {formatFCFA(detail.investissementInitial)}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-cream rounded-control border border-sand/50">
              <p className="font-sans text-label-md text-cocoa mb-1">Stock total</p>
              <p className="font-display text-headline-sm text-espresso">
                {detail.produits.reduce((total, p) => total + p.stockInitial, 0)} pcs
              </p>
            </div>
            <div className="p-4 bg-cream rounded-control border border-sand/50">
              <p className="font-sans text-label-md text-cocoa mb-1">Catégorie</p>
              <p className="font-display text-headline-sm text-terracotta">{detail.categorie}</p>
            </div>
          </div>
        </Card>

        {/* Résumé financier */}
        <div className="space-y-4">
          <h2 className="font-display text-headline-sm text-espresso px-1">Résumé financier</h2>

          <Card className="flex justify-between items-center">
            <div>
              <p className="font-sans text-label-md text-cocoa">Chiffre d&apos;affaires</p>
              <p className="font-sans text-number-xl text-espresso">{formatFCFA(chiffreAffaires)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-sand/60 flex items-center justify-center">
              <Banknote size={22} className="text-terracotta" strokeWidth={1.5} />
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <p className="font-sans text-label-md text-cocoa mb-2">Capital récupéré</p>
              <p className="font-display text-headline-sm text-espresso mb-3">
                {formatFCFA(capitalRecupere)}
              </p>
              <ProgressBar value={(capitalRecupere / detail.investissementInitial) * 100} />
            </Card>

            <Card className="p-4 bg-terracotta border-terracotta">
              <p className="font-sans text-label-md text-cream/80 mb-2">Bénéfice réel</p>
              <p className="font-display text-headline-sm text-cream mb-3">
                {formatFCFA(beneficeReel)}
              </p>
              <div className="flex items-center gap-1 text-cream/90">
                <TrendingUp size={14} strokeWidth={1.5} />
                <span className="font-sans text-label-md">Profit net</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Inventaire */}
        <div className="space-y-4">
          <h2 className="font-display text-headline-sm text-espresso px-1">Inventaire</h2>
          {detail.produits.map((produit) => {
            const stockRestantPourcent = (produit.stockRestant / produit.stockInitial) * 100;
            return (
              <Card key={produit.id}>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-control bg-cream border border-sand flex items-center justify-center shrink-0">
                    <ShoppingBag size={24} className="text-cocoa" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-body-md text-espresso">{produit.nom}</h3>
                    <p className="font-sans text-body-sm text-cocoa">
                      Prix de vente : {formatFCFA(produit.prixVente)}
                    </p>
                    <span className="inline-block mt-2 text-xs font-sans px-2 py-1 bg-cream border border-sand rounded-full text-cocoa">
                      {produit.stockRestant} pièces restantes
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between font-sans text-label-md text-cocoa mb-1">
                    <span>Niveau de stock</span>
                    <span>{Math.round(stockRestantPourcent)}% restant</span>
                  </div>
                  <ProgressBar value={stockRestantPourcent} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Historique des ventes */}
        <div className="space-y-4">
          <h2 className="font-display text-headline-sm text-espresso px-1">
            Historique des ventes
          </h2>
          <Card className="p-0 overflow-hidden">
            {detail.ventes.length === 0 && (
              <p className="p-4 font-sans text-body-sm text-cocoa">Aucune vente enregistrée.</p>
            )}
            {detail.ventes.map((vente) => (
              <div
                key={vente.id}
                className="p-4 border-b border-sand last:border-b-0 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream border border-sand flex items-center justify-center">
                    <ShoppingBag size={18} className="text-terracotta" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-body-sm text-espresso">
                      {vente.produitNom}
                    </p>
                    <p className="font-sans text-xs text-cocoa">{vente.date}</p>
                  </div>
                </div>
                <span className="font-sans text-body-md text-espresso">
                  +{formatFCFA(vente.montant)}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 w-full px-5 z-40">
        <Button variant="primary" className="w-full h-14 text-lg shadow-xl shadow-terracotta/30">
          Vendre maintenant
        </Button>
      </div>
    </div>
  );
}
