import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Form } from "@/components/Form";
import { Icon } from "@/components/Icon";
import { CONTACT_SUBJECTS } from "@/lib/forms";
import { SITE } from "@/content/site";
import styles from "../pages.module.css";

export const metadata = pageMeta("/contact");

// Dedicated journeys for needs that have their own form.
const SHORTCUTS: Record<string, string> = { accompagnement: "/projet", partenariat: "/partenaires/devenir-partenaire" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sujet?: string }> }) {
  const { sujet } = await searchParams;
  const valid = CONTACT_SUBJECTS.some((s) => s.value === sujet) ? sujet! : "";
  return (
    <>
      <PageHero eyebrow="Contact" title="Écrivez-nous." lead="Choisissez l'objet de votre demande : elle sera orientée vers la bonne personne." crumbs={[{ label: "Contact" }]} />
      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <aside className={styles.coords} aria-label="Coordonnées et demandes">
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--s-3)" }}>Votre besoin</h2>
              <ul role="list" className={styles.needs}>
                {CONTACT_SUBJECTS.map((s) => {
                  const href = SHORTCUTS[s.value] ?? `/contact?sujet=${s.value}#formulaire`;
                  return <li key={s.value}><Link href={href} aria-current={valid === s.value ? "true" : undefined} scroll={!!SHORTCUTS[s.value]}>{s.label}<Icon name="arrow" size={18} /></Link></li>;
                })}
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "var(--s-3)" }}>Coordonnées</h2>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p><a href={SITE.phoneHref}>{SITE.phone}</a></p>
              <address className="muted" style={{ fontStyle: "normal", marginTop: "var(--s-3)" }}>{SITE.address.map((l) => <span key={l} style={{ display: "block" }}>{l}</span>)}</address>
            </div>
          </aside>
          <div id="formulaire">
            <Form key={valid} formId="contact" defaults={valid ? { sujet: valid } : {}} />
          </div>
        </div>
      </section>
    </>
  );
}
