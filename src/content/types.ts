// Content models. Every editable piece of the site lives in src/content/*.ts
// and follows one of these shapes — see README « Modifier les contenus ».

export type Modality = "presentiel" | "en-ligne" | "hybride";
export type Level = "debutant" | "intermediaire" | "avance";
export type Audience = "etudiants" | "developpeurs" | "professionnels" | "organisations";
export type Domain = "fondamentaux" | "developpement" | "produit-projet" | "marketing-communaute" | "sur-mesure";
export type DurationBucket = "court" | "long" | "variable";

/** confirme = programme documenté ; en-preparation = contenu provisoire ; sur-demande = construit avec le client */
export type TrainingStatus = "confirme" | "en-preparation" | "sur-demande";

export interface Session {
  start: string; // ISO date
  end?: string;
  city?: string;
  modality: Modality;
  registrationUrl?: string;
}

export interface Training {
  slug: string;
  title: string;
  shortTitle?: string;
  domain: Domain;
  level: Level;
  audiences: Audience[];
  status: TrainingStatus;
  summary: string;
  duration?: string;
  durationBucket: DurationBucket;
  /** empty = modalité à confirmer */
  modalities: Modality[];
  price?: string;
  objectives: string[];
  audience: string[];
  prerequisites: string[];
  skills: string[];
  program: { title: string; items?: string[]; deliverable?: string }[];
  registration: string[];
  sessions: Session[];
  method?: string;
  featured?: boolean;
}

export interface Solution {
  slug: string;
  kind: "segment" | "service";
  title: string;
  tagline: string;
  problem: string;
  need: string;
  solution: string;
  steps: string[];
  deliverables: string[];
  modalities: string[];
  /** for segments: recommended services */
  services?: string[];
}

export type EventType = "conference" | "atelier" | "hackathon" | "rencontre" | "formation";
export type EventRole = "organisateur" | "co-organisateur" | "intervenant" | "participant" | "partenaire";

export interface EventMedia {
  type: "photo" | "video";
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AcademyEvent {
  slug: string;
  title: string;
  type: EventType;
  role: EventRole;
  start?: string; // ISO date, omitted when not confirmed
  end?: string;
  dateLabel?: string; // shown when start is unknown
  city?: string;
  country: string;
  themes: string[];
  summary: string;
  description: string[];
  organizers: string[];
  /** only partners who authorised being displayed */
  partners: string[];
  media: EventMedia[];
  /** what still needs to be documented — rendered as a visible notice */
  pending?: string;
  relatedResources?: string[];
}

export type PartnerCategory =
  | "academique"
  | "educatif"
  | "communautaire"
  | "mediatique"
  | "technologique"
  | "strategique"
  | "ecosysteme";

export interface Partner {
  name: string;
  category: PartnerCategory;
  description: string;
  url?: string;
  logo?: string;
  /** a logo is rendered only when its use was explicitly authorised */
  logoAuthorized: boolean;
}

export type ResourceCategory = "article" | "guide" | "etude-de-cas" | "publication" | "retour-experience";

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Resource {
  slug: string;
  title: string;
  category: ResourceCategory;
  date: string; // ISO
  summary: string;
  tags: string[];
  body: Block[];
  related: string[];
}

export interface CommunityChannel {
  id: string;
  label: string;
  description: string;
  /** official invitation link supplied by the academy — never guessed */
  url: string;
  primary?: boolean;
}

/** publie = visible sur le site ; masque = conservé mais non affiché ; archive = ancien membre */
export type TeamStatus = "publie" | "masque" | "archive";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: TeamStatus;
  photo?: string;
  linkedin?: string;
  /** shown in the card popup; paragraphs separated by a blank line */
  bio?: string;
  /** unpublished edits saved from the admin — never rendered */
  draft?: unknown;
}

/** participant = organisation membre active ; en-preparation = adhésion en cours */
export type CampusStatus = "participant" | "en-preparation";

export interface CampusCountry {
  /** ISO 3166-1 alpha-2, also names the flag in public/flags/ */
  code: string;
  /** ISO 3166-1 numeric, matches the map shapes (src/content/geo/africa.ts) */
  iso: string;
  name: string;
  /** used on the map when the full name is long */
  shortName?: string;
  /** representative point of the country, in degrees */
  marker: { lat: number; lon: number };
  /** side of the marker where the map label sits */
  label?: "top" | "right" | "bottom" | "left";
  status: CampusStatus;
  /** total participants in the country, shown on the map */
  participants: number;
  /** member organisations, campuses or institutions — only once confirmed */
  campuses: { name: string; city?: string; url?: string }[];
  activities: string[];
}

export interface CampusEdition {
  slug?: string;
  title: string;
  dateLabel: string;
  countries: string[];
  summary?: string;
}

export interface CampusProgram {
  name: string;
  summary: string;
  vision: string[];
  objectives: { title: string; text: string }[];
  countries: CampusCountry[];
  editions: CampusEdition[];
}
