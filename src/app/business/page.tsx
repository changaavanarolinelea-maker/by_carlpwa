"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BusinessCard } from "@/components/features/BusinessCard";
import { useAppData } from "@/context/AppDataContext";
import { formatFCFA } from "@/lib/format";

export default function BusinessPage() {
  const { businessProjets } = useAppData();

  const capitalTotal = businessProjets.reduce((total, p) => total + p.capitalInvesti, 0);
  const profitTotal = businessProjets.reduce((total, p) => total + p.profitPrevu, 0);

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
            <p className="font-display text-headline-sm text-espresso">{formatFCFA(capitalTotal)}</p>
          </Card>
          <Card className="p-4">
            <p className="font-sans text-label-md text-cocoa uppercase mb-1">Profit prévu total</p>
            <p className="font-display text-headline-sm text-terracotta">{formatFCFA(profitTotal)}</p>
          </Card>
        </div>

        <Link href="/business/nouveau">
          <Button variant="primary" icon={<Plus size={20} />} className="w-full">
            Nouveau Business
          </Button>
        </Link>

        {businessProjets.length === 0 && (
          <p className="font-sans text-body-sm text-cocoa">Aucun business pour l&apos;instant.</p>
        )}

        <div className="space-y-4">
          {businessProjets.map((projet) => (
            <BusinessCard key={projet.id} projet={projet} />
          ))}
        </div>
      </div>
    </div>
  );
}
