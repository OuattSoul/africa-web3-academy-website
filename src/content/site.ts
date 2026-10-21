// Coordinates taken from the academy's official letterhead (2025–2026 documents).
export const SITE = {
  name: "Africa Web3 Academy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://africaweb3.academy",
  description:
    "Africa Web3 Academy forme, sensibilise et accompagne les talents et les organisations d'Afrique francophone pour comprendre et construire des solutions blockchain et Web3 utiles.",
  email: "africaweb3academy@gmail.com",
  phone: "+225 07 48 40 40 24",
  phoneHref: "tel:+2250748404024",
  address: ["Cocody 8e tranche, rue Fred et Popée", "Abidjan, Côte d'Ivoire"],
  /** official social accounts — add only verified URLs */
  socials: [] as { label: string; url: string }[],
};

export const LABELS = {
  modality: { presentiel: "Présentiel", "en-ligne": "En ligne", hybride: "Hybride" },
  level: { debutant: "Débutant", intermediaire: "Intermédiaire", avance: "Avancé" },
  audience: {
    etudiants: "Étudiants",
    developpeurs: "Développeurs",
    professionnels: "Professionnels",
    organisations: "Organisations",
  },
  domain: {
    fondamentaux: "Fondamentaux",
    developpement: "Développement",
    "produit-projet": "Produit & projet",
    "marketing-communaute": "Marketing & communauté",
    "sur-mesure": "Sur mesure",
  },
  duration: { court: "Court (≤ 1 mois)", long: "Long (plusieurs mois)", variable: "Variable" },
  trainingStatus: {
    confirme: "Programme confirmé",
    "en-preparation": "En préparation",
    "sur-demande": "Sur demande",
  },
  eventType: {
    conference: "Conférence & panel",
    atelier: "Atelier",
    hackathon: "Hackathon",
    rencontre: "Rencontre communautaire",
    formation: "Formation publique",
  },
  eventRole: {
    organisateur: "Organisé par Africa Web3 Academy",
    "co-organisateur": "Co-organisé",
    intervenant: "Intervention",
    participant: "Participation",
    partenaire: "Partenaire de l'événement",
  },
  partnerCategory: {
    academique: "Académiques",
    educatif: "Éducatifs",
    communautaire: "Communautaires",
    mediatique: "Médias",
    technologique: "Technologiques",
    strategique: "Stratégiques",
    ecosysteme: "Écosystème blockchain",
  },
  resourceCategory: {
    article: "Articles & actualités",
    guide: "Guides",
    "etude-de-cas": "Études de cas",
    publication: "Rapports & publications",
    "retour-experience": "Retours d'expérience",
  },
} as const;

export const isOrganised = (role: string) => role === "organisateur" || role === "co-organisateur";

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: "UTC" }).format(new Date(iso));
}

export function formatRange(start?: string, end?: string, fallback = "Date à confirmer") {
  if (!start) return fallback;
  if (!end || end === start) return formatDate(start);
  const s = new Date(start), e = new Date(end);
  if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth())
    return `${s.getUTCDate()}–${formatDate(end)}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}
