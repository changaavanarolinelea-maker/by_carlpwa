import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-4">
      <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mb-2">
        <Compass size={32} className="text-terracotta" strokeWidth={1.5} />
      </div>
      <p className="font-display text-display-lg-mobile text-espresso">Page introuvable</p>
      <p className="font-sans text-body-md text-cocoa max-w-xs">
        Cette page n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour continuer.
      </p>
      <Link
        href="/"
        className="mt-4 min-h-11 px-6 rounded-control bg-terracotta text-ivory font-sans font-semibold text-body-md flex items-center justify-center shadow-soft transition-all duration-200 hover:shadow-glow-terracotta active:scale-[0.98]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
