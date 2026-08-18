import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  accent?: "espresso" | "terracotta" | "sage";
  className?: string;
};

const accentStyle = {
  espresso: "text-espresso",
  terracotta: "text-terracotta",
  sage: "text-sage",
};

export function StatCard({ label, value, icon, accent = "espresso", className = "" }: StatCardProps) {
  return (
    <div
      className={`bg-ivory border border-sand rounded-control px-3 py-3 flex items-center gap-2 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 ${className}`}
    >
      {icon && (
        <div className="w-8 h-8 rounded-control bg-cream flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="font-sans text-label-md text-cocoa uppercase truncate">{label}</p>
        <p className={`font-sans font-bold text-body-lg leading-snug ${accentStyle[accent]}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
