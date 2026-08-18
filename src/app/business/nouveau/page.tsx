"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { SlideUpContent } from "@/components/layout/SlideUpContent";

export default function NouveauBusinessPage() {
  const [nom, setNom] = useState("");
  const [capitalInvesti, setCapitalInvesti] = useState("");
  const [categorie, setCategorie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const { ajouterBusiness } = useAppData();
  const { afficherToast } = useToast();
  const router = useRouter();

  const capitalNombre = Number(capitalInvesti);
  const formulaireValide = nom.trim() !== "" && capitalNombre > 0 && categorie.trim() !== "";

  function handleCreer() {
    if (!formulaireValide || enCours) return;

    setEnCours(true);
    ajouterBusiness({
      nom: nom.trim(),
      capitalInvesti: capitalNombre,
      categorie: categorie.trim(),
    });
    afficherToast(`Business "${nom.trim()}" créé avec succès`);
    router.push("/business");
  }

  return (
    <div>
      <Header title="Nouveau Business" showBack />

      <SlideUpContent className="px-4 sm:px-5 space-y-4 md:space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <div>
          <label htmlFor="nom" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Nom du business
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Vente de bijoux"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="capital" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Capital investi (FCFA)
          </label>
          <input
            id="capital"
            type="number"
            inputMode="numeric"
            value={capitalInvesti}
            onChange={(e) => setCapitalInvesti(e.target.value)}
            placeholder="0"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="categorie" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Catégorie
          </label>
          <input
            id="categorie"
            type="text"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            placeholder="Ex: Beauté, Mode, Accessoires..."
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <p className="font-sans text-body-sm text-cocoa">
          Tu pourras ajouter des produits et enregistrer des ventes une fois le business créé.
        </p>

        <Button
          variant="primary"
          onClick={handleCreer}
          disabled={!formulaireValide || enCours}
          className="w-full"
        >
          {enCours ? "Création..." : "Créer le business"}
        </Button>
      </SlideUpContent>
    </div>
  );
}
