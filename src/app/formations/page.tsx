import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { Catalogue } from "./Catalogue";
import styles from "./formations.module.css";

export const metadata = pageMeta("/formations");

export default function FormationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Formations"
        title="Des parcours pour comprendre, pratiquer et construire."
        lead="De l'initiation sans prérequis au parcours de développeur Web3 complet. Chaque fiche précise le public, la durée, la modalité et le statut du programme."
        crumbs={[{ label: "Formations" }]}
      />

      <section className="section" aria-label="Catalogue">
        <div className="container">
          <div className={styles.legend}>
            <span><span className="badge badge--confirmed">Programme confirmé</span> contenu validé par l&apos;académie</span>
            <span><span className="badge badge--draft">En préparation</span> contenu provisoire, susceptible d&apos;évoluer</span>
          </div>
          <Suspense fallback={<p className="muted">Chargement du catalogue…</p>}>
            <Catalogue />
          </Suspense>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="modes-title">
        <div className="container">
          <p className="eyebrow">Modalités</p>
          <h2 id="modes-title" style={{ marginBlock: "var(--s-3) var(--s-7)", maxWidth: "20ch" }}>Trois façons d&apos;apprendre, selon votre contexte.</h2>
          <div className={styles.modes}>
            <div className={styles.mode}><h3>Présentiel</h3><p className="muted small">Ateliers à Abidjan ou dans votre établissement, au contact des formateurs et des autres apprenants.</p></div>
            <div className={styles.mode}><h3>En ligne</h3><p className="muted small">Sessions à distance, accessibles depuis toute l&apos;Afrique francophone.</p></div>
            <div className={styles.mode}><h3>Hybride</h3><p className="muted small">L&apos;alternance des deux : la souplesse du distanciel, la dynamique du présentiel. C&apos;est le format du programme d&apos;initiation.</p></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="custom-title">
        <div className="container">
          <div className={`${styles.custom} on-dark`}>
            <div>
              <p className="eyebrow">Organisations</p>
              <h2 id="custom-title">Former une équipe, une promotion, une direction ?</h2>
              <p className="lead" style={{ marginTop: "var(--s-3)" }}>Nous construisons le programme avec vous : objectifs, public, durée et format.</p>
            </div>
            <Link href="/projet" className="btn btn--light">Parlons de votre projet <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
