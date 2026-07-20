# Avancement — By_Carl

## Fait
- [x] Charte graphique définie
- [x] Maquettes Stitch validées (6 écrans : Accueil, Ajout, Projets personnels, Business, Détail business, Analyse)
- [x] Dépôt Git initialisé, connecté à GitHub, branches `main` et `develop` créées (GitFlow)
- [x] Squelette Next.js + TypeScript + Tailwind généré
- [x] Documentation projet (README, ARCHITECTURE, PROGRESS)
- [x] Couleurs, typographies et arrondis configurés (`globals.css`, Tailwind v4)
- [x] Composants de base : Button, Card, Badge, ProgressBar, Header, BottomNav
- [x] Page Accueil (données de compte, conseil du jour, aperçus, activités récentes)
- [x] Page Nouvelle Transaction (formulaire interactif avec `useState`)
- [x] Page Projets personnels (statuts dynamiques : prêt / ralentit / à reporter)
- [x] Page Business (vitesse de vente, capital, profit prévu)
- [x] Page Détail Business (route dynamique `/business/[id]`, calculs financiers via `reduce`)
- [x] Page Analyse (bénéfice mensuel, conseils, graphique de dépenses)

## En cours
- [ ] Relecture visuelle globale, ajustements de détail

## À venir
- [ ] Intégration Supabase (base de données, sauvegarde locale → réelle)
- [ ] Formulaire "Nouveau Projet Personnel" / "Nouveau Business" fonctionnels
- [ ] Enregistrement réel des transactions (actuellement juste affichées en console)
- [ ] Déploiement en ligne (Vercel), variables d'environnement de production

## Notes
Chaque fonctionnalité est développée sur une branche `feature/nom-de-la-fonctionnalite`,
fusionnée dans `develop` une fois terminée et vérifiée. `main` ne reçoit que du code stable.
Les 6 écrans du MVP sont maintenant tous navigables avec des données d'exemple locales.
