import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Form } from "@/components/Form";
import { SITE } from "@/content/site";
import styles from "../organisations/orgs.module.css";

export const metadata = pageMeta("/projet");

export default function ProjetPage() {
  return (
    <>
      <PageHero
        tone="navy"
        eyebrow="Organisations"
        title="Parlons de votre projet."
        lead="Quelques informations suffisent pour préparer un premier échange utile. Comptez environ trois minutes."
        crumbs={[{ label: "Organisations", href: "/organisations" }, { label: "Parlons de votre projet" }]}
      />
      <section className="section">
        <div className={`container ${styles.formLayout}`}>
          <aside className={styles.formAside} aria-label="Après votre demande">
            <h2 style={{ fontSize: "1.75rem" }}>Ce qui se passe ensuite</h2>
            <ol>
              <li><span>L&apos;équipe étudie votre demande.</span></li>
              <li><span>Nous vous proposons un premier échange, en présentiel ou en visioconférence.</span></li>
              <li><span>Vous recevez une proposition adaptée : format, contenu, calendrier.</span></li>
            </ol>
            <p className="muted small">
              Vous préférez écrire directement ? <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a> · <a href={SITE.phoneHref} className="link">{SITE.phone}</a>
            </p>
            <p className="muted small">Vous êtes étudiant ou apprenant ? <Link href="/communaute" className="link">Rejoignez plutôt la communauté</Link>.</p>
          </aside>
          <div>
            <Form formId="projet" />
          </div>
        </div>
      </section>
    </>
  );
}
