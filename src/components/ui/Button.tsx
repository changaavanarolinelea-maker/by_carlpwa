import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
};

const variantStyles: Record<string, string> = {
  primary: "bg-terracotta text-ivory shadow-soft hover:shadow-glow-terracotta hover:brightness-105",
  secondary: "bg-ivory border border-sand text-espresso hover:border-terracotta hover:shadow-soft",
};

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`min-h-11 px-4 py-2.5 rounded-control font-sans font-semibold text-body-md text-center leading-snug flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 disabled:opacity-40 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:active:scale-100 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
