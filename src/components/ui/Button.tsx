import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
};

const variantStyles: Record<string, string> = {
  primary: "bg-terracotta text-ivory shadow-sm",
  secondary: "bg-ivory border border-sand text-espresso",
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
      className={`h-11 px-6 rounded-control font-sans font-semibold text-body-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
