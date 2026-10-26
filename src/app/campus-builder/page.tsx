import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { CAMPUS, CAMPUS_STATUS_LABEL } from "@/content/campusBuilder";
import { CampusMap } from "./CampusMap";
import pages from "../pages.module.css";
import styles from "./campus.module.css";

export const metadata = pageMeta("/campus-builder");

const nameOf = (code: string) => CAMPUS.countries.find((c) => c.code === code)?.name ?? code;

export default function CampusBuilderPage() {
  const { countries, editions } = CAMPUS;
  return (
    <>
      <PageHero
        tone="navy"
        eyebrow="Programme panafricain"
        title={CAMPUS.name}
        lead={CAMPUS.summary}
        crumbs={[{ label: "Événements", href: "/evenements" }, { label: "Campus Builder" }]}
        aside={
          <dl className={styles.figures}>
            <div><dt>Pays</dt><dd>{countries.length}</dd></div>
            <div><dt>Participants</dt><dd>{countries.reduce((n, c) => n + c.participants, 0)}</dd></div>
          </dl>
        }
      >
        <a href="#reseau" className="btn btn--light">Explorer le réseau <Icon name="arrow" /></a>
        <Link href="/partenaires/devenir-partenaire" className="btn btn--ghost-light">Rejoindre le programme</Link>
      </PageHero>

      <section className="section section--dark" id="reseau" aria-labelledby="reseau-title">
        <div className="container">
          <header className={styles.mapHead}>
            <p className="eyebrow">Le réseau</p>
            <h2 id="reseau-title">{countries.length} pays, un même chantier.</h2>
            <p className="lead">Chaque point vert est un pays dont une organisation porte le programme auprès de ses étudiants.</p>
          </header>
          <CampusMap countries={countries} />
        </div>
      </section>

      <section className="section" aria-labelledby="vision-title">
        <div className={`container ${pages.twoCol}`}>
          <header>
            <p className="eyebrow">Vision & objectifs</p>
            <h2 id="vision-title">Des talents employables, des projets utiles.</h2>
          </header>
          <div className={styles.vision}>
            {CAMPUS.vision.map((p, i) => <p key={i} className={i ? "muted" : undefined}>{p}</p>)}
            <ul role="list" className={pages.tiles}>
              {CAMPUS.objectives.map((o) => <li key={o.title} className={pages.tile}><h3>{o.title}</h3><p className="muted small">{o.text}</p></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="pays" aria-labelledby="pays-title">
        <div className={`container ${pages.twoCol}`}>
          <header>
            <p className="eyebrow">Pays participants</p>
            <h2 id="pays-title">Campus et activités, pays par pays.</h2>
            <p className="muted" style={{ marginTop: "var(--s-4)" }}>Les établissements sont présentés dès que leur participation est confirmée.</p>
          </header>
          <ul role="list" className={pages.ruled}>
            {countries.map((c) => (
              <li key={c.code} id={`pays-${c.code.toLowerCase()}`}>
                <div className={styles.countryHead}>
                  <h3>{c.name}</h3>
                  <span className={c.status === "participant" ? "badge badge--confirmed" : "badge badge--draft"}>{CAMPUS_STATUS_LABEL[c.status]}</span>
                </div>
                <dl className={styles.facts}>
                  <div>
                    <dt>Campus & établissements</dt>
                    <dd>{c.campuses.length ? (
                      <ul role="list">{c.campuses.map((s) => <li key={s.name}>{s.url ? <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">{s.name}</a> : s.name}{s.city && <span className="muted"> — {s.city}</span>}</li>)}</ul>
                    ) : <span className="muted">Annoncés prochainement</span>}</dd>
                  </div>
                  <div>
                    <dt>Activités locales</dt>
                    <dd>{c.activities.length ? <ul role="list">{c.activities.map((a) => <li key={a}>{a}</li>)}</ul> : <span className="muted">Programme local en préparation</span>}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="editions" aria-labelledby="editions-title">
        <div className={`container ${pages.twoCol}`}>
          <header>
            <p className="eyebrow">Éditions</p>
            <h2 id="editions-title">Le programme, édition après édition.</h2>
          </header>
          {editions.length ? (
            <ul role="list" className={pages.ruled}>
              {editions.map((e) => (
                <li key={e.title}>
                  <h3>{e.slug ? <Link href={`/evenements/${e.slug}`}>{e.title}</Link> : e.title}</h3>
                  <div>
                    <p className="small"><b>{e.dateLabel}</b> · {e.countries.map(nameOf).join(", ")}</p>
                    {e.summary && <p className="muted">{e.summary}</p>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="notice"><Icon name="info" /><span><strong>Première édition en préparation.</strong> Le calendrier, les campus hôtes et les activités seront publiés ici dès leur confirmation.</span></p>
          )}
        </div>
      </section>

      <section className="section section--brand" aria-labelledby="join-title">
        <div className={`container ${styles.join}`}>
          <div>
            <p className="eyebrow">Rejoindre le réseau</p>
            <h2 id="join-title" style={{ color: "var(--white)" }}>Votre organisation veut porter Campus Builder dans son pays ?</h2>
          </div>
          <div className={styles.joinActions}>
            <Link href="/partenaires/devenir-partenaire" className="btn btn--light">Devenir partenaire <Icon name="arrow" /></Link>
            <Link href="/contact" className="btn btn--ghost-light">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  );
}
