import type { Solution } from "./types";

// Offer descriptions for organisations. These describe what the academy proposes;
// they contain no client references or results. Validate wording with the team before launch.

export const SOLUTIONS: Solution[] = [
  // ——— Segments ———
  {
    slug: "entreprises-pme",
    kind: "segment",
    title: "Entreprises & PME",
    tagline: "Identifier où la blockchain crée de la valeur pour votre activité — et où elle n'en crée pas.",
    problem:
      "Les équipes entendent parler de blockchain, de tokenisation ou de paiements numériques sans savoir distinguer l'opportunité réelle de l'effet de mode.",
    need: "Une lecture claire des usages pertinents pour votre secteur et des compétences pour en discuter avec des prestataires.",
    solution:
      "Sensibilisation des dirigeants, ateliers de cas d'usage avec les équipes métiers et, si l'intérêt est confirmé, cadrage d'un projet pilote.",
    steps: ["Échange de cadrage", "Atelier de sensibilisation", "Atelier cas d'usage", "Restitution et recommandations"],
    deliverables: ["Support de formation", "Cartographie des cas d'usage priorisés", "Note de recommandations"],
    modalities: ["Présentiel dans vos locaux", "En ligne", "Hybride"],
    services: ["sensibilisation-blockchain", "cas-usage", "formation-equipes-dirigeants", "faisabilite-projets-pilotes"],
  },
  {
    slug: "institutions-publiques",
    kind: "segment",
    title: "Institutions & administrations",
    tagline: "Comprendre les enjeux de la blockchain pour les services publics, la traçabilité et l'identité numérique.",
    problem:
      "Les administrations sont sollicitées par des projets blockchain sans toujours disposer des repères techniques et réglementaires pour les évaluer.",
    need: "Former les décideurs et les agents, et disposer d'une grille d'analyse neutre des projets proposés.",
    solution:
      "Programmes de sensibilisation pour décideurs, formations d'agents, ateliers sur la gouvernance, la transparence et la certification numérique.",
    steps: ["Analyse du contexte institutionnel", "Programme de formation", "Ateliers thématiques", "Synthèse et suites possibles"],
    deliverables: ["Programme de formation adapté", "Grille d'évaluation de projets", "Synthèse des ateliers"],
    modalities: ["Présentiel", "En ligne", "Hybride"],
    services: ["sensibilisation-blockchain", "formation-equipes-dirigeants", "conseil-strategique", "cas-usage"],
  },
  {
    slug: "ong-developpement",
    kind: "segment",
    title: "ONG & organismes de développement",
    tagline: "Explorer la blockchain au service de la traçabilité, de l'inclusion financière et de la transparence.",
    problem:
      "Les programmes de développement cherchent à améliorer la traçabilité des fonds et des produits, sans visibilité sur la maturité des solutions.",
    need: "Évaluer l'apport réel de la technologie dans le contexte du terrain et renforcer les capacités des équipes et des bénéficiaires.",
    solution:
      "Ateliers de cas d'usage (agriculture, santé, inclusion financière), études de faisabilité et programmes de renforcement de capacités.",
    steps: ["Compréhension du programme", "Ateliers avec les équipes", "Étude de faisabilité", "Plan d'action"],
    deliverables: ["Analyse de faisabilité", "Recommandations de mise en œuvre", "Modules de renforcement de capacités"],
    modalities: ["Présentiel", "En ligne", "Hybride"],
    services: ["cas-usage", "faisabilite-projets-pilotes", "programmes-sur-mesure", "sensibilisation-blockchain"],
  },
  {
    slug: "universites-ecoles",
    kind: "segment",
    title: "Universités & établissements d'enseignement",
    tagline: "Offrir à vos étudiants un apprentissage pratique de la blockchain, sans modifier vos programmes.",
    problem:
      "Les étudiants manquent d'exposition pratique aux technologies émergentes, alors que les cursus évoluent plus lentement que le marché.",
    need: "Un dispositif complémentaire aux cursus, encadré, mesurable et sans surcharge administrative.",
    solution:
      "Création d'un Club Blockchain & Web3 encadré, programme d'initiation de 4 semaines, participation au hackathon inter-universitaire et interventions de professionnels.",
    steps: [
      "Rendez-vous de présentation",
      "Désignation d'un point focal dans l'établissement",
      "Lancement d'un club ou d'un programme pilote",
      "Ateliers, mini-projets et hackathon",
      "Bilan et évolution du dispositif",
    ],
    deliverables: [
      "Ateliers pratiques adaptés au niveau des étudiants",
      "Mini-projets encadrés",
      "Attestations et certificats de participation",
      "Mention de l'établissement dans les communications de l'événement",
    ],
    modalities: ["Dans l'établissement", "En ligne", "Hybride"],
    services: ["programmes-sur-mesure", "sensibilisation-blockchain"],
  },
  // ——— Services ———
  {
    slug: "formation-equipes-dirigeants",
    kind: "service",
    title: "Formation des équipes et des dirigeants",
    tagline: "Des parcours adaptés au rôle de chacun : décider, piloter ou construire.",
    problem: "Les compétences blockchain sont rares et inégalement réparties au sein des organisations.",
    need: "Donner à chaque profil le niveau de compréhension utile à son rôle.",
    solution: "Parcours différenciés pour dirigeants, équipes métiers et équipes techniques, avec exercices sur vos propres cas.",
    steps: ["Diagnostic des besoins", "Conception du parcours", "Sessions de formation", "Évaluation des acquis"],
    deliverables: ["Programme détaillé", "Supports pédagogiques", "Attestations de participation", "Bilan de formation"],
    modalities: ["Présentiel", "En ligne", "Hybride"],
  },
  {
    slug: "sensibilisation-blockchain",
    kind: "service",
    title: "Sensibilisation à la blockchain",
    tagline: "Un socle commun pour parler de blockchain avec justesse.",
    problem: "Les idées reçues sur la blockchain freinent les décisions — dans un sens comme dans l'autre.",
    need: "Un niveau de compréhension partagé, sans jargon, ancré dans des exemples concrets.",
    solution: "Conférences et ateliers courts : fonctionnement, limites, usages réels et questions à se poser avant un projet.",
    steps: ["Choix du format et du public", "Session de sensibilisation", "Questions-réponses", "Ressources de suivi"],
    deliverables: ["Support de présentation", "Fiche de synthèse"],
    modalities: ["Présentiel", "En ligne"],
  },
  {
    slug: "conseil-strategique",
    kind: "service",
    title: "Conseil et accompagnement stratégique",
    tagline: "Un regard indépendant pour éclairer vos choix technologiques.",
    problem: "Les décisions blockchain engagent l'organisation sur la durée et mobilisent des expertises rares.",
    need: "Un accompagnement pour structurer la réflexion, évaluer les options et sécuriser les décisions.",
    solution: "Accompagnement sur la stratégie, la gouvernance et l'évaluation des solutions ou des prestataires.",
    steps: ["Entretiens de cadrage", "Analyse", "Recommandations", "Suivi"],
    deliverables: ["Note stratégique", "Recommandations priorisées"],
    modalities: ["Sur site", "À distance"],
  },
  {
    slug: "cas-usage",
    kind: "service",
    title: "Identification et cadrage de cas d'usage",
    tagline: "Partir de vos problèmes, pas de la technologie.",
    problem: "Beaucoup de projets commencent par la solution avant d'avoir défini le problème.",
    need: "Identifier les usages où la blockchain apporte une valeur mesurable par rapport aux alternatives.",
    solution: "Ateliers de co-construction avec vos équipes, analyse critique et priorisation des cas d'usage.",
    steps: ["Collecte des irritants métiers", "Atelier d'idéation", "Analyse de pertinence", "Priorisation"],
    deliverables: ["Cartographie des cas d'usage", "Fiches de cadrage", "Matrice de priorisation"],
    modalities: ["Présentiel", "Hybride"],
  },
  {
    slug: "faisabilite-projets-pilotes",
    kind: "service",
    title: "Études de faisabilité et projets pilotes",
    tagline: "Tester à petite échelle avant d'engager davantage.",
    problem: "Un projet blockchain présente des risques techniques, organisationnels et réglementaires difficiles à estimer à l'avance.",
    need: "Vérifier la faisabilité et mesurer la valeur sur un périmètre maîtrisé.",
    solution: "Étude de faisabilité puis accompagnement d'un pilote : objectifs, indicateurs, prototype et retour d'expérience.",
    steps: ["Étude de faisabilité", "Définition du pilote et des indicateurs", "Prototype", "Évaluation et décision"],
    deliverables: ["Rapport de faisabilité", "Prototype ou preuve de concept", "Bilan du pilote"],
    modalities: ["Sur site", "À distance", "Hybride"],
  },
  {
    slug: "programmes-sur-mesure",
    kind: "service",
    title: "Programmes personnalisés, ateliers et bootcamps",
    tagline: "Des formats intensifs, conçus pour votre public.",
    problem: "Les formats standards ne correspondent pas toujours au rythme et aux objectifs de votre public.",
    need: "Un format adapté : atelier d'une journée, bootcamp, club ou hackathon.",
    solution: "Conception et animation de programmes sur mesure, de l'atelier pratique au hackathon encadré.",
    steps: ["Cadrage", "Conception du programme", "Animation", "Évaluation et bilan"],
    deliverables: ["Programme détaillé", "Animation et mentorat", "Attestations", "Bilan"],
    modalities: ["Présentiel", "En ligne", "Hybride"],
  },
];

export const SEGMENTS = SOLUTIONS.filter((s) => s.kind === "segment");
export const SERVICES = SOLUTIONS.filter((s) => s.kind === "service");
export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
