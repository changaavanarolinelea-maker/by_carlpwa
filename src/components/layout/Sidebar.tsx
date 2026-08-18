"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderHeart, Plus, Briefcase, BarChart3, UserCircle } from "lucide-react";

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/projets", label: "Projets", icon: FolderHeart },
  { href: "/business", label: "Business", icon: Briefcase },
  { href: "/analyse", label: "Analyse", icon: BarChart3 },
  { href: "/profil", label: "Profil", icon: UserCircle },
];

function estActif(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:left-0 md:bg-ivory md:shadow-[4px_0_24px_rgba(43,27,22,0.05)] md:py-8 md:px-6 md:z-30">
<div className="flex items-center gap-2 px-3 pb-6 mb-6 border-b border-sand">
  <img src="/icon-192.png" alt="By_Carl" className="w-8 h-8 rounded-control" />
  <p className="font-display text-headline-sm text-espresso">By_Carl</p>
</div>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = estActif(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 px-3 py-3 rounded-control font-sans text-body-md transition-colors ${
                active
                  ? "bg-terracotta/10 text-terracotta font-semibold"
                  : "text-cocoa hover:bg-sand/40"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-terracotta" />
              )}
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-sand">
        <Link
          href="/ajouter"
          className="w-full flex items-center justify-center gap-2 bg-terracotta text-ivory rounded-control py-3 mt-6 font-sans font-semibold text-body-md transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2} />
          Nouvelle transaction
        </Link>
      </div>
    </aside>
  );
}
