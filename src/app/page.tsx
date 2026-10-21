import Link from "next/link";
import { pageMeta } from "@/content/seo";
import { Icon } from "@/components/Icon";
import { NetworkMotif } from "@/components/NetworkMotif";
import { EventCard, StatusBadge, modalityText } from "@/components/Cards";
import { TRAININGS } from "@/content/trainings";
import { SEGMENTS, SERVICES } from "@/content/solutions";
import { sortedEvents } from "@/content/events";
import { PARTNERS, PARTNER_CATEGORIES } from "@/content/partners";
import { communityHref } from "@/content/community";
import { LABELS, formatDate } from "@/content/site";
import styles from "./home.module.css";

const AXES = [
  { n: "01", title: "Formation", text: "Des parcours pratiques, de l'initiation au développement d'applications décentralisées, pour étudiants, développeurs et professionnels.", href: "/formations", cta: "Le catalogue" },
  { n: "02", title: "Conseil & accompagnement", text: "Sensibilisation, formation des équipes, cadrage de cas d'usage et projets pilotes pour entreprises, institutions et ONG.", href: "/organisations", cta: "Les solutions" },
  { n: "03", title: "Événements", text: "Hackathons inter-universitaires, conférences et ateliers qui rapprochent étudiants, experts et décideurs.", href: "/evenements", cta: "L'agenda" },
  { n: "04", title: "Communauté & écosystème", text: "Un espace pour apprendre ensemble, partager des opportunités et collaborer avec les acteurs du Web3.", href: "/communaute", cta: "La communauté" },
];

const STEPS = [
  { title: "Comprendre", text: "Chaque notion est introduite au moment où le projet en a besoin." },
  { title: "Pratiquer", text: "Ateliers guidés et exercices dès la première séance." },
  { title: "Construire", text: "Mini-projets encadrés et projet fil rouge, avec mentors du secteur." },
  { title: "Présenter", text: "Démonstration, pitch devant un jury, retour d'expérience." },
];

const ACHIEVEMENTS = [
  { k: "Parcours", title: "Développeur Blockchain & Web3", text: "Un programme de 96 heures en six modules, du premier fichier HTML au déploiement d'une dApp auditée." },
  { k: "Programme", title: "Initiation & hackathon inter-universitaire", text: "Quatre semaines d'initiation hybride suivies d'un hackathon de 24 à 48 h, avec règlement et grille d'évaluation publics." },
  { k: "Modèle", title: "Clubs Blockchain & Web3 en établissement", text: "Un dispositif encadré, complémentaire aux cursus, proposé aux universités et écoles." },
  { k: "Événement", title: "Technologies 3.0, santé & agriculture", text: "Un panel organisé à Abidjan sur la blockchain dans l'AgriTech, la santé et la finance." },
];

export const metadata = pageMeta("/");

export default function Home() {
  const [feature, second] = TRAININGS.filter((t) => t.featured);
  const upcoming = TRAININGS.filter((t) => t.status === "en-preparation").slice(0, 5);
  const events = sortedEvents().slice(0, 3);
  const joinHref = communityHref();

  return (
    <>
      {/* 1 — Hero */}
      <section className={`${styles.hero} on-dark`}>
        <NetworkMotif className={styles.heroMotif} />
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">Académie blockchain & Web3 · Afrique francophone</p>
            <h1 className={styles.heroTitle}>
              Apprendre la blockchain. <span>La comprendre.</span> <em>Construire avec.</em>
            </h1>
            <p className={`lead ${styles.heroLead}`}>
              Africa Web3 Academy forme les talents et accompagne les organisations pour concevoir des solutions blockchain utiles à la société — par la pratique, avec l&apos;écosystème.
            </p>
            <div className={styles.heroActions}>
              <Link href="/formations" className="btn btn--light">Découvrir les formations <Icon name="arrow" /></Link>
              <Link href="/organisations" className="btn btn--ghost-light">Solutions pour les organisations</Link>
            </div>
            <Link href={joinHref} className={`text-link ${styles.heroCommunity}`}>Rejoindre la communauté <Icon name="arrow" /></Link>
          </div>

          <aside className={styles.heroCard} aria-label="Parcours phare">
            <p className={styles.heroCardKicker}>Parcours phare</p>
            <p className={styles.heroCardTitle}>{feature.title}</p>
            <dl className={styles.heroFacts}>
              <div><dt>96 h</dt><dd>sur 6 mois</dd></div>
              <div><dt>6</dt><dd>modules</dd></div>
              <div><dt>85 %</dt><dd>de pratique</dd></div>
            </dl>
            <p className={styles.heroCardText}>Projet fil rouge : une plateforme de tokenisation immobilière, des contrats à la mise en production.</p>
            <Link href={`/formations/${feature.slug}`} className="text-link">Voir le programme <Icon name="arrow" /></Link>
          </aside>
        </div>
        <div className={`container ${styles.heroStrip}`}>
          <span>Présentiel</span><span>En ligne</span><span>Hybride</span>
          <span className={styles.heroPlace}><Icon name="pin" size={16} /> Abidjan, Côte d&apos;Ivoire</span>
        </div>
      </section>

      {/* 2 — Domaines d'intervention */}
      <section className="section" aria-labelledby="axes-title">
        <div className={`container ${styles.axes}`}>
          <header className={styles.axesHead} data-reveal>
            <p className="eyebrow">Ce que nous faisons</p>
            <h2 id="axes-title">Plus qu&apos;une école&nbsp;: une académie, un partenaire, un acteur de l&apos;écosystème.</h2>
          </header>
          <ol role="list" className={styles.axesList}>
            {AXES.map((a, i) => (
              <li key={a.n} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <Link href={a.href} className={styles.axis}>
                  <span className={styles.axisN}>{a.n}</span>
                  <span className={styles.axisTitle}>{a.title}</span>
                  <span className={styles.axisText}>{a.text}</span>
                  <span className={styles.axisCta}>{a.cta} <Icon name="arrow" size={18} /></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — Formations à la une */}
      <section className="section section--alt" aria-labelledby="formations-title">
        <div className="container">
          <header className={styles.split} data-reveal>
            <div>
              <p className="eyebrow">Formations à la une</p>
              <h2 id="formations-title">Des parcours conçus pour passer de la théorie au projet.</h2>
            </div>
            <Link href="/formations" className="text-link">Tout le catalogue <Icon name="arrow" /></Link>
          </header>
          <div className={styles.featured}>
            <article className={styles.featureMain} data-reveal>
              <div className={styles.featureTop}>
                <span className="eyebrow">{LABELS.domain[feature.domain]}</span>
                <StatusBadge status={feature.status} />
              </div>
              <h3 className={styles.featureTitle}><Link href={`/formations/${feature.slug}`}>{feature.title}</Link></h3>
              <p>{feature.summary}</p>
              <ol className={styles.modules}>
                {feature.program.map((m) => <li key={m.title}>{m.title}</li>)}
              </ol>
              <dl className={styles.featureMeta}>
                <div><dt>Durée</dt><dd>{feature.duration}</dd></div>
                <div><dt>Public</dt><dd>Profils non techniques à développeurs</dd></div>
                <div><dt>Modalité</dt><dd>{modalityText(feature)}</dd></div>
                <div><dt>Prochaine session</dt><dd>{feature.sessions[0] ? formatDate(feature.sessions[0].start) : "Aucune date publiée"}</dd></div>
              </dl>
              <Link href={`/formations/${feature.slug}`} className="btn">Découvrir le parcours <Icon name="arrow" /></Link>
            </article>
            <div className={styles.featureSide}>
              <article className={styles.featureSecond} data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
                <div className={styles.featureTop}>
                  <span className="eyebrow">{LABELS.domain[second.domain]}</span>
                  <StatusBadge status={second.status} />
                </div>
                <h3 className={styles.featureTitleSm}><Link href={`/formations/${second.slug}`}>{second.title}</Link></h3>
                <p className="small muted">{second.summary}</p>
                <p className={styles.chips}><span>{second.duration}</span><span>{modalityText(second)}</span><span>Étudiants, toutes filières</span></p>
              </article>
              <div className={styles.soon} data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
                <p className={styles.soonTitle}>Programmes en préparation</p>
                <ul role="list">
                  {upcoming.map((t) => (
                    <li key={t.slug}><Link href={`/formations/${t.slug}`}>{t.shortTitle ?? t.title}<Icon name="arrow" size={16} /></Link></li>
                  ))}
                </ul>
                <Link href="/communaute#inscription" className="text-link">Être informé des ouvertures <Icon name="arrow" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Organisations */}
      <section className="section section--brand on-dark" aria-labelledby="orgs-title">
        <div className={`container ${styles.orgs}`}>
          <header className={styles.orgsHead} data-reveal>
            <p className="eyebrow">Accompagnement des organisations</p>
            <h2 id="orgs-title">Votre organisation s&apos;interroge sur la blockchain. Partons de vos besoins, pas de la technologie.</h2>
            <p className="lead">Sensibiliser les décideurs, former les équipes, identifier les cas d&apos;usage pertinents, tester un projet pilote : un accompagnement à la mesure de votre contexte.</p>
            <Link href="/projet" className="btn btn--light">Parlons de votre projet <Icon name="arrow" /></Link>
          </header>
          <ul role="list" className={styles.segments}>
            {SEGMENTS.map((s, i) => (
              <li key={s.slug} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <Link href={`/organisations/${s.slug}`} className={styles.segment}>
                  <span className={styles.segmentTitle}>{s.title}</span>
                  <span className={styles.segmentText}>{s.tagline}</span>
                  <Icon name="arrow" size={22} className={styles.segmentArrow} />
                </Link>
              </li>
            ))}
          </ul>
          <ul role="list" className={styles.services} data-reveal>
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/organisations/${s.slug}`}>{s.title}</Link></li>)}
          </ul>
        </div>
      </section>

      {/* 5 — Méthode */}
      <section className="section" aria-labelledby="method-title">
        <div className={`container ${styles.method}`}>
          <div className={styles.methodQuote} data-reveal>
            <p className="eyebrow">Méthode pédagogique</p>
            <h2 id="method-title"><span lang="en">« Build first, understand deeper. »</span></h2>
            <p className="lead">On code dès le premier jour. La théorie arrive au moment où elle devient nécessaire pour débloquer l&apos;étape suivante du projet.</p>
            <div className={styles.ratio} role="img" aria-label="Répartition du parcours développeur : 85 % de pratique, 15 % de théorie">
              <div className={styles.ratioBar}><span style={{ width: "85%" }} /><span /></div>
              <div className={styles.ratioLegend}><span><b>85 %</b> pratique</span><span><b>15 %</b> théorie</span></div>
            </div>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <span className={styles.stepN}>{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="muted small">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 — Réalisations (no figures until verified) */}
      <section className="section section--alt" aria-labelledby="real-title">
        <div className="container">
          <header className={styles.split} data-reveal>
            <div>
              <p className="eyebrow">Réalisations</p>
              <h2 id="real-title">Ce que nous avons déjà construit.</h2>
            </div>
            <p className={`muted small ${styles.realNote}`}>Les indicateurs d&apos;impact (apprenants formés, établissements, projets) seront publiés une fois consolidés et vérifiés.</p>
          </header>
          <ul role="list" className={styles.achievements}>
            {ACHIEVEMENTS.map((a, i) => (
              <li key={a.title} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <p className={styles.achK}>{a.k}</p>
                <h3>{a.title}</h3>
                <p className="muted small">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Événements */}
      <section className="section" aria-labelledby="events-title">
        <div className={`container ${styles.eventsWrap}`}>
          <header className={styles.eventsHead} data-reveal>
            <p className="eyebrow">Événements</p>
            <h2 id="events-title">Sur le terrain, avec l&apos;écosystème.</h2>
            <dl className={styles.legend}>
              <div><dt><span className="badge badge--org">Organisé</span></dt><dd>conçu et porté par l&apos;académie</dd></div>
              <div><dt><span className="badge badge--participation">Participation</span></dt><dd>intervention ou présence chez un autre organisateur</dd></div>
            </dl>
            <Link href="/evenements" className="text-link">Tous les événements <Icon name="arrow" /></Link>
          </header>
          <div className={styles.eventsList} data-reveal>
            {events.map((e) => <EventCard key={e.slug} e={e} />)}
          </div>
        </div>
      </section>

      {/* 8 — Partenaires */}
      <section className={`section section--alt ${styles.partners}`} aria-labelledby="partners-title">
        <div className={`container ${styles.partnersGrid}`} data-reveal>
          <div>
            <p className="eyebrow">Partenaires</p>
            <h2 id="partners-title">Construire avec d&apos;autres.</h2>
          </div>
          {PARTNERS.length ? (
            <ul role="list" className={styles.partnerList}>{PARTNERS.map((p) => <li key={p.name}>{p.name}</li>)}</ul>
          ) : (
            <div className={styles.partnersEmpty}>
              <p>Nous présenterons ici les partenaires dont la collaboration est confirmée. Établissements, communautés, médias, entreprises technologiques : {PARTNER_CATEGORIES.length} façons de collaborer.</p>
              <div className={styles.partnerActions}>
                <Link href="/partenaires/devenir-partenaire" className="btn btn--ghost">Devenir partenaire</Link>
                <Link href="/partenaires" className="text-link">Les types de partenariats <Icon name="arrow" /></Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 9 — Communauté */}
      <section className={`${styles.community} on-dark`} aria-labelledby="community-title">
        <NetworkMotif className={styles.communityMotif} />
        <div className={`container ${styles.communityGrid}`}>
          <div data-reveal>
            <p className="eyebrow">Communauté</p>
            <h2 id="community-title">Étudiants, développeurs, curieux : apprenez avec nous.</h2>
          </div>
          <div className={styles.communityBody} data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            <ul role="list" className={styles.checks}>
              <li><Icon name="check" /> Ateliers et sessions d&apos;apprentissage</li>
              <li><Icon name="check" /> Annonces des formations et des hackathons</li>
              <li><Icon name="check" /> Opportunités de projets et de collaboration</li>
            </ul>
            <Link href={joinHref} className="btn btn--light">Rejoindre la communauté <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      {/* 10 — Appel à l'action final */}
      <section className={styles.final} aria-label="Choisir votre parcours">
        <Link href="/formations" className={styles.path} data-reveal>
          <span className="eyebrow">Apprenants</span>
          <span className={styles.pathTitle}>Je souhaite me former</span>
          <span className={styles.pathText}>Initiation, développement, produit, marketing : trouvez le parcours adapté à votre niveau.</span>
          <span className={styles.pathArrow}><Icon name="arrow" size={28} /></span>
        </Link>
        <Link href="/projet" className={`${styles.path} ${styles.pathOrg} on-dark`} data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <span className="eyebrow">Organisations</span>
          <span className={styles.pathTitle}>Je représente une organisation</span>
          <span className={styles.pathText}>Entreprise, administration, ONG ou établissement : décrivez votre besoin en quelques minutes.</span>
          <span className={styles.pathArrow}><Icon name="arrow" size={28} /></span>
        </Link>
      </section>
      <p className={`container ${styles.finalAlt}`}>
        Pas encore décidé ? <Link href={joinHref} className="link">Rejoignez d&apos;abord la communauté</Link> ou <Link href="/contact" className="link">posez-nous une question</Link>.
      </p>
    </>
  );
}
