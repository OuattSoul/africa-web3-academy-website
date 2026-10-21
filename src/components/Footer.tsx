import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/content/navigation";
import { SITE } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Image src="/brand/logo-negative.png" alt="Africa Web3 Academy" width={325} height={349} className={styles.logo} />
          <p className={styles.mission}>
            Former, sensibiliser et accompagner les talents et les organisations d&apos;Afrique francophone pour construire des solutions blockchain utiles.
          </p>
        </div>
        {FOOTER_LINKS.map((g) => (
          <nav key={g.title} aria-label={g.title} className={styles.col}>
            <p className={styles.title}>{g.title}</p>
            <ul role="list">
              {g.links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
        <address className={styles.col}>
          <p className={styles.title}>Contact</p>
          <ul role="list">
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            {SITE.address.map((l) => <li key={l} className={styles.plain}>{l}</li>)}
            {SITE.socials.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
          </ul>
        </address>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Africa Web3 Academy</p>
        <ul role="list">
          <li><Link href="/mentions-legales">Mentions légales</Link></li>
          <li><Link href="/confidentialite">Confidentialité</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}
