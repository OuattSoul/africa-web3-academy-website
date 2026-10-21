import type { CommunityChannel } from "./types";
import channels from "../../content/community.json";

// OFFICIAL COMMUNITY CHANNELS — single place to configure.
// No channel is assumed: add only invitation links supplied by the academy, e.g.
//   { id: "whatsapp", label: "Groupe WhatsApp", description: "Annonces et échanges", url: "https://chat.whatsapp.com/…", primary: true },
// While this list is empty, the site shows an explicit « canaux en cours d'ouverture » state
// and the main button leads to the sign-up form.
export const COMMUNITY_CHANNELS = channels as CommunityChannel[];

export const primaryChannel = () => COMMUNITY_CHANNELS.find((c) => c.primary) ?? COMMUNITY_CHANNELS[0];

/** where every « Rejoindre la communauté » button points */
export const communityHref = () => primaryChannel()?.url ?? "/communaute#inscription";

export const COMMUNITY_RULES = [
  "Respecter chaque membre, quel que soit son niveau : toutes les questions sont légitimes.",
  "Partager des informations vérifiées et citer ses sources.",
  "Aucune sollicitation financière, promotion de jetons ou conseil en investissement.",
  "Pas de spam, de démarchage ni de messages privés non sollicités.",
  "Protéger ses données et celles des autres : ne jamais partager de clé privée ou de phrase de récupération.",
  "Signaler tout comportement inapproprié à l'équipe de modération.",
];
