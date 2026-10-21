// Form definitions shared by the client (rendering + live validation)
// and the API route (authoritative validation). One source of truth.

export type FieldType = "text" | "email" | "tel" | "url" | "textarea" | "select" | "checkbox" | "hidden";
export interface Option { value: string; label: string }
export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Option[];
  maxLength?: number;
  help?: string;
  autoComplete?: string;
  half?: boolean;
}
export type FormId = "contact" | "projet" | "partenaire" | "communaute";
export interface FormDef { id: FormId; subject: string; submitLabel: string; success: string; fields: FieldDef[] }

const opts = (...labels: [string, string][]): Option[] => labels.map(([value, label]) => ({ value, label }));

const nom: FieldDef = { name: "nom", label: "Nom et prénom", type: "text", required: true, autoComplete: "name", half: true, maxLength: 120 };
const email: FieldDef = { name: "email", label: "Adresse e-mail", type: "email", required: true, autoComplete: "email", half: true, maxLength: 160 };
const tel: FieldDef = { name: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel", half: true, help: "Facultatif — avec l'indicatif, ex. +225…" };
const privacy: FieldDef = {
  name: "confidentialite",
  label: "J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la politique de confidentialité.",
  type: "checkbox",
  required: true,
};

export const CONTACT_SUBJECTS = opts(
  ["information", "Demande d'information générale"],
  ["formation", "Demande de formation"],
  ["accompagnement", "Demande d'accompagnement professionnel"],
  ["partenariat", "Proposition de partenariat"],
  ["evenement", "Demande d'intervention ou de participation à un événement"],
);

export const FORMS: Record<FormId, FormDef> = {
  contact: {
    id: "contact",
    subject: "Contact",
    submitLabel: "Envoyer le message",
    success: "Votre message a bien été transmis à l'équipe. Nous vous répondrons par e-mail.",
    fields: [
      { name: "sujet", label: "Objet de votre demande", type: "select", required: true, options: CONTACT_SUBJECTS },
      // set by training pages; links the request to a training in the admin (« candidatures »)
      { name: "formation", label: "Formation concernée", type: "hidden", maxLength: 120 },
      nom,
      email,
      tel,
      { name: "organisation", label: "Organisation", type: "text", half: true, help: "Facultatif", autoComplete: "organization", maxLength: 160 },
      { name: "message", label: "Votre message", type: "textarea", required: true, maxLength: 4000 },
      privacy,
    ],
  },
  projet: {
    id: "projet",
    subject: "Projet organisation",
    submitLabel: "Envoyer ma demande",
    success: "Merci. Votre demande a été transmise ; l'équipe reviendra vers vous pour un premier échange.",
    fields: [
      {
        name: "typeOrganisation", label: "Type d'organisation", type: "select", required: true, half: true,
        options: opts(["entreprise", "Entreprise / PME"], ["institution", "Institution publique / administration"], ["ong", "ONG / organisme de développement"], ["enseignement", "Université / école"], ["autre", "Autre"]),
      },
      { name: "organisation", label: "Nom de l'organisation", type: "text", required: true, half: true, autoComplete: "organization", maxLength: 160 },
      {
        name: "besoin", label: "Votre besoin principal", type: "select", required: true,
        options: opts(
          ["formation-equipes", "Former des équipes ou des dirigeants"],
          ["sensibilisation", "Sensibiliser à la blockchain"],
          ["conseil", "Conseil et accompagnement stratégique"],
          ["cas-usage", "Identifier et cadrer des cas d'usage"],
          ["pilote", "Étude de faisabilité ou projet pilote"],
          ["programme", "Atelier, bootcamp ou programme sur mesure"],
          ["club", "Club Blockchain & Web3 / hackathon (établissements)"],
          ["autre", "Autre / je ne sais pas encore"],
        ),
      },
      {
        name: "public", label: "Public concerné", type: "select", required: true, half: true,
        options: opts(["dirigeants", "Dirigeants et décideurs"], ["metiers", "Équipes métiers"], ["techniques", "Équipes techniques"], ["etudiants", "Étudiants"], ["beneficiaires", "Bénéficiaires / grand public"], ["mixte", "Public mixte"]),
      },
      {
        name: "participants", label: "Nombre approximatif de participants", type: "select", required: true, half: true,
        options: opts(["1-10", "1 à 10"], ["11-30", "11 à 30"], ["31-100", "31 à 100"], ["100+", "Plus de 100"], ["inconnu", "Pas encore défini"]),
      },
      {
        name: "modalite", label: "Modalité souhaitée", type: "select", required: true, half: true,
        options: opts(["presentiel", "Présentiel"], ["en-ligne", "En ligne"], ["hybride", "Hybride"], ["a-definir", "À définir ensemble"]),
      },
      { name: "periode", label: "Période envisagée", type: "text", required: true, half: true, help: "Ex. : premier trimestre 2027", maxLength: 120 },
      nom,
      { name: "fonction", label: "Fonction", type: "text", half: true, help: "Facultatif", autoComplete: "organization-title", maxLength: 120 },
      email,
      tel,
      { name: "message", label: "Contexte et objectifs", type: "textarea", required: true, maxLength: 4000, help: "Quelques lignes suffisent : situation actuelle, objectifs, contraintes." },
      privacy,
    ],
  },
  partenaire: {
    id: "partenaire",
    subject: "Proposition de partenariat",
    submitLabel: "Proposer un partenariat",
    success: "Merci pour votre proposition. L'équipe l'étudiera et reviendra vers vous.",
    fields: [
      { name: "organisation", label: "Organisation", type: "text", required: true, half: true, autoComplete: "organization", maxLength: 160 },
      {
        name: "typePartenariat", label: "Type de partenariat envisagé", type: "select", required: true, half: true,
        options: opts(["academique", "Académique / éducatif"], ["communautaire", "Communautaire"], ["mediatique", "Médiatique"], ["technologique", "Technologique"], ["strategique", "Stratégique / institutionnel"], ["ecosysteme", "Écosystème blockchain"], ["autre", "Autre"]),
      },
      nom,
      email,
      tel,
      { name: "site", label: "Site web", type: "url", half: true, help: "Facultatif — https://…", maxLength: 200 },
      { name: "message", label: "Votre proposition", type: "textarea", required: true, maxLength: 4000, help: "Objectifs, apports de chaque partie, calendrier envisagé." },
      privacy,
    ],
  },
  communaute: {
    id: "communaute",
    subject: "Inscription communauté",
    submitLabel: "M'inscrire",
    success: "Votre inscription est enregistrée. Vous recevrez les annonces de la communauté par e-mail.",
    fields: [
      { name: "nom", label: "Prénom et nom", type: "text", required: true, autoComplete: "name", half: true, maxLength: 120 },
      email,
      {
        name: "profil", label: "Vous êtes", type: "select", required: true, half: true,
        options: opts(["debutant", "Débutant curieux"], ["etudiant", "Étudiant"], ["developpeur", "Développeur"], ["professionnel", "Professionnel"], ["passionne", "Passionné de Web3"]),
      },
      { name: "ville", label: "Ville et pays", type: "text", half: true, help: "Facultatif", autoComplete: "address-level2", maxLength: 120 },
      {
        name: "interet", label: "Ce qui vous intéresse le plus", type: "select", required: true,
        options: opts(["ateliers", "Ateliers et sessions d'apprentissage"], ["formations", "Annonces de formations"], ["evenements", "Événements et hackathons"], ["opportunites", "Opportunités (projets, stages, missions)"], ["tout", "Un peu de tout"]),
      },
      { name: "communications", label: "J'accepte de recevoir par e-mail les annonces de la communauté (désinscription possible à tout moment).", type: "checkbox", required: true },
      privacy,
    ],
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^\+?[\d\s().-]{6,25}$/;

/** Returns an error message, or null when the value is valid. */
export function validateField(f: FieldDef, raw: unknown): string | null {
  if (f.type === "checkbox") return f.required && raw !== true && raw !== "on" ? "Cette case doit être cochée." : null;
  const v = typeof raw === "string" ? raw.trim() : "";
  if (!v) return f.required ? "Ce champ est obligatoire." : null;
  if (v.length > (f.maxLength ?? (f.type === "textarea" ? 4000 : 200))) return "Ce texte est trop long.";
  if (f.type === "email" && !EMAIL_RE.test(v)) return "Adresse e-mail invalide (ex. nom@domaine.com).";
  if (f.type === "tel" && !TEL_RE.test(v)) return "Numéro de téléphone invalide.";
  if (f.type === "url" && !/^https?:\/\/\S+\.\S+/.test(v)) return "Adresse web invalide (commençant par https://).";
  if (f.type === "select" && !f.options?.some((o) => o.value === v)) return "Veuillez choisir une option.";
  return null;
}

export function validateForm(def: FormDef, data: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  for (const f of def.fields) {
    const e = validateField(f, data[f.name]);
    if (e) errors[f.name] = e;
  }
  return errors;
}
