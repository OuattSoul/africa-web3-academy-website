import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { TRAININGS } from "@/content/trainings";
import { SOLUTIONS } from "@/content/solutions";
import { EVENTS } from "@/content/events";
import { RESOURCES } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/formations", "/organisations", "/projet", "/evenements", "/partenaires", "/partenaires/devenir-partenaire",
    "/ressources", "/ressources/faq", "/a-propos", "/contact", "/communaute", "/confidentialite", "/mentions-legales",
    ...TRAININGS.map((t) => `/formations/${t.slug}`),
    ...SOLUTIONS.map((s) => `/organisations/${s.slug}`),
    ...EVENTS.map((e) => `/evenements/${e.slug}`),
    ...RESOURCES.map((r) => `/ressources/${r.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}
