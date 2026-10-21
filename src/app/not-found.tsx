import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Erreur 404" title="Cette page n'existe pas (ou plus)." lead="Le lien est peut-être incorrect, ou la page a été déplacée. Voici où aller ensuite.">
        <Link href="/" className="btn btn--light">Retour à l&apos;accueil <Icon name="arrow" /></Link>
        <Link href="/formations" className="btn btn--ghost-light">Les formations</Link>
        <Link href="/contact" className="btn btn--ghost-light">Nous contacter</Link>
      </PageHero>
    </>
  );
}
