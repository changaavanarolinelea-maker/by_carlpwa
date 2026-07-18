import { Bell } from "lucide-react";

type HeaderProps = {
  title: string;
  compact?: boolean;
};

export function Header({ title, compact = false }: HeaderProps) {
  return (
    <header className="w-full sticky top-0 z-40 bg-cream flex items-center justify-between px-5 py-4">
      <h1
        className={`font-display text-espresso ${
          compact ? "text-headline-sm" : "text-display-lg-mobile"
        }`}
      >
        {title}
      </h1>
      <button className="p-2 text-cocoa active:scale-95 transition-transform">
        <Bell size={22} strokeWidth={1.5} />
      </button>
    </header>
  );
}
