"use client";

import Link from "next/link";

export function ProfilFloatingButton() {
  return (
    <Link
      href="/profil"
      aria-label="Profil"
      className="md:hidden fixed top-3 right-3 z-[60] w-9 h-9 rounded-full border border-sand bg-ivory/90 backdrop-blur-sm shadow-soft flex items-center justify-center transition-transform active:scale-90"
    >
      <span className="font-display text-espresso text-body-sm">C</span>
    </Link>
  );
}
