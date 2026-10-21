import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { ResourceSearch } from "./ResourceSearch";

export const metadata = pageMeta("/ressources");

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ressources"
        title="Comprendre en profondeur, décider avec justesse."
        lead="Guides pratiques, documents officiels de nos programmes, études de cas et retours d'expérience."
        crumbs={[{ label: "Ressources" }]}
      >
        <Link href="/ressources/faq" className="btn btn--ghost-light">Questions fréquentes <Icon name="arrow" /></Link>
      </PageHero>
      <section className="section">
        <div className="container">
          <Suspense fallback={<p className="muted">Chargement…</p>}>
            <ResourceSearch />
          </Suspense>
        </div>
      </section>
    </>
  );
}
