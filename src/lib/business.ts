import type { Produit } from "@/types";

export function calculerStockRestantPourcent(produits: Produit[]): number {
  const stockInitialTotal = produits.reduce((total, p) => total + p.stockInitial, 0);
  if (stockInitialTotal === 0) return 100;

  const stockRestantTotal = produits.reduce((total, p) => total + p.stockRestant, 0);
  return Math.round((stockRestantTotal / stockInitialTotal) * 100);
}

export function genererSlug(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
