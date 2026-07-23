# Avancement — By_Carl

## Fait
- [x] Charte graphique définie
- [x] Maquettes Stitch validées (6 écrans)
- [x] Dépôt Git initialisé, connecté à GitHub, GitFlow en place
- [x] Squelette Next.js + TypeScript + Tailwind généré
- [x] Documentation projet (README, ARCHITECTURE, PROGRESS)
- [x] Couleurs, typographies et arrondis configurés
- [x] Composants de base : Button, Card, Badge, ProgressBar, Header, BottomNav, Sidebar
- [x] 6 pages du MVP construites
- [x] État global partagé (`AppDataContext`) avec logique métier centralisée
- [x] Fausse couche API (`fakeApi.ts`) avec fusion défensive anti-perte de données
- [x] Sauvegarde locale automatique (`localStorage`)
- [x] Formulaire "Nouvelle Transaction" fonctionnel, avec blocage si solde insuffisant
- [x] Formulaire "Nouveau Projet Personnel" fonctionnel
- [x] Business entièrement fonctionnel (création, produits, ventes)
- [x] Statut des projets personnels calculé dynamiquement
- [x] Protection anti double-soumission sur les 4 formulaires
- [x] Mise en page responsive (nav basse mobile, barre latérale desktop)
- [x] PWA installable : manifest.json, icônes, service worker minimal
- [x] Écran de démarrage (splash screen)

## En cours
- [ ] Amélioration visuelle générale (profondeur, mouvement, effets 3D discrets)

## À venir
- [ ] Intégration d'images de fond (en attente des images de l'utilisateur)
- [ ] Profit prévu et vitesse de vente des business (encore figés)
- [ ] Intégration Supabase
- [ ] Déploiement en ligne
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes techniques importantes
- Toute évolution future de la forme de `AppData` doit passer par une fusion défensive
  dans `chargerDonnees()` (voir `src/lib/fakeApi.ts`).
- Composant serveur → `await params`. Composant client → `useParams()`.
- Les statuts dérivés d'un calcul ne doivent jamais être stockés en dur.
- Tout formulaire de création doit avoir un state `enCours`.
- Un `Link` enveloppant un bouton/carte a besoin de `className="block"`.
- Breakpoint responsive : `md:` (768px) sépare mobile (nav basse) et desktop (sidebar).
- `sessionStorage` (pas `localStorage`) pour tout ce qui doit se réinitialiser à
  chaque nouvelle ouverture de l'app (ex: splash screen), pas persister indéfiniment.
