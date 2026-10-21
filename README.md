# Site web — Africa Web3 Academy

Site institutionnel en français : formations, solutions pour les organisations, événements, partenaires, ressources et communauté.
Stack : Next.js 15 (App Router), React 19, TypeScript, CSS Modules. Aucune dépendance ajoutée au projet généré par create-next-app.

## Lancer le projet

```bash
npm install
cp .env.example .env.local   # puis compléter
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

> **Windows** : lancez `npm run build` depuis un chemin commençant par `C:\` (et non `c:\`), et jamais pendant qu'un `npm run dev` tourne. Les deux processus partagent le dossier `.next`, ce qui produit des erreurs « Invariant: no direct app page entry found » ou `ENOENT required-server-files.json`.

## Structure

```
src/
  app/                 pages (routes en français : /formations, /organisations, /projet, /evenements,
                       /partenaires, /ressources, /a-propos, /contact, /communaute, pages légales)
    api/forms/route.ts envoi des formulaires (validation serveur, anti-spam, Resend)
    globals.css        tokens de design (couleurs du logo, typo, espacements, mouvement)
    sitemap.ts, robots.ts, icon.png, not-found.tsx
  components/          Header (mega-menus + menu mobile), Footer, PageHero, Form, FilterBar, Cards, Gallery…
  content/             TOUS les contenus éditables (voir ci-dessous)
  lib/forms.ts         définition des formulaires, partagée entre client et serveur
public/brand/          déclinaisons du logo officiel
docs/DESIGN.md         direction artistique et contrastes vérifiés
```

## Modifier les contenus

**Le plus simple : l'application d'administration** ([../admin](../admin/README.md)), qui édite les fichiers ci-dessous avec validation.

Les données éditables sont dans `content/*.json` (`trainings`, `events`, `partners`, `resources`, `faq`, `community`, `seo`). Les modules `src/content/*.ts` les typent et y ajoutent la logique ; les libellés, solutions, équipe et navigation restent dans ces fichiers TypeScript :

| Fichier | Contenu |
|---|---|
| `trainings.ts` | Formations et sessions. `status` : `confirme`, `en-preparation` (affiché « contenu provisoire »), `sur-demande`. Ajoutez une session dans `sessions: [{ start: "2027-01-15", modality: "hybride", city: "Abidjan" }]` : elle apparaît dans la fiche et dans le mega-menu. |
| `events.ts` | Événements. `role` doit refléter la réalité (`organisateur`, `intervenant`, `participant`…). Photos : `public/media/events/<slug>/`, à déclarer dans `media`. `pending` affiche un avertissement « fiche en cours de complétion ». |
| `partners.ts` | Partenaires **confirmés uniquement**. Le logo ne s'affiche que si `logoAuthorized: true`. |
| `resources.ts` | Articles, guides, publications, ainsi que la FAQ. |
| `solutions.ts` | Segments (entreprises, institutions…) et offres, selon la structure problème → besoin → solution → déroulement → livrables → modalités. |
| `community.ts` | **Canaux communautaires** et règles de conduite. |
| `about.ts` | Équipe et pôles. |
| `site.ts` | Coordonnées, réseaux sociaux, libellés. |
| `navigation.ts` | Menus et pied de page. |

### Configurer les liens communautaires

Depuis l'admin (« Liens communautaires »), ou directement dans `content/community.json`, ajoutez les **liens d'invitation officiels** :

```json
[{ "id": "whatsapp", "label": "Groupe WhatsApp", "description": "Annonces et échanges", "url": "https://chat.whatsapp.com/…", "primary": true }]
```

Tant que la liste est vide, le site affiche « canaux en cours d'ouverture » et tous les boutons « Rejoindre la communauté » mènent au formulaire d'inscription. Dès qu'un canal est marqué `primary`, ces boutons pointent vers lui.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique (liens canoniques, sitemap, Open Graph). Par défaut : `https://africaweb3.academy` (domaine relevé dans une signature e-mail, à confirmer). |
| `RESEND_API_KEY` | Clé API Resend, côté serveur uniquement. |
| `FORMS_FROM_EMAIL` | Expéditeur, sur un domaine vérifié dans Resend. |
| `FORMS_TO_EMAIL` | Destinataire(s) des demandes, séparés par des virgules. |
| `SUBMISSIONS_STORE` | `on` (défaut) : les demandes sont enregistrées dans `data/submissions.jsonl`, lisible depuis l'admin. Mettre `off` sur un hébergeur sans disque persistant (Vercel). |
| `SUBMISSIONS_FILE` | Optionnel : chemin du fichier des demandes. |

## Services externes

- **Resend** (envoi des formulaires par e-mail, optionnel si l'enregistrement local est actif) : à créer sur resend.com, puis vérifier le domaine. Une demande n'est confirmée que si elle a été réellement enregistrée ou envoyée ; sans aucun canal, le formulaire affiche une erreur explicite. **Aucun faux succès.**
- `data/` contient des données personnelles : ce dossier est ignoré par Git, et il faut le sauvegarder à part.
- Aucun outil d'analytics, de cookies ou de traceurs. Si vous en ajoutez un, il faudra mettre en place un bandeau de consentement.

## Formulaires

Validation client et serveur (règles partagées dans `lib/forms.ts`), messages d'erreur sous chaque champ, focus sur le premier champ en erreur, états de chargement, de succès et d'erreur (réseau compris). Protection anti-spam : champ piège, délai minimal de remplissage de 2,5 s, limite de 5 envois par IP toutes les 10 minutes (en mémoire, par instance). Consentement obligatoire ; consentement spécifique aux communications pour la communauté.

## Tests réalisés

- `tsc` et `eslint` : 0 erreur. `next build` : 46 pages générées statiquement, environ 108 kB de JS au premier chargement.
- HTTP : les 24 routes répondent 200 et la 404 fonctionne. API : 400 pour une requête invalide ou du spam, 422 pour une validation échouée, 429 en cas de débit excessif, 503 si l'envoi n'est pas configuré.
- Navigateur (Chrome headless via CDP) : ouverture des mega-menus au clic, fermeture par Échap avec retour du focus, fermeture au clic extérieur, page active, en-tête plein au défilement, menu mobile et sous-menus, filtres pilotés par l'URL et état vide, recherche insensible aux accents, validation et message honnête « non configuré ». Aucun débordement horizontal à 360 et 390 px. Sur 10 pages : un seul `h1`, aucune image sans `alt`, aucun champ sans libellé, aucun identifiant dupliqué. Aucune erreur console.
- Non testé : envoi réel via Resend (clé absente), lecteurs d'écran, mesures Lighthouse et Core Web Vitals sur un hébergement réel.

## Administration

Voir [../admin/README.md](../admin/README.md). Si l'admin doit un jour être utilisé à distance par plusieurs personnes, l'évolution naturelle est une base hébergée (Supabase, par exemple) à la place des fichiers JSON.

## Reste à fournir ou à configurer

1. Logo en SVG (le PNG est limité à 500 px).
2. Photos authentiques d'ateliers et d'événements, avec autorisation de diffusion.
3. Liens officiels des canaux communautaires et des réseaux sociaux.
4. Compte Resend et domaine d'envoi vérifié.
5. Dates des prochaines sessions ; modalité (présentiel, en ligne ou hybride) du parcours Développeur.
6. Programmes détaillés des formations « en préparation ».
7. Dates, lieu et établissements participants du hackathon 2026 ; compte rendu, intervenants et photos du panel de novembre 2025.
8. Partenaires confirmés et autorisations d'utiliser leurs logos.
9. Mentions légales : forme juridique, RCCM, directeur de la publication, hébergeur ; durée de conservation des données.
10. Formateurs et mentors acceptant d'être présentés.
11. Indicateurs d'impact vérifiés.
12. Confirmation du domaine `africaweb3.academy`.

Le site n'a pas été déployé.
