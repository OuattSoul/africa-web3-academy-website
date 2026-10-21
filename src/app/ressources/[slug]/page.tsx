import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ResourceCard } from "@/components/Cards";
import { RESOURCES, getResource } from "@/content/resources";
import { LABELS, formatDate } from "@/content/site";
import styles from "../../pages.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => RESOURCES.map((r) => ({ slug: r.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getResource((await params).slug);
  if (!r) return {};
  return { title: r.title, description: r.summary, alternates: { canonical: `/ressources/${r.slug}` }, openGraph: { type: "article" } };
}

export default async function ResourcePage({ params }: Props) {
  const r = getResource((await params).slug);
  if (!r) notFound();
  const related = r.related.map(getResource).filter((x) => x !== undefined);

  return (
    <>
      <PageHero
        eyebrow={LABELS.resourceCategory[r.category]}
        title={r.title}
        lead={r.summary}
        crumbs={[{ label: "Ressources", href: "/ressources" }, { label: r.title }]}
      />
      <section className="section">
        <article className={`container ${styles.article}`}>
          <p className="small muted">Publié en <time dateTime={r.date}>{formatDate(r.date, { month: "long", year: "numeric" })}</time> · {r.tags.join(", ")}</p>
          {r.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "p") return <p key={i}>{b.text}</p>;
            const L = b.type;
            return <L key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</L>;
          })}
        </article>
      </section>
      {related.length > 0 && (
        <section className="section section--alt" aria-labelledby="rel-title">
          <div className="container">
            <h2 id="rel-title" style={{ marginBottom: "var(--s-6)" }}>Ressources liées</h2>
            <ul role="list" className={styles.resGrid}>{related.map((x) => <li key={x.slug} style={{ display: "grid" }}><ResourceCard r={x} /></li>)}</ul>
          </div>
        </section>
      )}
    </>
  );
}
