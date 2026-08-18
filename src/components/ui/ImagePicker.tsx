"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const LARGEUR_MAX = 480;
const QUALITE_JPEG = 0.7;

export function ImagePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [enCours, setEnCours] = useState(false);

  function handleFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;

    setEnCours(true);
    const lecteur = new FileReader();

    lecteur.onload = () => {
      const image = new Image();
      image.onload = () => {
        const ratio = Math.min(1, LARGEUR_MAX / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = image.width * ratio;
        canvas.height = image.height * ratio;

        const contexte = canvas.getContext("2d");
        contexte?.drawImage(image, 0, 0, canvas.width, canvas.height);

        onChange(canvas.toDataURL("image/jpeg", QUALITE_JPEG));
        setEnCours(false);
      };
      image.src = lecteur.result as string;
    };

    lecteur.readAsDataURL(fichier);
  }

  return (
    <div>
      <label className="font-sans text-label-md text-terracotta uppercase mb-2 block">
        Photo (optionnel)
      </label>

      {value ? (
        <div className="relative w-full h-36 rounded-control overflow-hidden border border-sand">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            aria-label="Retirer la photo"
            className="absolute top-2 right-2 p-1.5 rounded-full bg-espresso/70 text-cream backdrop-blur-sm hover:bg-espresso transition-colors"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={enCours}
          className="w-full h-24 border-2 border-dashed border-sand rounded-control flex flex-col items-center justify-center gap-1.5 text-cocoa transition-colors hover:border-terracotta/50 hover:text-terracotta disabled:opacity-50"
        >
          <ImagePlus size={20} strokeWidth={1.5} />
          <span className="font-sans text-body-sm">
            {enCours ? "Chargement..." : "Ajouter une photo"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFichier}
        className="hidden"
      />
    </div>
  );
}
