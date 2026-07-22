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
- [x] Mise en page responsive : navigation basse sur mobile, barre latérale fixe sur
      desktop (dès 768px), largeur de contenu contenue pour rester lisible sur grand écran

## En cours
- (rien en cours actuellement)

## À venir
- [ ] Profit prévu et vitesse de vente des business (encore figés, à calculer ou saisir)
- [ ] Centraliser la règle "quelle nature de flux est une sortie d'argent"
- [ ] Intégration Supabase
- [ ] Configuration PWA (manifest, icônes, installabilité)
- [ ] Déploiement en ligne
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes techniques importantes
- Toute évolution future de la forme de `AppData` doit passer par une fusion défensive
  dans `chargerDonnees()` (voir `src/lib/fakeApi.ts`).
- Composant serveur → `await params`. Composant client → `useParams()`.
- Les statuts dérivés d'un calcul ne doivent jamais être stockés en dur.
- Tout formulaire de création doit avoir un state `enCours`.
- Un `Link` de Next.js est une balise `<a>` inline par défaut : s'il enveloppe un
  bouton, une carte, ou tout élément avec de l'espacement vertical autour
  (`space-y-*`), il a besoin de `className="block"`, sinon les marges sont ignorées.
- Breakpoint responsive choisi : `md:` (768px) sépare l'expérience mobile (nav basse)
  de l'expérience desktop (barre latérale). Contenu limité à `max-w-xl` (576px).
