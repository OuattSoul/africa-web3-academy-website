import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { FAQ } from "@/content/resources";
import styles from "../../pages.module.css";

export const metadata = pageMeta("/ressources/faq");

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow="Ressources" title="Questions fréquentes" crumbs={[{ label: "Ressources", href: "/ressources" }, { label: "Questions fréquentes" }]} />
      <section className="section">
        <div className="container">
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Icon name="chevron" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p style={{ marginTop: "var(--s-7)" }}>Votre question n&apos;y figure pas ? <Link href="/contact" className="link">Écrivez-nous</Link>.</p>
        </div>
      </section>
    </>
  );
}
