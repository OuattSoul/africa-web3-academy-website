import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { SOLUTIONS, SERVICES, getSolution } from "@/content/solutions";
import styles from "../orgs.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => SOLUTIONS.map((s) => ({ slug: s.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return { title: s.title, description: s.tagline, alternates: { canonical: `/organisations/${s.slug}` } };
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const linked = (s.services ?? SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => x.slug))
    .map(getSolution)
    .filter((x) => x !== undefined);

  const rows: { k: string; body: React.ReactNode }[] = [
    { k: "Problème rencontré", body: <p>{s.problem}</p> },
    { k: "Votre besoin", body: <p>{s.need}</p> },
    { k: "Notre solution", body: <p>{s.solution}</p> },
    { k: "Déroulement", body: <ol>{s.steps.map((x) => <li key={x}>{x}</li>)}</ol> },
    { k: "Livrables possibles", body: <ul>{s.deliverables.map((x) => <li key={x}>{x}</li>)}</ul> },
    { k: "Modalités", body: <ul className={styles.pills}>{s.modalities.map((x) => <li key={x}>{x}</li>)}</ul> },
    {
      k: "Échangeons",
      body: (
        <div className={styles.cta}>
          <p>Chaque intervention est construite à partir de votre contexte. Décrivez votre besoin : nous revenons vers vous avec une proposition.</p>
          <Link href="/projet" className="btn">Demander un devis ou un échange <Icon name="arrow" /></Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHero
        tone="navy"
        eyebrow={s.kind === "segment" ? "Solutions par organisation" : "Offre"}
        title={s.title}
        lead={s.tagline}
        crumbs={[{ label: "Organisations", href: "/organisations" }, { label: s.title }]}
      >
        <Link href="/projet" className="btn btn--light">Parlons de votre projet <Icon name="arrow" /></Link>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className={styles.story}>
            {rows.map((r, i) => (
              <div key={r.k} className={styles.row} data-reveal>
                <p className={styles.rowK}><span>{String(i + 1).padStart(2, "0")}</span>{r.k}</p>
                <div className={styles.rowBody}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {linked.length > 0 && (
        <section className="section section--alt" aria-labelledby="linked-title">
          <div className="container">
            <h2 id="linked-title" style={{ marginBottom: "var(--s-6)" }}>{s.kind === "segment" ? "Offres recommandées" : "Autres offres"}</h2>
            <ul role="list" className={styles.related}>
              {linked.map((x) => <li key={x.slug}><Link href={`/organisations/${x.slug}`}>{x.title}<Icon name="arrow" /></Link></li>)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
