import type { Metadata } from "next";
import seo from "../../content/seo.json";

// Static page titles and descriptions, editable from the admin (content/seo.json).
const SEO = seo as Record<string, { title: string; description: string }>;

export function pageMeta(path: string): Metadata {
  const s = SEO[path];
  if (!s) throw new Error(`content/seo.json: missing entry for ${path}`);
  return { title: path === "/" ? { absolute: s.title } : s.title, description: s.description, alternates: { canonical: path } };
}
