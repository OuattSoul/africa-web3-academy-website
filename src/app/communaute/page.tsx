import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icon";
import { COMMUNITY_CHANNELS, COMMUNITY_RULES, communityHref } from "@/content/community";
import { EVENTS } from "@/content/events";
import styles from "../pages.module.css";

export const metadata = pageMeta("/communaute");

const BENEFITS = [
  { t: "Apprendre ensemble", d: "Poser ses questions, partager ses ressources, progresser avec d'autres apprenants." },
  { t: "Pratiquer", d: "Ateliers, sessions d'apprentissage, challenges et hackathons." },
  { t: "Être informé en premier", d: "Ouverture des formations, appels à candidatures, événements." },
  { t: "Rencontrer l'écosystème", d: "Mentors, professionnels et porteurs de projets Web3." },
];
const ACTIVITIES = ["Ateliers pratiques", "Sessions d'apprentissage en ligne", "Mini-projets en équipe", "Hackathons", "Rencontres communautaires", "Partage d'opportunités"];

export default function CommunityPage() {
  const href = communityHref();
  const external = href.startsWith("http");
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = EVENTS.filter((e) => !e.start || (e.end ?? e.start) >= today).slice(0, 2);
  return (
    <>
      <PageHero
        tone="community"
        eyebrow="Communauté"
        title="Rejoindre la communauté"
        lead="Un espace pour celles et ceux qui veulent apprendre la blockchain en la pratiquant : étudiants, développeurs, professionnels et curieux de toute l'Afrique francophone."
        crumbs={[{ label: "Rejoindre la communauté" }]}
      >
        <Link href={href} className="btn btn--light" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          Rejoindre la communauté <Icon name={external ? "external" : "arrow"} />
        </Link>
      </PageHero>

      <section className="section" aria-labelledby="mission-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Notre mission</p>
            <h2 id="mission-title">Apprendre, construire, partager.</h2>
          </header>
          <div style={{ display: "grid", gap: "var(--s-6)" }}>
            <p className="lead">La communauté prolonge les formations de l&apos;académie : elle relie les apprenants entre eux et avec l&apos;écosystème, pour que chacun puisse progresser par la pratique et la collaboration.</p>
            <div>
              <h3 style={{ marginBottom: "var(--s-4)" }}>Tous les profils sont les bienvenus</h3>
              <ul role="list" className={styles.profiles}>
                {["Débutants", "Étudiants", "Développeurs", "Professionnels", "Passionnés"].map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="benefits-title">
        <div className="container">
          <h2 id="benefits-title" style={{ marginBottom: "var(--s-6)" }}>Ce que vous y trouverez</h2>
          <ul role="list" className={styles.tiles}>
            {BENEFITS.map((b) => <li key={b.t} className={styles.tile}><h3>{b.t}</h3><p className="muted small">{b.d}</p></li>)}
          </ul>
          <h3 style={{ marginBlock: "var(--s-7) var(--s-4)" }}>Activités</h3>
          <ul role="list" className={styles.profiles}>{ACTIVITIES.map((a) => <li key={a} style={{ fontSize: "1rem", background: "var(--white)" }}>{a}</li>)}</ul>
          <p style={{ marginTop: "var(--s-6)" }}>
            {upcoming.length ? <>Prochains rendez-vous : {upcoming.map((e, i) => <span key={e.slug}>{i > 0 && " · "}<Link href={`/evenements/${e.slug}`} className="link">{e.title}</Link></span>)} — </> : null}
            <Link href="/evenements#agenda" className="link">Voir l&apos;agenda des événements</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="channels-title">
        <div className="container">
          <p className="eyebrow">Canaux officiels</p>
          <h2 id="channels-title" style={{ marginBlock: "var(--s-3) var(--s-6)" }}>Où nous retrouver</h2>
          {COMMUNITY_CHANNELS.length ? (
            <ul role="list" className={styles.channels}>
              {COMMUNITY_CHANNELS.map((c) => (
                <li key={c.id} style={{ display: "grid" }}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className={styles.channel}>
                    <b>{c.label} <Icon name="external" size={16} /></b>
                    <span className="muted small">{c.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="notice"><Icon name="info" /><span><strong>Les canaux officiels de la communauté sont en cours d&apos;ouverture.</strong> Inscrivez-vous ci-dessous : vous recevrez le lien d&apos;accès dès leur lancement. Aucun autre groupe ne parle au nom de l&apos;académie.</span></p>
          )}
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="rules-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Règles de participation</p>
            <h2 id="rules-title" style={{ color: "var(--white)" }}>Un espace sûr et bienveillant.</h2>
          </header>
          <ol role="list" className={styles.rules}>
            {COMMUNITY_RULES.map((r) => <li key={r}><span>{r}</span></li>)}
          </ol>
        </div>
      </section>

      <section id="inscription" className="section" aria-labelledby="signup-title">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <p className="eyebrow">Inscription</p>
          <h2 id="signup-title" style={{ marginBlock: "var(--s-3) var(--s-4)" }}>Recevoir les annonces de la communauté</h2>
          <p className="muted" style={{ marginBottom: "var(--s-6)" }}>Facultatif et gratuit : ateliers, ouvertures de formations, événements et opportunités. Désinscription possible à tout moment.</p>
          <Form formId="communaute" />
        </div>
      </section>
    </>
  );
}
