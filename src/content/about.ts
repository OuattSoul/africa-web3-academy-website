import type { TeamMember } from "./types";

export const TEAM: TeamMember[] = [
  { name: "Souleymane Ouattara", role: "Fondateur" },
  // Add trainers and mentors here once they agree to be listed.
];

// source: « Structures organisationnelles » — current (first-year) structure
export const POLES = [
  { title: "Direction générale", text: "Stratégie, vision et gestion globale de l'académie." },
  { title: "Pédagogie & contenus", text: "Responsable pédagogique, formateurs et mentors, conception des parcours d'apprentissage." },
  { title: "Technique & plateforme", text: "Plateforme d'apprentissage et support technique." },
  { title: "Marketing & communauté", text: "Communication digitale, animation de la communauté, relation avec les apprenants." },
  { title: "Opérations", text: "Inscriptions, suivi administratif et accompagnement des apprenants." },
];
