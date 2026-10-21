# Direction artistique — Africa Web3 Academy

## 1. Analyse du logo

Fichiers sources : `Africa Web3 Academy.PNG` (transparent, 500 × 500) et ses variantes `2.png` à `6.png`.

- **Symbole** : un « A » massif aux angles arrondis. Dans sa contre-forme, le continent africain est parcouru d'un réseau de lignes et de nœuds. C'est la métaphore de la marque : Afrique et systèmes distribués.
- **Logotype** : « Africa Web3 Academy », sans-serif humaniste en gras (rendu proche d'Open Sans Bold).
- **Variantes officielles** : marine sur blanc, marine profond, blanc sur marine, noir sur blanc, blanc sur noir.

### Couleurs mesurées (comptage des pixels)

| Rôle | Hex | Source |
|---|---|---|
| Marine principal | `#0A2471` | Logo principal, `3.png`, `4.png` (fond) |
| Marine profond | `#03024C` | Variante `2.png` |
| Bleu tampon | `#3069C2` | Tampon officiel de l'académie |
| Blanc | `#FFFFFF` | Contre-forme, fonds |

La palette reste volontairement **monochrome bleue** : aucune couleur ajoutée. Les teintes intermédiaires (`navy-50` à `navy-400`, `blue-600`, `slate-*`) sont dérivées de la même teinte.

### Contrastes vérifiés (WCAG)

| Combinaison | Ratio | Usage |
|---|---|---|
| `#0A2471` / blanc | 13,97 | boutons, texte de marque |
| `#03024C` / blanc | 18,8 | texte courant, fonds sombres |
| `#3069C2` / blanc | 5,35 | bouton communauté (AA) |
| `#2556A8` / blanc | 7,06 | liens |
| `#4B5578` / blanc | 7,32 | texte secondaire |
| `#C9D3EA` / `#0A2471` | 9,3 | texte secondaire sur fond sombre |
| `#7A86A8` / blanc | 3,6 | bordures de champs (≥ 3:1) |

## 2. Principes

- **Codage des parcours** : le *marine* identifie l'institution et les organisations ; le *bleu tampon* identifie les apprenants et la communauté (bouton d'en-tête, bandeau d'accueil, page Communauté).
- **Typographie** : Open Sans (écho du logotype) pour l'interface et le texte ; **Newsreader** (serif éditorial à axe optique) pour les titres. Fraunces a été écarté : son « 3 » à barre plate se lit comme un « 5 » (« Web5 »).
- **Motif réseau** (`NetworkMotif`) : nœuds et liens clairsemés, en écho au réseau du logo. Il sert uniquement de décor, jamais d'illustration crypto (pièces, chaînes, robots…).
- **Mises en page variées** : rangées éditoriales numérotées, compositions asymétriques, bandeaux pleins, listes réglées. Les cartes arrondies ne sont pas systématiques.
- **Statut visible** : badge plein = confirmé ; badge en pointillés = en préparation ; badge marine = organisé par l'académie ; badge contouré = participation.

## 3. Tokens

Tous dans `src/app/globals.css` (`:root`) : couleurs de marque et sémantiques, échelle typographique fluide (`clamp`), espacements sur une base de 4 px, rayons (4 / 8 / 18 px, en écho aux angles du « A »), ombres teintées de marine, durées (150 / 240 / 480 ms) et courbes d'animation.

## 4. Logo dans l'interface

- En-tête : le symbole officiel recadré (`public/brand/mark.png`) accompagné du nom composé en Open Sans ExtraBold. Sur fond sombre, on utilise la version négative (`mark-negative.png`), reproduction exacte de la variante officielle `4.png` sans son fond.
- Pied de page : le logo complet en négatif.
- Le logo n'a pas été redessiné. **À fournir : une version vectorielle (SVG)**, le PNG ne dépassant pas 500 px.

## 5. Mouvement

Révélations au défilement (IntersectionObserver, 480 ms, translation de 18 px), entrée du hero, transitions des menus et des filtres, pulsation discrète de quelques nœuds du motif. Tout est désactivé sous `prefers-reduced-motion`. Le contenu reste visible sans JavaScript.
