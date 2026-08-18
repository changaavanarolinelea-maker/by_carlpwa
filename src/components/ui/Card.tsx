import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-ivory border border-sand rounded-card p-4 sm:p-6 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
