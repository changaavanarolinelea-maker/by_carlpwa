"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Banknote,
  TrendingUp,
  Plus,
  Search,
  X,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Reveal } from "@/components/ui/Reveal";
import { SlideInContent } from "@/components/layout/SlideInContent";
import { OptionsMenu } from "@/components/ui/OptionsMenu";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { formatFCFA } from "@/lib/format";

export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { businessDetails, enregistrerVente } = useAppData();
  const { afficherToast } = useToast();
  const detail = businessDetails[id];

  const [recherche, setRecherche] = useState("");
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const [panelOuvert, setPanelOuvert] = useState(false);

  if (!detail) {
    notFound();
  }

  const chiffreAffaires = detail.ventes.reduce((total, vente) => total + vente.montant, 0);
  const capitalRecupere = Math.min(chiffreAffaires, detail.investissementInitial);
  const beneficeReel = Math.max(chiffreAffaires - detail.investissementInitial, 0);

  const produitsFiltres = detail.produits.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const produitsStagnants = detail.produits.filter((p) => p.stockRestant === p.stockInitial);
  const produitsPopulaires = [...detail.produits]
    .sort((a, b) => (b.stockInitial - b.stockRestant) - (a.stockInitial - a.stockRestant))
    .slice(0, 3);

  return (
    <div>
      <header className="w-full fixed top-0 md:left-64 md:w-[calc(100%-16rem)] z-40 bg-ivory/90 backdrop-blur-md border-b border-sand shadow-soft flex items-center gap-3 px-4 sm:px-5 py-4 transition-all duration-300">
        {rechercheOuverte ? (
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 relative">
              <input
                autoFocus
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full bg-cream border border-sand rounded-control pl-4 pr-9 py-2 font-sans text-body-md text-espresso outline-none focus:border-terracotta"
              />
              {recherche && (
                <button
                  onClick={() => setRecherche("")}
                  aria-label="Effacer"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-cocoa hover:bg-sand/60 transition-colors"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setRecherche("");
                setRechercheOuverte(false);
              }}
              className="font-sans text-body-sm text-cocoa px-2 hover:text-terracotta transition-colors"
            >
              Annuler
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/business"
              className="p-2 rounded-control bg-ivory/60 backdrop-blur-sm border border-sand/60 text-espresso transition-colors duration-200 hover:bg-ivory/90"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </Link>
            <h1 className="font-display text-display-lg-mobile text-espresso flex-1 truncate">
              {detail.nom}
            </h1>
            <button
              onClick={() => setRechercheOuverte(true)}
              aria-label="Rechercher"
              className="p-2 rounded-control text-cocoa transition-all duration-200 hover:bg-ivory/70 hover:border hover:border-sand/60 active:scale-95"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <OptionsMenu
              options={[
                {
                  label: "Voir l'analyse",
                  icon: <BarChart3 size={15} />,
                  onClick: () => setPanelOuvert(true),
                },
              ]}
            />
          </>
        )}
      </header>

      <div className="relative overflow-hidden pt-[72px]">
        <motion.div
          animate={{ width: panelOuvert ? "50%" : "100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <SlideInContent className="px-4 sm:px-5 pb-40 space-y-5 md:space-y-6 md:max-w-xl md:mx-auto">
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
                  <ProgressBar
                    value={
                      detail.investissementInitial > 0
                        ? (capitalRecupere / detail.investissementInitial) * 100
                        : 0
                    }
                  />
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

            <div className="space-y-4">
              <h2 className="font-display text-headline-sm text-espresso px-1">Inventaire</h2>

              <Link href={`/business/${id}/nouveau-produit`} className="block">
                <Button variant="secondary" icon={<Plus size={18} strokeWidth={1.5} />} className="w-full">
                  <span className="sm:hidden">Produit</span>
                  <span className="hidden sm:inline">Ajouter un produit</span>
                </Button>
              </Link>

              {produitsFiltres.length === 0 && (
                <p className="font-sans text-body-sm text-cocoa px-1">
                  {recherche ? "Aucun produit ne correspond." : "Aucun produit pour l'instant."}
                </p>
              )}

              {produitsFiltres.map((produit, index) => {
                const stockRestantPourcent = (produit.stockRestant / produit.stockInitial) * 100;
                return (
                  <Reveal key={produit.id} index={index}>
                    <Card>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-control bg-cream border border-sand flex items-center justify-center shrink-0 overflow-hidden">
                          {produit.imageUrl ? (
                            <img src={produit.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ShoppingBag size={24} className="text-cocoa" strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-sans font-bold text-body-md text-espresso truncate">
                            {produit.nom}
                          </h3>
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
                      <Button
                        variant="primary"
                        className="w-full mt-4"
                        disabled={produit.stockRestant <= 0}
                        onClick={() => {
                          enregistrerVente(id, produit.id);
                          afficherToast(`Vente de "${produit.nom}" enregistrée`);
                        }}
                      >
                        {produit.stockRestant <= 0 ? (
                          "Rupture de stock"
                        ) : (
                          <>
                            <span className="sm:hidden">Vendre</span>
                            <span className="hidden sm:inline">Vendre une pièce</span>
                          </>
                        )}
                      </Button>
                    </Card>
                  </Reveal>
                );
              })}
            </div>

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
          </SlideInContent>
        </motion.div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: panelOuvert ? "0%" : "100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute top-0 right-0 h-full w-1/2 bg-cream border-l border-sand overflow-y-auto"
        >
          <div className="px-3 sm:px-4 py-5 space-y-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-body-lg text-espresso">Analyse</p>
              <button
                onClick={() => setPanelOuvert(false)}
                aria-label="Fermer l'analyse"
                className="p-1.5 rounded-control text-cocoa hover:bg-sand/50 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <Card className="p-3">
              <p className="font-sans text-label-md text-cocoa uppercase mb-1">Ventes enregistrées</p>
              <p className="font-display text-headline-sm text-espresso">{detail.ventes.length}</p>
            </Card>

            <div>
              <p className="font-sans text-label-md text-cocoa uppercase mb-2">Les plus vendus</p>
              <div className="space-y-2">
                {produitsPopulaires.length === 0 && (
                  <p className="font-sans text-body-sm text-cocoa">Pas encore de données.</p>
                )}
                {produitsPopulaires.map((produit) => {
                  const vendus = produit.stockInitial - produit.stockRestant;
                  const pourcent = (vendus / produit.stockInitial) * 100;
                  return (
                    <div key={produit.id} className="bg-ivory border border-sand rounded-control p-2.5">
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate mb-1">
                        {produit.nom}
                      </p>
                      <ProgressBar value={pourcent} className="mb-1" />
                      <p className="font-sans text-label-md text-cocoa">{vendus} vendu{vendus > 1 ? "s" : ""}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {produitsStagnants.length > 0 && (
              <div>
                <p className="flex items-center gap-1.5 font-sans text-label-md text-brick uppercase mb-2">
                  <AlertCircle size={13} strokeWidth={2} />
                  Ne se vendent pas
                </p>
                <div className="space-y-2">
                  {produitsStagnants.map((produit) => (
                    <div
                      key={produit.id}
                      className="bg-brick/5 border border-brick/20 rounded-control p-2.5"
                    >
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate">
                        {produit.nom}
                      </p>
                      <p className="font-sans text-label-md text-cocoa">
                        {produit.stockRestant} en stock, 0 vendu
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
