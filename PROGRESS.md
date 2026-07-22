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
- [x] Formulaire "Nouvelle Transaction" fonctionnel, avec blocage si solde insuffisant
- [x] Formulaire "Nouveau Projet Personnel" fonctionnel
- [x] Business entièrement fonctionnel (création, produits, ventes)
- [x] Statut des projets personnels calculé dynamiquement (`src/lib/projets.ts`),
      jamais stocké — se met à jour tout seul selon le solde réel
- [x] Protection anti double-soumission sur les 4 formulaires

## En cours
- (rien en cours actuellement)

## À venir
- [ ] Profit prévu et vitesse de vente des business (encore figés, à calculer ou saisir)
- [ ] Centraliser la règle "quelle nature de flux est une sortie d'argent"
      (dupliquée actuellement entre `AppDataContext.tsx` et `app/ajouter/page.tsx`)
- [ ] Intégration Supabase (remplacement de `fakeApi.ts`, aucune page à modifier)
- [ ] Déploiement en ligne
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes techniques importantes
- Toute évolution future de la forme de `AppData` doit passer par une fusion défensive
  dans `chargerDonnees()` (voir `src/lib/fakeApi.ts`) — jamais un remplacement brut.
- Composant serveur → `await params`. Composant client (`"use client"`) → `useParams()`.
- Les statuts dérivés d'un calcul (ex: statut de projet) ne doivent jamais être stockés
  en dur dans les données — toujours recalculés à l'affichage, pour rester toujours justes.
- Tout formulaire de création doit avoir un state `enCours` pour bloquer la double-soumission.
