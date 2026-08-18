"use client";

import { useEffect, useRef, useState } from "react";

export function useIsScrolling(delaiArret = 200) {
  const [enDefilement, setEnDefilement] = useState(false);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function gererDefilement() {
      setEnDefilement(true);

      if (minuteur.current) clearTimeout(minuteur.current);
      minuteur.current = setTimeout(() => setEnDefilement(false), delaiArret);
    }

    window.addEventListener("scroll", gererDefilement, { passive: true });
    return () => {
      window.removeEventListener("scroll", gererDefilement);
      if (minuteur.current) clearTimeout(minuteur.current);
    };
  }, [delaiArret]);

  return enDefilement;
}
