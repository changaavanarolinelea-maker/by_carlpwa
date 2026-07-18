import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-ivory border border-sand rounded-card p-6 shadow-[0px_4px_20px_rgba(43,27,22,0.05)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
