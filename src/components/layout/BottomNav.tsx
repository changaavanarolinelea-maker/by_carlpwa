"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderHeart, Plus, Briefcase, BarChart3 } from "lucide-react";

const leftItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/projets", label: "Projets", icon: FolderHeart },
];

const rightItems = [
  { href: "/business", label: "Business", icon: Briefcase },
  { href: "/analyse", label: "Analyse", icon: BarChart3 },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 ${
        active ? "text-terracotta" : "text-cocoa"
      }`}
    >
      <Icon size={22} strokeWidth={1.5} />
      <span className="font-sans text-label-md">{label}</span>
    </Link>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-ivory border-t border-sand shadow-sm flex justify-around items-center px-4 pb-4 pt-2">
      {leftItems.map((item) => (
        <NavLink key={item.href} {...item} active={pathname === item.href} />
      ))}

      <Link
        href="/ajouter"
        className="relative -top-6 w-14 h-14 bg-terracotta rounded-full flex items-center justify-center text-ivory shadow-lg active:scale-[0.98] transition-transform"
      >
        <Plus size={28} />
      </Link>

      {rightItems.map((item) => (
        <NavLink key={item.href} {...item} active={pathname === item.href} />
      ))}
    </nav>
  );
}
