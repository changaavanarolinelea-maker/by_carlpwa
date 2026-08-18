"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { ProjetPersonnelCard } from "@/components/features/ProjetPersonnelCard";
import { Reveal } from "@/components/ui/Reveal";
import { useAppData } from "@/context/AppDataContext";

export default function ProjetsPage() {
  const { projetsPersonnels } = useAppData();
  const [recherche, setRecherche] = useState("");

  const projetsActifs = projetsPersonnels.filter((p) => !p.archive && !p.supprimeLe);
  const projetsFiltres = projetsActifs.filter((p) =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <Header
        title="Projets Personnels"
        showBack
        recherche={{ valeur: recherche, onChange: setRecherche, placeholder: "Rechercher un projet..." }}
      />

      <div className="px-4 sm:px-5 space-y-4 md:space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 font-sans text-body-sm font-semibold text-terracotta uppercase tracking-wide">
            <Sparkles size={14} strokeWidth={2} />
            Tes envies
          </p>
          <Link href="/projets/nouveau">
            <Button variant="primary" icon={<Plus size={18} strokeWidth={2} />}>
              Nouveau
            </Button>
          </Link>
        </div>

        {projetsFiltres.length === 0 && (
          <p className="font-sans text-body-sm text-cocoa">
            {recherche ? "Aucun projet ne correspond à ta recherche." : "Aucun projet pour l'instant."}
          </p>
        )}

        <div className="space-y-4">
          {projetsFiltres.map((projet, index) => (
            <Reveal key={projet.id} index={index}>
              <ProjetPersonnelCard projet={projet} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
