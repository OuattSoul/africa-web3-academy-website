import type { Partner, PartnerCategory } from "./types";
import { live } from "./archive";
import partners from "../../content/partners.json";

// Add a partner only once the partnership is confirmed in writing.
// Set logoAuthorized: true only with explicit permission; put the file in /public/partners/.
// Institutions that were only contacted or invited do not belong here.
export const PARTNERS = live(partners as Partner[]);

export const PARTNER_CATEGORIES: { id: PartnerCategory; text: string }[] = [
  { id: "academique", text: "Universités et grandes écoles qui accueillent clubs, programmes d'initiation et hackathons." },
  { id: "educatif", text: "Organismes éducatifs qui partagent ressources, méthodes et réseaux de formateurs." },
  { id: "communautaire", text: "Communautés tech et associations étudiantes qui co-animent des activités." },
  { id: "mediatique", text: "Médias qui relaient les événements et les contenus pédagogiques." },
  { id: "technologique", text: "Entreprises technologiques qui apportent outils, infrastructures et expertise." },
  { id: "strategique", text: "Institutions et organisations qui soutiennent le développement des compétences." },
  { id: "ecosysteme", text: "Projets et protocoles blockchain engagés pour l'éducation et l'adoption utile." },
];
