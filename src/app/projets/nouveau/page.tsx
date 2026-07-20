"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";

type Priorite = "haute" | "moyenne" | "basse";

const priorites: { value: Priorite; label: string }[] = [
  { value: "haute", label: "Haute" },
  { value: "moyenne", label: "Moyenne" },
  { value: "basse", label: "Basse" },
];

export default function NouveauProjetPersonnelPage() {
  const [nom, setNom] = useState("");
  const [objectif, setObjectif] = useState("");
  const [priorite, setPriorite] = useState<Priorite>("moyenne");
  const [prevuLe, setPrevuLe] = useState("");
  const { ajouterProjetPersonnel } = useAppData();
  const router = useRouter();

  const objectifNombre = Number(objectif);
  const formulaireValide = nom.trim() !== "" && objectifNombre > 0 && prevuLe.trim() !== "";

  function handleCreer() {
    if (!formulaireValide) return;

    ajouterProjetPersonnel({
      nom: nom.trim(),
      objectif: objectifNombre,
      epargne: 0,
      priorite,
      prevuLe: prevuLe.trim(),
    });

    router.push("/projets");
  }

  return (
    <div>
      <Header title="Nouveau Projet" />

      <div className="px-5 space-y-6">
        <div>
          <label htmlFor="nom" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Nom du projet
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Nouvel ordinateur"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none focus:border-terracotta placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="objectif" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Montant objectif (FCFA)
          </label>
          <input
            id="objectif"
            type="number"
            inputMode="numeric"
            value={objectif}
            onChange={(e) => setObjectif(e.target.value)}
            placeholder="0"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none focus:border-terracotta placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <p className="font-sans text-label-md text-cocoa uppercase mb-3">Priorité</p>
          <div className="grid grid-cols-3 gap-3">
            {priorites.map(({ value, label }) => {
              const active = priorite === value;
              return (
                <button
                  key={value}
                  onClick={() => setPriorite(value)}
                  className={`py-3 rounded-control border font-sans text-body-sm ${
                    active ? "border-terracotta text-terracotta bg-terracotta/5" : "border-sand text-cocoa bg-ivory"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="prevuLe" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Échéance visée
          </label>
          <input
            id="prevuLe"
            type="text"
            value={prevuLe}
            onChange={(e) => setPrevuLe(e.target.value)}
            placeholder="Ex: Déc. 2026"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none focus:border-terracotta placeholder:text-cocoa/50"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleCreer}
          disabled={!formulaireValide}
          className="w-full"
        >
          Créer le projet
        </Button>
      </div>
    </div>
  );
}
