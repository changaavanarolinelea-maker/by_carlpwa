# Avancement — By_Carl

## Fait
- [x] Projet Next.js/TypeScript/Tailwind avec architecture propre et documentée
- [x] 6 pages du MVP + Profil, entièrement fonctionnelles
- [x] État global partagé, sauvegarde locale, fausse couche API prête pour Supabase
- [x] Formulaires (Transaction, Projet, Business, Produit) fonctionnels avec validation,
      protection anti double-soumission, et calendrier personnalisé
- [x] Statuts de projets calculés dynamiquement, jamais stockés en dur
- [x] Business fonctionnel : création, produits (avec photo), ventes, recherche
- [x] Système de suppression douce : archivage + corbeille avec purge auto à 30 jours
- [x] Page Profil : statistiques d'évolution, archives, corbeille — accessible partout
      (Sidebar desktop, bouton flottant mobile)
- [x] PWA installable (manifest, icônes, service worker, splash screen)
- [x] Design responsive complet : Sidebar desktop fixe, nav mobile, typographie fluide
- [x] Système de micro-interactions cohérent (hover/press/focus) sur tous les éléments
- [x] Chargement progressif : skeletons + apparition en cascade
- [x] Transitions de page directionnelles (formulaires depuis le bas, détails depuis la droite)
- [x] Toasts de confirmation stylisés sur chaque action
- [x] Page 404 personnalisée
- [x] Images pour projets personnels et produits (stockage localStorage compressé,
      limite temporaire en attendant Supabase)
- [x] Vue scindée Détail Business : panneau d'analyse (ventes, produits populaires/stagnants)

## En cours
- (à confirmer après tests de la vue scindée)

## À venir
- [ ] Vraie fonctionnalité "Modifier" sur les projets et business (actuellement un bouton inactif)
- [ ] Authentification (mentionnée comme prochaine étape par l'utilisateur)
- [ ] Intégration Supabase — remplacera fakeApi.ts ET le stockage d'images localStorage
- [ ] Déploiement en ligne
- [ ] Fusion develop → main (premier jalon stable livrable)

## Notes techniques importantes (cumulées)
- Toute évolution de la forme de `AppData` doit passer par une fusion défensive dans
  `chargerDonnees()` (`src/lib/fakeApi.ts`).
- Composant serveur → `await params`. Composant client → `useParams()`.
- Un `Link` enveloppant un bouton/carte a besoin de `className="block"`.
- Un `transform` (translate, scale...) sur un ancêtre casse `position: sticky` de ses
  enfants — utiliser `position: fixed` pour les barres qui doivent rester réellement fixes.
- Les statuts dérivés d'un calcul ne sont jamais stockés, toujours recalculés à l'affichage.
- Suppression = douce (`supprimeLe` horodaté), jamais un retrait direct des données —
  la vraie suppression n'a lieu qu'après 30 jours (purge auto) ou action explicite en corbeille.
- Images stockées en base64 compressé dans localStorage — limite ~5-10 Mo au total,
  à surveiller ; solution définitive prévue avec Supabase Storage.
- `sessionStorage` pour tout ce qui doit se réinitialiser à chaque nouvelle session
  (splash screen), jamais `localStorage`.
