"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Wallet, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { BusinessCard } from "@/components/features/BusinessCard";
import { Reveal } from "@/components/ui/Reveal";
import { useAppData } from "@/context/AppDataContext";
import { formatFCFA } from "@/lib/format";

export default function BusinessPage() {
  const { businessProjets } = useAppData();
  const [recherche, setRecherche] = useState("");

  const businessActifs = businessProjets.filter((p) => !p.archive && !p.supprimeLe);
  const businessFiltres = businessActifs.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  const capitalTotal = businessActifs.reduce((total, p) => total + p.capitalInvesti, 0);
  const profitTotal = businessActifs.reduce((total, p) => total + p.profitPrevu, 0);

  return (
    <div>
      <Header
        title="Mes Business"
        showBack
        recherche={{ valeur: recherche, onChange: setRecherche, placeholder: "Rechercher un business..." }}
      />

      <div className="px-4 sm:px-5 space-y-4 md:space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <p className="font-sans text-body-md text-cocoa">
          Vue d&apos;ensemble de vos investissements et stocks actifs.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Capital total"
            value={<AnimatedNumber value={capitalTotal} formatter={formatFCFA} />}
            icon={<Wallet size={18} className="text-cocoa" strokeWidth={1.5} />}
          />
          <StatCard
            label="Profit prévu"
            value={<AnimatedNumber value={profitTotal} formatter={formatFCFA} />}
            accent="terracotta"
            icon={<TrendingUp size={18} className="text-terracotta" strokeWidth={1.5} />}
          />
        </div>

        <Link href="/business/nouveau" className="block">
          <Button variant="primary" icon={<Plus size={20} />} className="w-full">
            <span className="sm:hidden">Nouveau</span>
            <span className="hidden sm:inline">Nouveau Business</span>
          </Button>
        </Link>

        {businessFiltres.length === 0 && (
          <p className="font-sans text-body-sm text-cocoa">
            {recherche ? "Aucun business ne correspond à ta recherche." : "Aucun business pour l'instant."}
          </p>
        )}

        <div className="space-y-4">
          {businessFiltres.map((projet, index) => (
            <Reveal key={projet.id} index={index}>
              <BusinessCard projet={projet} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
