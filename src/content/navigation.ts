export interface NavLink { label: string; href: string; description?: string }
export interface NavGroup { title: string; links: NavLink[] }
export interface NavItem {
  label: string;
  href: string;
  mega?: {
    intro: { title: string; text: string; cta: NavLink };
    groups: NavGroup[];
    /** formations menu shows the next confirmed sessions */
    showSessions?: boolean;
  };
}

export const NAV: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Formations",
    href: "/formations",
    mega: {
      intro: {
        title: "Apprendre en construisant",
        text: "Des parcours pratiques, de l'initiation au développement de dApps, en présentiel, en ligne ou en hybride.",
        cta: { label: "Voir le catalogue complet", href: "/formations" },
      },
      groups: [
        {
          title: "Domaines",
          links: [
            { label: "Développement blockchain & Web3", href: "/formations/developpeur-blockchain-web3", description: "Parcours de 6 mois, projet fil rouge" },
            { label: "Smart contracts & dApps", href: "/formations/smart-contracts-applications-decentralisees", description: "Spécialisation développeurs" },
            { label: "Product & Project Management", href: "/formations?domaine=produit-projet", description: "Concevoir et piloter des projets Web3" },
            { label: "Marketing & Community", href: "/formations?domaine=marketing-communaute", description: "Communiquer et fédérer" },
            { label: "Formations sur mesure", href: "/formations/formations-sur-mesure", description: "Pour les organisations" },
          ],
        },
        {
          title: "Modalités",
          links: [
            { label: "Présentiel", href: "/formations?modalite=presentiel" },
            { label: "En ligne", href: "/formations?modalite=en-ligne" },
            { label: "Hybride", href: "/formations?modalite=hybride" },
            { label: "Initiation (débutant)", href: "/formations?niveau=debutant" },
          ],
        },
      ],
      showSessions: true,
    },
  },
  {
    label: "Organisations",
    href: "/organisations",
    mega: {
      intro: {
        title: "Former et accompagner les organisations",
        text: "Sensibilisation, formation des équipes, conseil et projets pilotes — à partir de vos besoins réels.",
        cta: { label: "Parlons de votre projet", href: "/projet" },
      },
      groups: [
        {
          title: "Vous êtes",
          links: [
            { label: "Entreprise ou PME", href: "/organisations/entreprises-pme" },
            { label: "Institution ou administration", href: "/organisations/institutions-publiques" },
            { label: "ONG ou organisme de développement", href: "/organisations/ong-developpement" },
            { label: "Université ou école", href: "/organisations/universites-ecoles" },
          ],
        },
        {
          title: "Nos offres",
          links: [
            { label: "Formation des équipes et dirigeants", href: "/organisations/formation-equipes-dirigeants" },
            { label: "Sensibilisation à la blockchain", href: "/organisations/sensibilisation-blockchain" },
            { label: "Conseil stratégique", href: "/organisations/conseil-strategique" },
            { label: "Cadrage de cas d'usage", href: "/organisations/cas-usage" },
            { label: "Faisabilité & projets pilotes", href: "/organisations/faisabilite-projets-pilotes" },
            { label: "Ateliers & bootcamps", href: "/organisations/programmes-sur-mesure" },
          ],
        },
      ],
    },
  },
  {
    label: "Événements",
    href: "/evenements",
    mega: {
      intro: {
        title: "Là où l'écosystème se rencontre",
        text: "Hackathons, conférences et ateliers organisés par l'académie, et nos interventions chez d'autres acteurs.",
        cta: { label: "Voir l'agenda", href: "/evenements#agenda" },
      },
      groups: [
        {
          title: "Notre rôle",
          links: [
            { label: "Événements organisés", href: "/evenements?role=organisation", description: "Conçus et portés par l'académie" },
            { label: "Participations externes", href: "/evenements?role=participation", description: "Interventions et présences" },
          ],
        },
        {
          title: "Formats",
          links: [
            { label: "Conférences & interventions", href: "/evenements?type=conference" },
            { label: "Ateliers", href: "/evenements?type=atelier" },
            { label: "Hackathons", href: "/evenements?type=hackathon" },
            { label: "Rencontres communautaires", href: "/evenements?type=rencontre" },
            { label: "Galeries photos & vidéos", href: "/evenements#galeries" },
          ],
        },
      ],
    },
  },
  {
    label: "Partenaires",
    href: "/partenaires",
    mega: {
      intro: {
        title: "Construire ensemble",
        text: "Établissements, communautés, médias et acteurs technologiques qui partagent notre mission.",
        cta: { label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" },
      },
      groups: [
        {
          title: "Types de partenariats",
          links: [
            { label: "Académiques & éducatifs", href: "/partenaires#academique" },
            { label: "Communautaires", href: "/partenaires#communautaire" },
            { label: "Médias", href: "/partenaires#mediatique" },
            { label: "Technologiques", href: "/partenaires#technologique" },
            { label: "Stratégiques", href: "/partenaires#strategique" },
            { label: "Écosystème blockchain", href: "/partenaires#ecosysteme" },
          ],
        },
      ],
    },
  },
  {
    label: "Ressources",
    href: "/ressources",
    mega: {
      intro: {
        title: "Comprendre, en profondeur",
        text: "Guides, publications et retours d'expérience pour apprendre et décider avec justesse.",
        cta: { label: "Toutes les ressources", href: "/ressources" },
      },
      groups: [
        {
          title: "Catégories",
          links: [
            { label: "Articles & actualités", href: "/ressources?categorie=article" },
            { label: "Guides", href: "/ressources?categorie=guide" },
            { label: "Études de cas", href: "/ressources?categorie=etude-de-cas" },
            { label: "Rapports & publications", href: "/ressources?categorie=publication" },
            { label: "Retours d'expérience", href: "/ressources?categorie=retour-experience" },
            { label: "Questions fréquentes", href: "/ressources/faq" },
          ],
        },
      ],
    },
  },
  { label: "À propos", href: "/a-propos" },
];

export const FOOTER_LINKS: NavGroup[] = [
  {
    title: "Apprendre",
    links: [
      { label: "Catalogue des formations", href: "/formations" },
      { label: "Rejoindre la communauté", href: "/communaute" },
      { label: "Événements", href: "/evenements" },
      { label: "Questions fréquentes", href: "/ressources/faq" },
    ],
  },
  {
    title: "Organisations",
    links: [
      { label: "Nos solutions", href: "/organisations" },
      { label: "Parlons de votre projet", href: "/projet" },
      { label: "Devenir partenaire", href: "/partenaires/devenir-partenaire" },
    ],
  },
  {
    title: "Académie",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Ressources", href: "/ressources" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
