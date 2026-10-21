import Link from "next/link";
import type { ReactNode } from "react";
import { NetworkMotif } from "./NetworkMotif";
import styles from "./PageHero.module.css";

export interface Crumb { label: string; href?: string }

/** Dark opening band shared by inner pages. `tone="community"` uses the learners' blue. */
export function PageHero({ eyebrow, title, lead, crumbs, children, aside, tone = "ink" }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; crumbs?: Crumb[]; children?: ReactNode; aside?: ReactNode; tone?: "ink" | "navy" | "community";
}) {
  return (
    <section className={`${styles.hero} on-dark`} data-tone={tone}>
      <NetworkMotif className={styles.motif} />
      <div className={`container ${styles.inner}`}>
        {crumbs && (
          <nav aria-label="Fil d'Ariane" className={styles.crumbs}>
            <ol role="list">
              <li><Link href="/">Accueil</Link></li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        <div className={styles.grid}>
          <div className={styles.text}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {lead && <p className={`lead ${styles.lead}`}>{lead}</p>}
            {children && <div className={styles.actions}>{children}</div>}
          </div>
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
      </div>
    </section>
  );
}
