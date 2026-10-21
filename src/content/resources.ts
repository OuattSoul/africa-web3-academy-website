import type { Resource } from "./types";
import resources from "../../content/resources.json";
import faq from "../../content/faq.json";

// Editorial content. Body is a list of simple blocks (h2, p, ul, ol).
export const RESOURCES = resources as Resource[];

export const getResource = (slug: string) => RESOURCES.find((r) => r.slug === slug);

export const FAQ = faq as { q: string; a: string }[];
