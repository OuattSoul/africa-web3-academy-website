import Image from "next/image";
import { pageMeta } from "@/content/seo";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { PARTNERS, PARTNER_CATEGORIES } from "@/content/partners";
import { LABELS } from "@/content/site";
import styles from "../pages.module.css";

export const metadata = pageMeta("/partenaires");

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Développer les compétences Web3, avec d'autres."
        lead="Universités, communautés, médias, entreprises technologiques et institutions : chaque partenariat sert l'apprentissage pratique et l'adoption utile de la blockchain."
        crumbs={[{ label: "Partenaires" }]}
      >
        <Link href="/partenaires/devenir-partenaire" className="btn btn--light">Devenir partenaire <Icon name="arrow" /></Link>
      </PageHero>

      <section className="section" aria-labelledby="current-title">
        <div className="container">
          <p className="eyebrow">Nos partenaires</p>
          <h2 id="current-title" style={{ marginBlock: "var(--s-3) var(--s-6)" }}>Partenariats confirmés</h2>
          {PARTNERS.length ? (
            <ul role="list" className={styles.logos}>
              {PARTNERS.map((p) => (
                <li key={p.name}>
                  {p.logo && p.logoAuthorized ? <Image src={p.logo} alt={p.name} width={160} height={80} style={{ objectFit: "contain" }} /> : p.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="notice"><Icon name="info" /><span><strong>Aucun partenariat n&apos;est encore publié.</strong> Les partenaires apparaîtront ici une fois la collaboration confirmée et l&apos;usage de leur nom ou de leur logo autorisé.</span></p>
          )}
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="types-title">
        <div className={`container ${styles.twoCol}`}>
          <header>
            <p className="eyebrow">Types de partenariats</p>
            <h2 id="types-title">Sept manières de collaborer.</h2>
            <p className="muted" style={{ marginTop: "var(--s-4)" }}>Chaque partenariat est défini avec vous : objectifs, apports de chacun et visibilité.</p>
          </header>
          <ul role="list" className={styles.ruled}>
            {PARTNER_CATEGORIES.map((c) => {
              const list = PARTNERS.filter((p) => p.category === c.id);
              return (
                <li key={c.id} id={c.id}>
                  <h3>{LABELS.partnerCategory[c.id]}</h3>
                  <div>
                    <p className="muted">{c.text}</p>
                    {list.length > 0 && <p className="small" style={{ marginTop: "var(--s-2)" }}><b>{list.map((p) => p.name).join(", ")}</b></p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="join-title">
        <div className="container" style={{ display: "grid", gap: "var(--s-5)", justifyItems: "start" }}>
          <h2 id="join-title" style={{ color: "var(--white)", maxWidth: "20ch" }}>Votre organisation partage notre mission ?</h2>
          <Link href="/partenaires/devenir-partenaire" className="btn btn--light">Proposer un partenariat <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
