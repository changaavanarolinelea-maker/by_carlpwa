import { Bell } from "lucide-react";

type HeaderProps = {
  variant?: "home" | "brand";
  title?: string;
};

export function Header({ variant = "brand", title }: HeaderProps) {
  return (
    <header className="w-full sticky top-0 z-40 bg-cream flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-4">
        {variant === "home" && (
          <div className="w-10 h-10 rounded-full border border-sand bg-ivory flex items-center justify-center">
            <span className="font-display text-espresso text-body-md">C</span>
          </div>
        )}
        <h1 className="font-display text-headline-sm text-espresso">
          {title ?? (variant === "home" ? "Bonjour Carl" : "By_Carl")}
        </h1>
      </div>
      <button className="p-2 text-cocoa active:scale-95 transition-transform">
        <Bell size={22} strokeWidth={1.5} />
      </button>
    </header>
  );
}
