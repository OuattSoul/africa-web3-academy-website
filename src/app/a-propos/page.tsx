import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { TeamGrid } from "@/components/TeamGrid";
import { POLES, TEAM } from "@/content/about";
import { SITE } from "@/content/site";
import styles from "../pages.module.css";

export const metadata = pageMeta("/a-propos");

const APPROACH = [
  { t: "Pratique d'abord", d: "« Build first, understand deeper » : on construit dès le premier jour ; la théorie vient débloquer l'étape suivante." },
  { t: "Projets concrets", d: "Mini-projets encadrés, projet fil rouge, livrables déployés et documentés." },
  { t: "Mentorat", d: "Formateurs, mentors et professionnels du secteur accompagnent les apprenants." },
  { t: "Ouverture", d: "Hackathons inter-universitaires, équipes pluridisciplinaires, standards internationaux du numérique." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Développer les compétences qui feront la blockchain utile, en Afrique francophone."
        lead="Africa Web3 Academy est une initiative de formation, de sensibilisation et d'accompagnement aux technologies blockchain, Web3 et intelligence artificielle, basée à Abidjan."
        crumbs={[{ label: "À propos" }]}
      />

      <section className="section" aria-labelledby="mission-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Mission & vision</p>
            <h2 id="mission-title">Former celles et ceux qui construiront.</h2>
          </header>
          <div style={{ display: "grid", gap: "var(--s-5)", fontSize: "var(--fs-lead)" }}>
            <p><b>Notre mission :</b> développer les compétences et les savoir-faire nécessaires à l&apos;adoption et à la construction de solutions blockchain utiles à la société.</p>
            <p className="muted">Nous voulons une Afrique francophone qui ne se contente pas d&apos;utiliser les technologies décentralisées, mais qui les conçoit — pour l&apos;inclusion financière, la traçabilité, l&apos;éducation, la gouvernance ou la santé.</p>
            <p className="muted">Pour cela, l&apos;académie agit sur quatre plans : former les talents, accompagner les organisations, animer des événements et faire vivre une communauté d&apos;apprentissage.</p>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="approach-title">
        <div className="container">
          <p className="eyebrow">Approche pédagogique</p>
          <h2 id="approach-title" style={{ marginBlock: "var(--s-3) var(--s-7)", maxWidth: "20ch" }}>85 % de pratique, 15 % de théorie.</h2>
          <ul role="list" className={styles.tiles}>
            {APPROACH.map((a) => <li key={a.t} className={styles.tile}><h3>{a.t}</h3><p className="muted small">{a.d}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="history-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Histoire & réalisations</p>
            <h2 id="history-title">Les premières étapes.</h2>
          </header>
          <ul role="list" className={styles.ruled}>
            <li><h3>Panel « Technologies 3.0 »</h3><p className="muted">Organisation à Abidjan d&apos;un panel sur la blockchain dans l&apos;AgriTech, la santé et la finance (novembre 2025). <Link href="/evenements/technologies-3-0-sante-agriculture-2025" className="link">Voir la fiche</Link></p></li>
            <li><h3>Parcours développeur</h3><p className="muted">Conception d&apos;un parcours de 96 heures pour devenir développeur Web3 full stack. <Link href="/formations/developpeur-blockchain-web3" className="link">Voir le parcours</Link></p></li>
            <li><h3>Clubs en établissement</h3><p className="muted">Proposition aux universités et écoles d&apos;un Club Blockchain & Web3 encadré, complémentaire aux cursus.</p></li>
            <li><h3>Hackathon 2026</h3><p className="muted">Lancement du programme d&apos;initiation et du hackathon inter-universitaire, édition 2026. <Link href="/evenements/hackathon-inter-universitaire-2026" className="link">Voir le programme</Link></p></li>
          </ul>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="team-title">
        <div className="container">
          <p className="eyebrow">Équipe & formateurs</p>
          <h2 id="team-title" style={{ marginBlock: "var(--s-3) var(--s-7)", color: "var(--white)" }}>Une organisation en pôles.</h2>
          <ul role="list" className={styles.tiles}>
            {POLES.map((p) => <li key={p.title} className={styles.tile}><h3 style={{ color: "var(--white)" }}>{p.title}</h3><p className="small" style={{ color: "var(--text-on-dark-muted)" }}>{p.text}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="section section--alt" id="equipe" aria-labelledby="people-title">
        <div className="container">
          <p className="eyebrow">Notre équipe</p>
          <h2 id="people-title" style={{ marginBlock: "var(--s-3) var(--s-7)", maxWidth: "22ch" }}>Les personnes qui font vivre l&apos;académie.</h2>
          {TEAM.length ? <TeamGrid members={TEAM} /> : <p className="muted">L&apos;équipe sera présentée ici prochainement.</p>}
          <p className="small muted" style={{ marginTop: "var(--s-6)" }}>Les formateurs et mentors sont présentés ici avec leur accord.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Présence</p>
            <h2 id="where-title">Abidjan, et toute l&apos;Afrique francophone en ligne.</h2>
          </header>
          <div style={{ display: "grid", gap: "var(--s-5)" }}>
            <address style={{ fontStyle: "normal", fontSize: "var(--fs-lead)" }}>{SITE.address.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}</address>
            <p className="muted">Les formations en ligne et hybrides permettent d&apos;apprendre depuis tout pays francophone. Les interventions en présentiel dans d&apos;autres villes se définissent avec les organisations.</p>
            <h3 style={{ marginTop: "var(--s-4)" }}>Contribuer et collaborer</h3>
            <p className="muted">Formateurs, mentors, établissements, entreprises : il existe plusieurs façons de rejoindre l&apos;aventure.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-3)" }}>
              <Link href="/partenaires/devenir-partenaire" className="btn">Devenir partenaire <Icon name="arrow" /></Link>
              <Link href="/contact" className="btn btn--ghost">Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
