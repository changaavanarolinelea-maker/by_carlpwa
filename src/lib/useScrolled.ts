"use client";

import { useEffect, useState } from "react";

export function useScrolled(seuil = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function verifier() {
      setScrolled(window.scrollY > seuil);
    }

    verifier();
    window.addEventListener("scroll", verifier, { passive: true });
    return () => window.removeEventListener("scroll", verifier);
  }, [seuil]);

  return scrolled;
}
