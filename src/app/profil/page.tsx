"use client";

import { useState } from "react";
import { Wallet, Receipt, ShoppingBag, Target, Archive, Trash2, RotateCcw, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/ui/StatCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { useAppData } from "@/context/AppDataContext";
import { formatFCFA } from "@/lib/format";
import { joursRestants } from "@/lib/corbeille";

type Onglet = "archives" | "corbeille";

export default function ProfilPage() {
  const {
    projetsPersonnels,
    businessProjets,
    transactions,
    archiverProjetPersonnel,
    archiverBusiness,
    restaurerProjetPersonnel,
    restaurerBusiness,
    supprimerDefinitivementProjetPersonnel,
    supprimerDefinitivementBusiness,
  } = useAppData();
  const [onglet, setOnglet] = useState<Onglet>("archives");

  const projetsActifs = projetsPersonnels.filter((p) => !p.archive && !p.supprimeLe);
  const projetsArchives = projetsPersonnels.filter((p) => p.archive && !p.supprimeLe);
  const projetsSupprimes = projetsPersonnels.filter((p) => p.supprimeLe);

  const businessActifs = businessProjets.filter((p) => !p.archive && !p.supprimeLe);
  const businessArchives = businessProjets.filter((p) => p.archive && !p.supprimeLe);
  const businessSupprimes = businessProjets.filter((p) => p.supprimeLe);

  const totalEpargne = projetsActifs.reduce((total, p) => total + p.epargne, 0);
  const projetsAtteints = projetsActifs.filter((p) => p.epargne >= p.objectif).length;
  const totalVentes = transactions.filter((t) => t.sens === "entree").length;

  return (
    <div>
      <Header title="Ton profil" showBack />

      <div className="px-4 sm:px-5 space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-terracotta bg-ivory flex items-center justify-center shrink-0">
            <span className="font-display text-headline-md text-espresso">C</span>
          </div>
          <div>
            <p className="font-display text-headline-sm text-espresso">Carl</p>
            <p className="font-sans text-body-sm text-cocoa">
              {projetsActifs.length} projet{projetsActifs.length > 1 ? "s" : ""} · {businessActifs.length} business actif
              {businessActifs.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div>
          <p className="font-sans text-label-md text-cocoa uppercase mb-3">Évolution</p>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Épargné au total"
              value={<AnimatedNumber value={totalEpargne} formatter={formatFCFA} />}
              icon={<Wallet size={18} className="text-cocoa" strokeWidth={1.5} />}
            />
            <StatCard
              label="Transactions"
              value={transactions.length.toString()}
              accent="terracotta"
              icon={<Receipt size={18} className="text-terracotta" strokeWidth={1.5} />}
            />
            <StatCard
              label="Ventes réalisées"
              value={totalVentes.toString()}
              accent="sage"
              icon={<ShoppingBag size={18} className="text-sage" strokeWidth={1.5} />}
            />
            <StatCard
              label="Projets atteints"
              value={`${projetsAtteints}/${projetsActifs.length}`}
              icon={<Target size={18} className="text-cocoa" strokeWidth={1.5} />}
            />
          </div>
        </div>

        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOnglet("archives")}
              className={`flex-1 py-2.5 rounded-control font-sans text-body-sm font-medium transition-all duration-200 ${
                onglet === "archives" ? "bg-terracotta text-ivory shadow-soft" : "bg-ivory border border-sand text-cocoa"
              }`}
            >
              Archives
            </button>
            <button
              onClick={() => setOnglet("corbeille")}
              className={`flex-1 py-2.5 rounded-control font-sans text-body-sm font-medium transition-all duration-200 ${
                onglet === "corbeille" ? "bg-terracotta text-ivory shadow-soft" : "bg-ivory border border-sand text-cocoa"
              }`}
            >
              Corbeille
            </button>
          </div>

          {onglet === "archives" && (
            <div className="space-y-3">
              {[...projetsArchives, ...businessArchives].length === 0 && (
                <p className="font-sans text-body-sm text-cocoa">Rien d&apos;archivé pour l&apos;instant.</p>
              )}
              {projetsArchives.map((projet, index) => (
                <Reveal key={projet.id} index={index}>
                  <div className="flex items-center justify-between bg-ivory border border-sand rounded-control px-4 py-3">
                    <div className="min-w-0">
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate">{projet.nom}</p>
                      <p className="font-sans text-label-md text-cocoa">Projet personnel</p>
                    </div>
                    <button
                      onClick={() => archiverProjetPersonnel(projet.id)}
                      className="p-2 rounded-control text-terracotta hover:bg-sand/40 transition-colors shrink-0"
                      aria-label="Désarchiver"
                    >
                      <RotateCcw size={17} strokeWidth={1.5} />
                    </button>
                  </div>
                </Reveal>
              ))}
              {businessArchives.map((projet, index) => (
                <Reveal key={projet.id} index={projetsArchives.length + index}>
                  <div className="flex items-center justify-between bg-ivory border border-sand rounded-control px-4 py-3">
                    <div className="min-w-0">
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate">{projet.nom}</p>
                      <p className="font-sans text-label-md text-cocoa">Business</p>
                    </div>
                    <button
                      onClick={() => archiverBusiness(projet.id)}
                      className="p-2 rounded-control text-terracotta hover:bg-sand/40 transition-colors shrink-0"
                      aria-label="Désarchiver"
                    >
                      <RotateCcw size={17} strokeWidth={1.5} />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {onglet === "corbeille" && (
            <div className="space-y-3">
              {[...projetsSupprimes, ...businessSupprimes].length === 0 && (
                <p className="font-sans text-body-sm text-cocoa">La corbeille est vide.</p>
              )}
              {projetsSupprimes.map((projet, index) => (
                <Reveal key={projet.id} index={index}>
                  <div className="flex items-center justify-between bg-ivory border border-sand rounded-control px-4 py-3">
                    <div className="min-w-0">
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate">{projet.nom}</p>
                      <p className="font-sans text-label-md text-brick">
                        Supprimé — {joursRestants(projet.supprimeLe!)} j. avant effacement définitif
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => restaurerProjetPersonnel(projet.id)}
                        className="p-2 rounded-control text-sage hover:bg-sage/10 transition-colors"
                        aria-label="Restaurer"
                      >
                        <RotateCcw size={17} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => supprimerDefinitivementProjetPersonnel(projet.id)}
                        className="p-2 rounded-control text-brick hover:bg-brick/10 transition-colors"
                        aria-label="Supprimer définitivement"
                      >
                        <X size={17} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
              {businessSupprimes.map((projet, index) => (
                <Reveal key={projet.id} index={projetsSupprimes.length + index}>
                  <div className="flex items-center justify-between bg-ivory border border-sand rounded-control px-4 py-3">
                    <div className="min-w-0">
                      <p className="font-sans text-body-sm font-semibold text-espresso truncate">{projet.nom}</p>
                      <p className="font-sans text-label-md text-brick">
                        Supprimé — {joursRestants(projet.supprimeLe!)} j. avant effacement définitif
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => restaurerBusiness(projet.id)}
                        className="p-2 rounded-control text-sage hover:bg-sage/10 transition-colors"
                        aria-label="Restaurer"
                      >
                        <RotateCcw size={17} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => supprimerDefinitivementBusiness(projet.id)}
                        className="p-2 rounded-control text-brick hover:bg-brick/10 transition-colors"
                        aria-label="Supprimer définitivement"
                      >
                        <X size={17} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
