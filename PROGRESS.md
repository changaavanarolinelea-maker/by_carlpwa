# Avancement — By_Carl

## Fait
- [x] Charte graphique définie
- [x] Maquettes Stitch validées (6 écrans)
- [x] Dépôt Git initialisé, connecté à GitHub, GitFlow en place
- [x] Squelette Next.js + TypeScript + Tailwind généré
- [x] Documentation projet (README, ARCHITECTURE, PROGRESS)
- [x] Couleurs, typographies et arrondis configurés
- [x] Composants de base : Button, Card, Badge, ProgressBar, Header, BottomNav
- [x] 6 pages du MVP construites (Accueil, Ajouter, Projets, Business, Détail Business, Analyse)
- [x] État global partagé (`AppDataContext`) avec logique métier centralisée
- [x] Fausse couche API (`fakeApi.ts`) simulant un futur backend (délai réseau, seed, sauvegarde)
- [x] Sauvegarde locale automatique (`localStorage`) — les données survivent au rafraîchissement
- [x] Formulaire "Nouvelle Transaction" réellement fonctionnel (impacte le vrai solde)
- [x] Accueil connecté aux vraies données (solde, historique dynamique)

## En cours
- [ ] Formulaire "Nouveau Projet Personnel" fonctionnel
- [ ] Formulaire "Nouveau Business" / ajout de vente fonctionnel

## À venir
- [ ] Calcul automatique du statut des projets personnels (actuellement figé à "reporter" à la création)
- [ ] Intégration Supabase (remplacement de `fakeApi.ts` par de vrais appels réseau, aucune page à modifier)
- [ ] Déploiement en ligne (Vercel), variables d'environnement de production
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes
`src/lib/fakeApi.ts` est la seule couche qui connaîtra le backend plus tard.
Toute la logique de calcul financier (impact d'une transaction sur le solde et l'épargne)
vit dans `src/context/AppDataContext.tsx`, jamais dans les pages elles-mêmes.
