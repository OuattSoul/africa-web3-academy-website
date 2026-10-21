import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icon";
import { StatusBadge, TrainingCard, modalityText } from "@/components/Cards";
import { TRAININGS, getTraining } from "@/content/trainings";
import { LABELS, SITE, formatRange } from "@/content/site";
import styles from "../formations.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => TRAININGS.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTraining((await params).slug);
  if (!t) return {};
  return { title: t.title, description: t.summary, alternates: { canonical: `/formations/${t.slug}` } };
}

export default async function TrainingPage({ params }: Props) {
  const t = getTraining((await params).slug);
  if (!t) notFound();
  const draft = t.status === "en-preparation";
  const custom = t.status === "sur-demande";
  const related = TRAININGS.filter((x) => x.slug !== t.slug && (x.domain === t.domain || x.featured)).slice(0, 3);

  const jsonLd = t.status === "confirme" && {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.title,
    description: t.summary,
    inLanguage: "fr",
    provider: { "@type": "EducationalOrganization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHero
        eyebrow={LABELS.domain[t.domain]}
        title={t.title}
        lead={t.summary}
        crumbs={[{ label: "Formations", href: "/formations" }, { label: t.shortTitle ?? t.title }]}
        aside={
          <dl className={styles.facts}>
            <div><dt>Statut</dt><dd>{LABELS.trainingStatus[t.status]}</dd></div>
            <div><dt>Niveau</dt><dd>{LABELS.level[t.level]}</dd></div>
            <div><dt>Durée</dt><dd>{t.duration ?? "À confirmer"}</dd></div>
            <div><dt>Modalité</dt><dd>{modalityText(t)}</dd></div>
            {t.price && <div><dt>Frais</dt><dd>{t.price}</dd></div>}
            <div><dt>Public</dt><dd>{t.audiences.map((a) => LABELS.audience[a]).join(", ")}</dd></div>
          </dl>
        }
      >
        <a href="#demande" className="btn btn--light">{custom ? "Décrire mon besoin" : draft ? "Être informé de l'ouverture" : "Demander des informations"} <Icon name="arrow" /></a>
      </PageHero>

      <section className="section">
        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            {draft && (
              <p className="notice"><Icon name="info" /><span><strong>Programme en préparation.</strong> Les objectifs ci-dessous sont provisoires ; le programme détaillé, la durée, la modalité et le calendrier seront publiés lors de l&apos;ouverture.</span></p>
            )}
            {t.method && <blockquote className={styles.method}>{t.method}</blockquote>}

            <div className={styles.block}>
              <h2>Objectifs pédagogiques</h2>
              <ul className={styles.list}>{t.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
            </div>

            <div className={styles.cols}>
              <div><h3>Pour qui ?</h3><ul className={styles.list}>{t.audience.map((o) => <li key={o}>{o}</li>)}</ul></div>
              <div><h3>Prérequis</h3>{t.prerequisites.length ? <ul className={styles.list}>{t.prerequisites.map((o) => <li key={o}>{o}</li>)}</ul> : <p className="muted small">À préciser.</p>}</div>
            </div>

            {t.skills.length > 0 && (
              <div className={styles.block}>
                <h2>Compétences acquises</h2>
                <ul role="list" className={styles.skills}>{t.skills.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            )}

            <div className={styles.block}>
              <h2>Programme</h2>
              {t.program.length ? (
                <ol role="list" className={styles.program}>
                  {t.program.map((m) => (
                    <li key={m.title}>
                      <h3>{m.title}</h3>
                      {m.items && <ul role="list">{m.items.map((i) => <li key={i}>{i}</li>)}</ul>}
                      {m.deliverable && <p className={styles.deliverable}><b>Livrable :</b> {m.deliverable}</p>}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="muted">Le programme détaillé est en cours de finalisation.</p>
              )}
            </div>

            <div className={styles.block}>
              <h2>Inscription</h2>
              <ol className={styles.list}>{t.registration.map((r) => <li key={r}>{r}</li>)}</ol>
            </div>

            <div id="demande" className={styles.block}>
              <h2>{custom ? "Décrire votre besoin" : draft ? "Être informé de l'ouverture" : "Demander des informations"}</h2>
              {custom ? (
                <p>Le formulaire dédié aux organisations recueille les éléments utiles au cadrage. <Link href="/projet" className="link">Accéder au formulaire « Parlons de votre projet »</Link>.</p>
              ) : (
                <Form formId="contact" defaults={{ sujet: "formation", formation: t.slug, message: `Je souhaite recevoir des informations sur la formation « ${t.title} ».` }} />
              )}
            </div>
          </div>

          <aside className={styles.aside} aria-label="Calendrier">
            <div className={styles.sticky}>
              <StatusBadge status={t.status} />
              <h2>Prochaines sessions</h2>
              {t.sessions.length ? (
                <ul role="list" className={styles.sessions}>
                  {t.sessions.map((s) => (
                    <li key={s.start}>
                      <b>{formatRange(s.start, s.end)}</b><br />{LABELS.modality[s.modality]}{s.city && ` · ${s.city}`}
                      {s.registrationUrl && <><br /><a href={s.registrationUrl} className="link">S&apos;inscrire</a></>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted small">{custom ? "Le calendrier est défini avec votre organisation." : "Aucune date n'est publiée pour le moment. Laissez-nous vos coordonnées pour être prévenu en priorité."}</p>
              )}
              <a href="#demande" className="btn btn--sm">{custom ? "Décrire mon besoin" : "Être recontacté"}</a>
              <Link href="/communaute" className="text-link small">Suivre les annonces <Icon name="arrow" /></Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt" aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" style={{ marginBottom: "var(--s-6)" }}>Autres formations</h2>
            <ul role="list" style={{ display: "grid", gap: "var(--s-2) var(--s-7)", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))" }}>
              {related.map((r) => <li key={r.slug}><TrainingCard t={r} /></li>)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
