import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { SEGMENTS, SERVICES } from "@/content/solutions";
import styles from "./orgs.module.css";

export const metadata = pageMeta("/organisations");

const PROCESS = [
  { t: "Premier échange", d: "Vous décrivez votre contexte ; nous clarifions ensemble le besoin réel." },
  { t: "Proposition", d: "Un format, un public, un calendrier et des livrables clairement définis." },
  { t: "Intervention", d: "Formation, ateliers ou accompagnement, sur site, en ligne ou en hybride." },
  { t: "Bilan", d: "Restitution, recommandations et suites possibles." },
];

export default function OrganisationsPage() {
  return (
    <>
      <PageHero
        tone="navy"
        eyebrow="Organisations"
        title="La blockchain au service de vos objectifs, pas l'inverse."
        lead="Entreprises, administrations, ONG, universités : nous formons vos équipes, éclairons vos décisions et accompagnons vos premiers projets."
        crumbs={[{ label: "Organisations" }]}
      >
        <Link href="/projet" className="btn btn--light">Parlons de votre projet <Icon name="arrow" /></Link>
        <a href="#offres" className="btn btn--ghost-light">Voir les offres</a>
      </PageHero>

      <section className="section" aria-labelledby="seg-title">
        <div className="container">
          <p className="eyebrow">Vous êtes</p>
          <h2 id="seg-title" style={{ marginBlock: "var(--s-3) var(--s-7)", maxWidth: "22ch" }}>Une réponse adaptée à chaque type d&apos;organisation.</h2>
          <ul role="list" className={styles.segments}>
            {SEGMENTS.map((s, i) => (
              <li key={s.slug} style={{ display: "flex" }}>
                <Link href={`/organisations/${s.slug}`} className={styles.segment} style={{ flex: 1 }}>
                  <span className={styles.segN}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p className="muted small">{s.tagline}</p>
                  <Icon name="arrow" size={24} className={styles.arrow} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="offres" className="section section--alt" aria-labelledby="off-title">
        <div className="container">
          <p className="eyebrow">Nos offres</p>
          <h2 id="off-title" style={{ marginBlock: "var(--s-3) var(--s-7)", maxWidth: "22ch" }}>De la première sensibilisation au projet pilote.</h2>
          <ul role="list" className={styles.services}>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/organisations/${s.slug}`} className={styles.service}>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.tagline}</p>
                  <span className="text-link" aria-hidden="true">Détails <Icon name="arrow" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="proc-title">
        <div className="container">
          <p className="eyebrow">Déroulement</p>
          <h2 id="proc-title" style={{ marginBlock: "var(--s-3) var(--s-7)", color: "var(--white)", maxWidth: "20ch" }}>Un accompagnement en quatre temps.</h2>
          <ol role="list" className={styles.process}>
            {PROCESS.map((p) => <li key={p.t}><h3>{p.t}</h3><p className="small" style={{ color: "var(--text-on-dark-muted)" }}>{p.d}</p></li>)}
          </ol>
          <div style={{ marginTop: "var(--s-7)" }}>
            <Link href="/projet" className="btn btn--light">Décrire votre besoin <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
