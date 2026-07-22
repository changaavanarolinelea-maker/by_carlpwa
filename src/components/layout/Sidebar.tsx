"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderHeart, Plus, Briefcase, BarChart3 } from "lucide-react";

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/projets", label: "Projets", icon: FolderHeart },
  { href: "/business", label: "Business", icon: Briefcase },
  { href: "/analyse", label: "Analyse", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:left-0 md:border-r md:border-sand md:bg-cream md:py-8 md:px-6 md:z-30">
      <p className="font-display text-headline-sm text-espresso mb-10 px-3">By_Carl</p>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-3 rounded-control font-sans text-body-md transition-colors ${
                active ? "bg-terracotta/10 text-terracotta" : "text-cocoa hover:bg-sand/30"
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link href="/ajouter" className="mt-auto pt-6">
        <button className="w-full flex items-center justify-center gap-2 bg-terracotta text-ivory rounded-control py-3 font-sans font-semibold text-body-md transition-transform active:scale-[0.98]">
          <Plus size={18} strokeWidth={2} />
          Nouvelle transaction
        </button>
      </Link>
    </aside>
  );
}
