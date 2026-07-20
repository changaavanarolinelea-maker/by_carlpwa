"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownCircle, ArrowUpCircle, PiggyBank, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";

type NatureFlux = "entree" | "depense" | "epargne" | "vente";

const natures: { value: NatureFlux; label: string; icon: typeof ArrowDownCircle }[] = [
  { value: "entree", label: "Entrée d'argent", icon: ArrowDownCircle },
  { value: "depense", label: "Dépense", icon: ArrowUpCircle },
  { value: "epargne", label: "Épargne investissement", icon: PiggyBank },
  { value: "vente", label: "Vente", icon: Tag },
];

export default function AjouterPage() {
  const [montant, setMontant] = useState("");
  const [nature, setNature] = useState<NatureFlux>("entree");
  const [note, setNote] = useState("");
  const { ajouterTransaction } = useAppData();
  const router = useRouter();

  function handleConfirmer() {
    const montantNombre = Number(montant);
    if (!montantNombre || montantNombre <= 0) {
      return;
    }

    ajouterTransaction(nature, montantNombre, note);
    router.push("/");
  }

  return (
    <div>
      <Header />

      <div className="px-5 space-y-6">
        <h2 className="font-display text-headline-md text-espresso">Nouvelle Transaction</h2>

        <div className="bg-ivory border border-sand rounded-card p-6 text-center">
          <p className="font-sans text-label-md text-cocoa uppercase mb-2">Montant</p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              placeholder="0"
              className="font-display text-display-lg-mobile text-espresso bg-transparent text-center w-32 outline-none placeholder:text-sand"
            />
            <span className="font-display text-headline-sm text-terracotta">FCFA</span>
          </div>
        </div>

        <div>
          <p className="font-sans text-label-md text-cocoa uppercase mb-3">Nature du flux</p>
          <div className="grid grid-cols-2 gap-3">
            {natures.map(({ value, label, icon: Icon }) => {
              const active = nature === value;
              return (
                <button
                  key={value}
                  onClick={() => setNature(value)}
                  className={`p-4 rounded-control border text-left transition-colors bg-ivory ${
                    active ? "border-terracotta" : "border-sand"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "text-terracotta" : "text-cocoa"}
                    strokeWidth={1.5}
                  />
                  <p className="font-sans text-body-sm text-espresso mt-2">{label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="note" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Note / description
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ex: Déjeuner d'affaires avec Client X"
            rows={4}
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none focus:border-terracotta placeholder:text-cocoa/50"
          />
        </div>

        <Button variant="primary" onClick={handleConfirmer} className="w-full">
          Confirmer
        </Button>
      </div>
    </div>
  );
}
