import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { EVENTS } from "@/content/events";
import { formatRange } from "@/content/site";
import { EventsList } from "./EventsList";

export const metadata = pageMeta("/evenements");

export default function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const agenda = EVENTS.filter((e) => !e.start || (e.end ?? e.start) >= today);
  const withMedia = EVENTS.filter((e) => e.media.length);

  return (
    <>
      <PageHero
        eyebrow="Événements"
        title="Apprendre ensemble, sur le terrain."
        lead="Chaque fiche indique le rôle exact de l'académie : événement organisé par Africa Web3 Academy, ou participation chez un autre organisateur."
        crumbs={[{ label: "Événements" }]}
      >
        <Link href="/contact?sujet=evenement" className="btn btn--light">Inviter l&apos;académie à un événement <Icon name="arrow" /></Link>
      </PageHero>

      <section id="agenda" className="section section--alt" aria-labelledby="agenda-title">
        <div className="container">
          <p className="eyebrow">Agenda</p>
          <h2 id="agenda-title" style={{ marginBlock: "var(--s-3) var(--s-6)" }}>Prochains rendez-vous</h2>
          {agenda.length ? (
            <ul role="list" style={{ display: "grid", gap: "var(--s-3)" }}>
              {agenda.map((e) => (
                <li key={e.slug}>
                  <Link href={`/evenements/${e.slug}`} className="text-link">{e.title}</Link>
                  <span className="muted small"> — {formatRange(e.start, e.end, e.dateLabel)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Aucun événement à venir n&apos;est encore annoncé. <Link href="/communaute#inscription" className="link">Inscrivez-vous pour être prévenu.</Link></p>
          )}
        </div>
      </section>

      <section className="section" aria-label="Tous les événements">
        <div className="container">
          <Suspense fallback={<p className="muted">Chargement…</p>}>
            <EventsList />
          </Suspense>
        </div>
      </section>

      <section id="galeries" className="section section--alt" aria-labelledby="gal-title">
        <div className="container">
          <p className="eyebrow">Galeries</p>
          <h2 id="gal-title" style={{ marginBlock: "var(--s-3) var(--s-6)" }}>Photos et vidéos</h2>
          {withMedia.length ? (
            <ul role="list" style={{ display: "grid", gap: "var(--s-3)" }}>
              {withMedia.map((e) => <li key={e.slug}><Link href={`/evenements/${e.slug}#medias`} className="text-link">{e.title} — {e.media.length} médias</Link></li>)}
            </ul>
          ) : (
            <p className="notice"><Icon name="info" /><span><strong>Les galeries seront publiées prochainement.</strong> Seuls des photos et vidéos authentiques, dont la diffusion est autorisée, y seront présentées.</span></p>
          )}
        </div>
      </section>
    </>
  );
}
