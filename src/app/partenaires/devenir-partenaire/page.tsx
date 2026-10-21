import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/content/seo";
import { Form } from "@/components/Form";
import styles from "../../pages.module.css";

export const metadata = pageMeta("/partenaires/devenir-partenaire");

const WAYS = [
  { t: "Accueillir un programme", d: "Club Blockchain & Web3, programme d'initiation ou hackathon dans votre établissement." },
  { t: "Co-organiser un événement", d: "Conférence, atelier, rencontre communautaire ou hackathon." },
  { t: "Partager une expertise", d: "Mentorat, interventions, jurys, études de cas réelles." },
  { t: "Apporter des ressources", d: "Outils, infrastructures, contenus pédagogiques, lieux d'accueil." },
  { t: "Relayer et faire connaître", d: "Couverture médiatique et diffusion des opportunités." },
  { t: "Soutenir la mission", d: "Accompagner le développement des compétences en Afrique francophone." },
];

export default function BecomePartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Devenir partenaire."
        lead="Décrivez votre organisation et ce que vous souhaitez construire ensemble. L'équipe vous répond pour en discuter."
        crumbs={[{ label: "Partenaires", href: "/partenaires" }, { label: "Devenir partenaire" }]}
      />
      <section className="section section--alt" aria-labelledby="ways-title">
        <div className="container">
          <h2 id="ways-title" style={{ marginBottom: "var(--s-6)" }}>Possibilités de collaboration</h2>
          <ul role="list" className={styles.tiles}>
            {WAYS.map((w) => <li key={w.t} className={styles.tile}><h3>{w.t}</h3><p className="muted small">{w.d}</p></li>)}
          </ul>
        </div>
      </section>
      <section className="section" aria-labelledby="form-title">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <h2 id="form-title" style={{ marginBottom: "var(--s-6)" }}>Proposer un partenariat</h2>
          <Form formId="partenaire" />
        </div>
      </section>
    </>
  );
}
