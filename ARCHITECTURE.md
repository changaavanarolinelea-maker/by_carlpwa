# Architecture — By_Carl

## Structure des dossiers

- `src/app/` — une page par route, suit le App Router de Next.js
- `src/components/ui/` — composants génériques sans logique métier (Bouton, Carte, Input, Badge, BarreProgression)
- `src/components/layout/` — structure de page (BottomNav, Header)
- `src/components/features/` — composants liés au métier financier (FormulaireTransaction, CarteProjetPersonnel, CarteBusiness)
- `src/lib/` — fonctions utilitaires pures (formatFCFA, calculs de profit, dates)
- `src/types/` — types TypeScript partagés (Transaction, ProjetPersonnel, ProjetBusiness, Produit)
- `src/data/` — source de données. Local au MVP, remplacé par des appels Supabase plus tard, sans changer le reste du code

## Conventions

- Composants en PascalCase (`CarteProjet.tsx`)
- Un composant = un fichier = une responsabilité claire
- Toute couleur, taille de police ou arrondi vient de `tailwind.config.ts`, jamais codé en dur dans un composant
- Toute donnée financière transite par `src/lib/` pour le calcul — jamais calculée directement dans un composant d'affichage

## Design system

Basé sur les maquettes Stitch "Premium Warm Finance" :
- Couleurs, typographies (Playfair Display / Inter) et arrondis définis dans `tailwind.config.ts`
- Voir la charte graphique complète : `charte-graphique-by-carl.md`

## Couche de données (évolution prévue)

1. **Phase actuelle** : données en mémoire / stockage local sur l'appareil, aucune authentification
2. **Phase suivante** : connexion à Supabase (PostgreSQL) pour sauvegarde et synchronisation
3. Le changement de source de données se fait uniquement dans `src/data/`, sans toucher aux pages ni composants

## Sécurité et secrets

- `.env.local` : clés locales, jamais committé (listé dans `.gitignore`)
- `.env.example` : modèle documentant les variables attendues, sans valeurs réelles
- En production : variables d'environnement configurées sur la plateforme d'hébergement, jamais dans un fichier versionné
- Toute opération sensible (calcul de bénéfice, accès aux données) doit être protégée côté base de données (règles RLS Supabase), jamais uniquement côté interface
