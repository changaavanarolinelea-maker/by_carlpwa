# By_Carl

Application de gestion financière personnelle et business pour usage individuel.

## Ce que fait le projet

By_Carl est un carnet financier intelligent. L'utilisateur enregistre manuellement
ses entrées d'argent, dépenses, épargnes et ventes. L'application calcule,
analyse et conseille — mais n'a jamais accès à un compte bancaire réel et ne
peut déplacer aucun argent.

## Stack technique

- Next.js (App Router) + TypeScript
- Tailwind CSS (charte graphique "Premium Warm Finance")
- Supabase (base de données + stockage), intégré dans une phase ultérieure
- Stockage local dans un premier temps (aucune authentification au MVP)

## Démarrage local

\`\`\`bash
npm install
npm run dev
\`\`\`

Ouvrir http://localhost:3000

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — structure technique et conventions
- [PROGRESS.md](./PROGRESS.md) — avancement du projet, étapes faites et à venir

## Sécurité

Aucune clé secrète n'est jamais committée. Voir `.env.example` pour la liste
des variables nécessaires. En production, les clés sont configurées directement
sur la plateforme d'hébergement (variables d'environnement), jamais dans un fichier versionné.
