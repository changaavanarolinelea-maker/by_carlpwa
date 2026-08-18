"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { SlideUpContent } from "@/components/layout/SlideUpContent";
import { ImagePicker } from "@/components/ui/ImagePicker";

export default function NouveauProduitPage() {
  const { id } = useParams<{ id: string }>();
  const [nom, setNom] = useState("");
  const [prixVente, setPrixVente] = useState("");
  const [stockInitial, setStockInitial] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { ajouterProduit } = useAppData();
  const router = useRouter();

  const prixNombre = Number(prixVente);
  const stockNombre = Number(stockInitial);
  const formulaireValide = nom.trim() !== "" && prixNombre > 0 && stockNombre > 0;
  const { afficherToast } = useToast();

  function handleCreer() {
    if (!formulaireValide || enCours) return;

    setEnCours(true);
    ajouterProduit(id, {
      nom: nom.trim(),
      prixVente: prixNombre,
      stockInitial: stockNombre,
      imageUrl,
    });
    afficherToast(`Produit "${nom.trim()}" ajouté avec succès`);
    router.push(`/business/${id}`);
  }

  return (
    <div>
      <Header title="Nouveau Produit" showBack/>

      <SlideUpContent className="px-4 sm:px-5 space-y-4 md:space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <div>
          <label htmlFor="nom" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            <ImagePicker value={imageUrl} onChange={setImageUrl} />
            Nom du produit
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Sac modèle C"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="prix" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Prix de vente (FCFA)
          </label>
          <input
            id="prix"
            type="number"
            inputMode="numeric"
            value={prixVente}
            onChange={(e) => setPrixVente(e.target.value)}
            placeholder="0"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="stock" className="font-sans text-label-md text-cocoa uppercase mb-2 block">
            Quantité en stock
          </label>
          <input
            id="stock"
            type="number"
            inputMode="numeric"
            value={stockInitial}
            onChange={(e) => setStockInitial(e.target.value)}
            placeholder="0"
            className="w-full bg-ivory border border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleCreer}
          disabled={!formulaireValide || enCours}
          className="w-full"
        >
          {enCours ? "Ajout..." : "Ajouter le produit"}
        </Button>
      </SlideUpContent>
    </div>
  );
}
