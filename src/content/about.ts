import type { TeamMember } from "./types";
import { live } from "./archive";
import team from "../../content/team.json";

// Edited from the admin (« Gestion de l'équipe »). List members only once they agree to be listed.
// Only published members reach the page; drafts and hidden/archived entries stay in the file.
export const TEAM = live(team as TeamMember[])
  .filter((m) => m.status === "publie")
  .map(({ id, name, role, photo, linkedin, bio }) => ({ id, name, role, photo, linkedin, bio }));

// source: « Structures organisationnelles » — current (first-year) structure
export const POLES = [
  { title: "Direction générale", text: "Stratégie, vision et gestion globale de l'académie." },
  { title: "Pédagogie & contenus", text: "Responsable pédagogique, formateurs et mentors, conception des parcours d'apprentissage." },
  { title: "Technique & plateforme", text: "Plateforme d'apprentissage et support technique." },
  { title: "Marketing & communauté", text: "Communication digitale, animation de la communauté, relation avec les apprenants." },
  { title: "Opérations", text: "Inscriptions, suivi administratif et accompagnement des apprenants." },
];
