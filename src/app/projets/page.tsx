"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { ProjetPersonnelCard } from "@/components/features/ProjetPersonnelCard";
import { useAppData } from "@/context/AppDataContext";

export default function ProjetsPage() {
  const { projetsPersonnels } = useAppData();

  return (
    <div>
      <Header />

      <div className="px-5 space-y-6">
        <div>
          <p className="font-sans text-label-md text-cocoa uppercase mb-1">Tes envies</p>
          <h2 className="font-display text-headline-md text-espresso">Projets Personnels</h2>
        </div>

        <Link href="/projets/nouveau">
          <Button variant="primary" icon={<Plus size={20} />} className="w-full">
            Nouveau Projet Personnel
          </Button>
        </Link>

        {projetsPersonnels.length === 0 && (
          <p className="font-sans text-body-sm text-cocoa">Aucun projet pour l&apos;instant.</p>
        )}

        <div className="space-y-4">
          {projetsPersonnels.map((projet) => (
            <ProjetPersonnelCard key={projet.id} projet={projet} />
          ))}
        </div>
      </div>
    </div>
  );
}
