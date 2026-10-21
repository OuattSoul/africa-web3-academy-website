import type { Training } from "./types";
import trainings from "../../content/trainings.json";

// Status rules:
//  - "confirme": programme documented by the academy (source noted per entry).
//  - "en-preparation": PROVISIONAL content, rendered with a visible notice. Replace before announcing.
//  - "sur-demande": built with the client, routes to the project form.
// Sessions: add only dates confirmed by the academy.

export const TRAININGS = trainings as Training[];

export const getTraining = (slug: string) => TRAININGS.find((t) => t.slug === slug);

export function upcomingSessions(now = new Date()) {
  return TRAININGS.flatMap((t) => t.sessions.map((s) => ({ ...s, training: t })))
    .filter((s) => new Date(s.end ?? s.start) >= now)
    .sort((a, b) => a.start.localeCompare(b.start));
}
