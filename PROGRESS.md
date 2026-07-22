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
- [x] Fausse couche API (`fakeApi.ts`) avec fusion défensive anti-perte de données
- [x] Sauvegarde locale automatique (`localStorage`)
- [x] Formulaire "Nouvelle Transaction" fonctionnel
- [x] Formulaire "Nouveau Projet Personnel" fonctionnel
- [x] Business entièrement fonctionnel :
  - [x] Création d'un business
  - [x] Ajout de produits à un business
  - [x] Enregistrement d'une vente (stock, historique, solde, % stock tous synchronisés)
- [x] Toutes les pages lisent les vraies données via `useAppData()` (plus aucune ne lit `mock.ts` en dur pour l'affichage dynamique)

## En cours
- [ ] Calcul automatique du statut des projets personnels (encore figé à "reporter" à la création)

## À venir
- [ ] Profit prévu et vitesse de vente des business (encore figés, à calculer ou saisir)
- [ ] Intégration Supabase (remplacement de `fakeApi.ts`, aucune page à modifier)
- [ ] Déploiement en ligne
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes techniques importantes
- Toute évolution future de la forme de `AppData` doit passer par une fusion défensive
  dans `chargerDonnees()` (voir `src/lib/fakeApi.ts`) — jamais un remplacement brut,
  pour ne pas perdre les données déjà sauvegardées chez l'utilisateur (bug rencontré
  et corrigé sur `businessDetails`).
- Composant serveur → `await params`. Composant client (`"use client"`) → `useParams()`.
  Ne pas mélanger les deux approches sur une même route.
