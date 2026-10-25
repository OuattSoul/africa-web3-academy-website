import type { AcademyEvent } from "./types";
import { live } from "./archive";
import events from "../../content/events.json";

// Role must reflect what can be proven: "organisateur" only for events the academy organised.
// Partners: list only those who authorised being displayed.
// Media: put files in /public/media/events/<slug>/ and reference them here.

export const EVENTS = live(events as AcademyEvent[]);

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

/** Events sorted most recent first; undated events (announced) come first. */
export const sortedEvents = () =>
  [...EVENTS].sort((a, b) => (b.start ?? "9999").localeCompare(a.start ?? "9999"));

export const eventYear = (e: AcademyEvent) =>
  e.start ? e.start.slice(0, 4) : e.dateLabel?.match(/\d{4}/)?.[0] ?? "—";
