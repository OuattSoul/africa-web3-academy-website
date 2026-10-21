import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/content/seo";
import { SITE } from "@/content/site";
import styles from "../pages.module.css";

export const metadata = pageMeta("/confidentialite");

// Reflects what the site actually does. Review with a legal advisor before publication.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Politique de confidentialité" crumbs={[{ label: "Confidentialité" }]} />
      <section className="section">
        <div className={`container ${styles.legal}`}>
          <p className="muted small">Dernière mise à jour : <span className={styles.todo}>à compléter à la mise en ligne</span></p>
          <h2>Responsable du traitement</h2>
          <p>Africa Web3 Academy, {SITE.address.join(", ")}. Contact : <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a>.</p>
          <h2>Données collectées</h2>
          <p>Ce site collecte uniquement les données que vous saisissez dans ses formulaires (contact, demande de projet, proposition de partenariat, inscription à la communauté) : nom, adresse e-mail, et selon le formulaire, téléphone, organisation, fonction, ville et contenu de votre message.</p>
          <h2>Finalités</h2>
          <ul>
            <li>Répondre à vos demandes d&apos;information, de formation, d&apos;accompagnement ou de partenariat.</li>
            <li>Vous envoyer les annonces de la communauté, uniquement si vous y avez expressément consenti.</li>
          </ul>
          <h2>Transmission</h2>
          <p>Les messages sont transmis par e-mail à l&apos;équipe de l&apos;académie via un prestataire d&apos;envoi (Resend). Ils ne sont ni vendus, ni cédés à des tiers.</p>
          <h2>Durée de conservation</h2>
          <p><span className={styles.todo}>À définir par l&apos;académie</span> — par exemple, 3 ans après le dernier contact pour les demandes, et jusqu&apos;à désinscription pour les annonces.</p>
          <h2>Cookies et mesure d&apos;audience</h2>
          <p>Ce site n&apos;utilise aucun cookie publicitaire ni outil de mesure d&apos;audience. Si un tel outil était ajouté, votre consentement serait demandé au préalable.</p>
          <h2>Vos droits</h2>
          <p>Conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;opposition et de suppression de vos données. Pour l&apos;exercer, écrivez à <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a>. Vous pouvez également saisir l&apos;Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI).</p>
        </div>
      </section>
    </>
  );
}
