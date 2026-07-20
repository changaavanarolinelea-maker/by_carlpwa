# Avancement — By_Carl

## Fait
- [x] Charte graphique définie
- [x] Maquettes Stitch validées (6 écrans)
- [x] Dépôt Git initialisé, connecté à GitHub, GitFlow en place
- [x] Squelette Next.js + TypeScript + Tailwind généré
- [x] Documentation projet (README, ARCHITECTURE, PROGRESS)
- [x] Couleurs, typographies et arrondis configurés
- [x] Composants de base : Button, Card, Badge, ProgressBar, Header, BottomNav
- [x] 6 pages du MVP construites
- [x] État global partagé (`AppDataContext`) avec logique métier centralisée
- [x] Fausse couche API (`fakeApi.ts`) simulant un futur backend
- [x] Sauvegarde locale automatique (`localStorage`)
- [x] Formulaire "Nouvelle Transaction" fonctionnel
- [x] Accueil connecté aux vraies données
- [x] Page Projets connectée aux vraies données
- [x] Formulaire "Nouveau Projet Personnel" fonctionnel, avec validation

## En cours
- [ ] Formulaire "Nouveau Business" / enregistrer une vente

## À venir
- [ ] Calcul automatique du statut des projets personnels (basé sur l'épargne réelle vs objectif)
- [ ] Page Business et Détail Business reconnectées aux vraies données (encore statiques)
- [ ] Intégration Supabase
- [ ] Déploiement en ligne
- [ ] Fusion develop → main

## Notes
Toute nouvelle page qui affiche des données modifiables doit utiliser `useAppData()`,
jamais importer directement `src/data/mock.ts` — sinon les créations/modifications de
l'utilisateur n'apparaîtront pas (bug rencontré et corrigé sur la page Projets).
