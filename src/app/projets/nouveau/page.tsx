"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Wallet, Calendar } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useAppData } from "@/context/AppDataContext";
import { useToast } from "@/context/ToastContext";
import { DatePicker } from "@/components/ui/DatePicker";
import { SlideUpContent } from "@/components/layout/SlideUpContent";
import { ImagePicker } from "@/components/ui/ImagePicker";

type Priorite = "haute" | "moyenne" | "basse";

const priorites: { value: Priorite; label: string; couleur: string }[] = [
  { value: "haute", label: "Haute", couleur: "border-brick text-brick bg-brick/5" },
  { value: "moyenne", label: "Moyenne", couleur: "border-ochre text-ochre bg-ochre/5" },
  { value: "basse", label: "Basse", couleur: "border-sage text-sage bg-sage/5" },
];

export default function NouveauProjetPersonnelPage() {
  const [nom, setNom] = useState("");
  const [objectif, setObjectif] = useState("");
  const [priorite, setPriorite] = useState<Priorite>("moyenne");
  const [prevuLe, setPrevuLe] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { ajouterProjetPersonnel } = useAppData();
  const router = useRouter();
  const { afficherToast } = useToast();

  const objectifNombre = Number(objectif);
  const champsRemplis = [nom.trim() !== "", objectifNombre > 0, prevuLe.trim() !== ""];
  const completion = champsRemplis.filter(Boolean).length / champsRemplis.length;
  const formulaireValide = completion === 1;
  

  function handleCreer() {
    if (!formulaireValide || enCours) return;

    setEnCours(true);
    ajouterProjetPersonnel({
      nom: nom.trim(),
      objectif: objectifNombre,
      epargne: 0,
      priorite,
      prevuLe: prevuLe.trim(),
      imageUrl,
    });

    afficherToast(`Projet "${nom.trim()}" créé avec succès`);
    router.push("/projets");
  }

  return (
    <div>
      <Header title="Nouveau Projet" showBack/>

      <SlideUpContent className="px-4 sm:px-5 space-y-4 md:space-y-6 mt-6 md:max-w-xl md:mx-auto">
        <div>
          <label htmlFor="nom" className="flex items-center gap-1.5 font-sans text-label-md text-terracotta uppercase mb-2">
            <Sparkles size={14} strokeWidth={2} />
            <ImagePicker value={imageUrl} onChange={setImageUrl} />
            Nom du projet
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Nouvel ordinateur"
            className="w-full bg-ivory border-2 border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <label htmlFor="objectif" className="flex items-center gap-1.5 font-sans text-label-md text-terracotta uppercase mb-2">
            <Wallet size={14} strokeWidth={2} />
            Montant objectif (FCFA)
          </label>
          <input
            id="objectif"
            type="number"
            inputMode="numeric"
            value={objectif}
            onChange={(e) => setObjectif(e.target.value)}
            placeholder="0"
            className="w-full bg-ivory border-2 border-sand rounded-control p-4 font-sans text-body-md text-espresso outline-none transition-all duration-200 focus:border-terracotta focus:shadow-soft placeholder:text-cocoa/50"
          />
        </div>

        <div>
          <p className="font-sans text-label-md text-terracotta uppercase mb-3">Priorité</p>
          <div className="grid grid-cols-3 gap-3">
            {priorites.map(({ value, label, couleur }) => {
              const active = priorite === value;
              return (
                <button
                  key={value}
                  onClick={() => setPriorite(value)}
                  className={`py-3 rounded-control border-2 font-sans text-body-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                    active ? couleur : "border-sand text-cocoa bg-ivory hover:border-cocoa/30"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

 <div>
  <label className="flex items-center gap-1.5 font-sans text-label-md text-terracotta uppercase mb-2">
    <Calendar size={14} strokeWidth={2} />
    Échéance visée
  </label>
  <DatePicker value={prevuLe} onChange={setPrevuLe} />
</div>

        <div className="group relative">
  <button
    onClick={handleCreer}
    disabled={!formulaireValide || enCours}
    style={{ opacity: enCours ? 1 : 0.35 + completion * 0.65 }}
    className="w-full min-h-11 px-4 py-2.5 rounded-control font-sans font-semibold text-body-md bg-terracotta text-ivory shadow-soft transition-all duration-300 enabled:hover:shadow-glow-terracotta enabled:hover:brightness-105 enabled:active:scale-[0.98]"
  >
    {enCours ? "Création..." : "Créer le projet"}
  </button>
  {!formulaireValide && (
    <p className="hidden group-hover:block absolute -bottom-7 left-0 right-0 text-center font-sans text-body-sm text-brick">
      Remplis tous les champs pour continuer
    </p>
  )}
</div>
      </SlideUpContent>
    </div>
  );
}
