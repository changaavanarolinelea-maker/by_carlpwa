"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const decalageX = (e.clientX - centreX) / (rect.width / 2);
    const decalageY = (e.clientY - centreY) / (rect.height / 2);

    setStyle({
      transform: `perspective(800px) rotateY(${decalageX * 6}deg) rotateX(${-decalageY * 6}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}
