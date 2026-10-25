import type { Resource } from "./types";
import { live } from "./archive";
import resources from "../../content/resources.json";
import faq from "../../content/faq.json";

// Editorial content. Body is a list of simple blocks (h2, p, ul, ol).
export const RESOURCES = live(resources as Resource[]);

export const getResource = (slug: string) => RESOURCES.find((r) => r.slug === slug);

export const FAQ = live(faq as { q: string; a: string }[]);
