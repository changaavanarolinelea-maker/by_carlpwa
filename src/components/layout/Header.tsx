"use client";

import { useState } from "react";
import { Bell, ArrowLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/lib/useScrolled";
import Link from "next/link";

type HeaderProps = {
  variant?: "home" | "brand";
  title?: string;
  showBack?: boolean;
  recherche?: { valeur: string; onChange: (v: string) => void; placeholder: string };
};

export function Header({ variant = "brand", title, showBack = false, recherche }: HeaderProps) {
  const scrolled = useScrolled();
  const router = useRouter();
  const [rechercheOuverte, setRechercheOuverte] = useState(false);

  function fermerRecherche() {
    recherche?.onChange("");
    setRechercheOuverte(false);
  }

  function gererCroix() {
    if (recherche?.valeur) {
      recherche.onChange("");
    } else {
      fermerRecherche();
    }
  }

  return (
    <header
      className={`w-full fixed top-0 md:left-64 md:w-[calc(100%-16rem)] z-40 flex items-center justify-between px-4 sm:px-5 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md border-b border-sand shadow-soft"
          : "bg-cream border-b border-transparent"
      }`}
    >
      {rechercheOuverte && recherche ? (
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 relative">
            <input
              autoFocus
              value={recherche.valeur}
              onChange={(e) => recherche.onChange(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && fermerRecherche()}
              placeholder={recherche.placeholder}
              className="w-full bg-ivory border border-sand rounded-control pl-4 pr-9 py-2 font-sans text-body-md text-espresso outline-none focus:border-terracotta"
            />
            {recherche.valeur && (
              <button
                onClick={gererCroix}
                aria-label="Effacer"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-cocoa hover:bg-sand/60 transition-colors"
              >
                <X size={16} strokeWidth={2} />
              </button>
            )}
          </div>
          <button
            onClick={fermerRecherche}
            aria-label="Fermer la recherche"
            className="font-sans text-body-sm text-cocoa px-2 hover:text-terracotta transition-colors"
          >
            Annuler
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => router.back()}
                aria-label="Retour"
                className="p-2 rounded-control bg-ivory/60 backdrop-blur-sm border border-sand/60 text-espresso transition-colors duration-200 hover:bg-ivory/90"
              >
                <ArrowLeft size={20} strokeWidth={1.5} />
              </button>
            )}

            <h1 className="font-display text-headline-sm text-espresso">
              {title ?? (variant === "home" ? "Bonjour Carl" : "By_Carl")}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            {recherche && (
              <button
                onClick={() => setRechercheOuverte(true)}
                aria-label="Rechercher"
                className="p-2 rounded-control text-cocoa transition-all duration-200 hover:bg-ivory/70 hover:backdrop-blur-sm hover:border hover:border-sand/60 active:scale-95"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
            )}
            <button className="p-2 rounded-control text-cocoa transition-all duration-200 hover:bg-sand/50 hover:text-terracotta active:scale-95">
              <Bell size={22} strokeWidth={1.5} />
            </button>
          </div>
        </>
      )}
    </header>
  );
}
