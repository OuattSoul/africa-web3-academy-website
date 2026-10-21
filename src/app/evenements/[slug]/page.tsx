import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icon";
import { RoleBadge } from "@/components/Cards";
import { EVENTS, getEvent } from "@/content/events";
import { getResource } from "@/content/resources";
import { LABELS, SITE, formatRange, isOrganised } from "@/content/site";
import styles from "../../formations/formations.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => EVENTS.map((e) => ({ slug: e.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEvent((await params).slug);
  if (!e) return {};
  return { title: e.title, description: e.summary, alternates: { canonical: `/evenements/${e.slug}` } };
}

export default async function EventPage({ params }: Props) {
  const e = getEvent((await params).slug);
  if (!e) notFound();
  const docs = (e.relatedResources ?? []).map(getResource).filter((r) => r !== undefined);

  // Event schema only when date and place are confirmed and the academy organised it.
  const jsonLd = e.start && e.city && isOrganised(e.role) && {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.start,
    endDate: e.end ?? e.start,
    description: e.summary,
    location: { "@type": "Place", name: e.city, address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.country } },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHero
        eyebrow={LABELS.eventType[e.type]}
        title={e.title}
        lead={e.summary}
        crumbs={[{ label: "Événements", href: "/evenements" }, { label: e.title }]}
        aside={
          <dl className={styles.facts}>
            <div><dt>Date</dt><dd>{formatRange(e.start, e.end, e.dateLabel)}</dd></div>
            <div><dt>Lieu</dt><dd>{e.city ? `${e.city}, ${e.country}` : `${e.country} — à confirmer`}</dd></div>
            <div style={{ gridColumn: "1 / -1" }}><dt>Rôle de l&apos;académie</dt><dd>{LABELS.eventRole[e.role]}</dd></div>
          </dl>
        }
      />

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            {e.pending && <p className="notice"><Icon name="info" /><span><strong>Fiche en cours de complétion.</strong> {e.pending}</span></p>}
            <div className={styles.block}>
              <h2>Description</h2>
              {e.description.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <div className={styles.block}>
              <h2>Thématiques</h2>
              <ul role="list" className={styles.skills}>{e.themes.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            {docs.length > 0 && (
              <div className={styles.block}>
                <h2>Documents officiels</h2>
                <ul role="list" style={{ display: "grid", gap: "var(--s-3)" }}>
                  {docs.map((d) => <li key={d.slug}><Link href={`/ressources/${d.slug}`} className="text-link">{d.title} <Icon name="arrow" /></Link></li>)}
                </ul>
              </div>
            )}
            <div id="medias" className={styles.block}>
              <h2>Médias</h2>
              {e.media.length ? <Gallery media={e.media} /> : <p className="muted">Aucun média publié pour cet événement.</p>}
            </div>
          </div>
          <aside className={styles.aside} aria-label="Informations">
            <div className={styles.sticky}>
              <RoleBadge role={e.role} />
              <div>
                <h2 style={{ fontSize: "1.125rem", fontFamily: "var(--font-sans)", fontWeight: 700 }}>Organisateurs</h2>
                <p className="small">{e.organizers.join(", ")}</p>
              </div>
              <div>
                <h2 style={{ fontSize: "1.125rem", fontFamily: "var(--font-sans)", fontWeight: 700 }}>Partenaires</h2>
                <p className="small muted">{e.partners.length ? e.partners.join(", ") : "Aucun partenaire affiché : seuls les partenaires ayant autorisé leur mention apparaissent ici."}</p>
              </div>
              <Link href="/communaute#inscription" className="btn btn--sm btn--community">Être informé des prochains événements</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
