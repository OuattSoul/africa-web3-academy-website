import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/content/seo";
import { SITE } from "@/content/site";
import styles from "../pages.module.css";

export const metadata = pageMeta("/mentions-legales");

export default function LegalPage() {
  const todo = (t: string) => <span className={styles.todo}>{t}</span>;
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" crumbs={[{ label: "Mentions légales" }]} />
      <section className="section">
        <div className={`container ${styles.legal}`}>
          <h2>Éditeur du site</h2>
          <p>Africa Web3 Academy — forme juridique : {todo("à compléter")} — RCCM : {todo("à compléter")}</p>
          <p>{SITE.address.join(", ")}</p>
          <p>Téléphone : <a href={SITE.phoneHref} className="link">{SITE.phone}</a> — E-mail : <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a></p>
          <p>Directeur de la publication : {todo("à compléter")}</p>
          <h2>Hébergement</h2>
          <p>{todo("Nom, adresse et contact de l'hébergeur — à compléter au déploiement")}</p>
          <h2>Propriété intellectuelle</h2>
          <p>Le logo, les textes et les contenus pédagogiques de ce site sont la propriété d&apos;Africa Web3 Academy. Toute reproduction sans autorisation est interdite. Les marques et logos de tiers restent la propriété de leurs détenteurs et ne sont affichés qu&apos;avec leur accord.</p>
        </div>
      </section>
    </>
  );
}
