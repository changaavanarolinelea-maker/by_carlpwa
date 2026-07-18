import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "neutral" | "success" | "warning" | "risk";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-sand/60 text-espresso",
  success: "bg-sage/15 text-sage",
  warning: "bg-ochre/15 text-ochre",
  risk: "bg-brick/15 text-brick",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full font-sans text-label-md uppercase ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
