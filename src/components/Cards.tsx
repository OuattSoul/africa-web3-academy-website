import Link from "next/link";
import type { AcademyEvent, Resource, Training } from "@/content/types";
import { LABELS, formatDate, formatRange, isOrganised } from "@/content/site";
import { Icon } from "./Icon";
import styles from "./Cards.module.css";

export function StatusBadge({ status }: { status: Training["status"] }) {
  return <span className={`badge ${status === "en-preparation" ? "badge--draft" : "badge--confirmed"}`}>{LABELS.trainingStatus[status]}</span>;
}

export const modalityText = (t: Training) =>
  t.modalities.length ? t.modalities.map((m) => LABELS.modality[m]).join(" · ") : "Modalité à confirmer";

export function TrainingCard({ t, headingLevel = 3 }: { t: Training; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className={styles.training} data-status={t.status}>
      <div className={styles.trainingTop}>
        <span className={styles.domain}>{LABELS.domain[t.domain]}</span>
        <StatusBadge status={t.status} />
      </div>
      <H className={styles.trainingTitle}>
        <Link href={`/formations/${t.slug}`} className={styles.stretch}>{t.title}</Link>
      </H>
      <p className={styles.summary}>{t.summary}</p>
      <dl className={styles.meta}>
        <div><dt>Durée</dt><dd>{t.duration ?? "À confirmer"}</dd></div>
        <div><dt>Modalité</dt><dd>{modalityText(t)}</dd></div>
        <div><dt>Niveau</dt><dd>{LABELS.level[t.level]}</dd></div>
      </dl>
      <span className={styles.more} aria-hidden="true">Voir la formation <Icon name="arrow" size={18} /></span>
    </article>
  );
}

export function RoleBadge({ role }: { role: AcademyEvent["role"] }) {
  return <span className={`badge ${isOrganised(role) ? "badge--org" : "badge--participation"}`}>{LABELS.eventRole[role]}</span>;
}

export function EventCard({ e }: { e: AcademyEvent }) {
  const d = e.start ? new Date(e.start) : null;
  return (
    <article className={styles.event}>
      <div className={styles.eventDate} aria-hidden="true">
        {d ? (
          <>
            <span className={styles.day}>{d.getUTCDate()}</span>
            <span>{formatDate(e.start!, { month: "short", year: "numeric" })}</span>
          </>
        ) : (
          <>
            <span className={styles.day}>{e.dateLabel?.match(/\d{4}/)?.[0] ?? "—"}</span>
            <span>À confirmer</span>
          </>
        )}
      </div>
      <div className={styles.eventBody}>
        <div className={styles.eventTags}>
          <RoleBadge role={e.role} />
          <span className={styles.type}>{LABELS.eventType[e.type]}</span>
        </div>
        <h3 className={styles.eventTitle}>
          <Link href={`/evenements/${e.slug}`} className={styles.stretch}>{e.title}</Link>
        </h3>
        <p className={styles.summary}>{e.summary}</p>
        <p className={styles.where}>
          <Icon name="calendar" size={16} /> <span className="visually-hidden">Date :</span>{formatRange(e.start, e.end, e.dateLabel)}
          <span className={styles.sep} />
          <Icon name="pin" size={16} /> <span className="visually-hidden">Lieu :</span>{e.city ? `${e.city}, ${e.country}` : `${e.country} — lieu à confirmer`}
        </p>
      </div>
    </article>
  );
}

export function ResourceCard({ r }: { r: Resource }) {
  return (
    <article className={styles.resource}>
      <p className={styles.domain}>{LABELS.resourceCategory[r.category]}</p>
      <h3 className={styles.resourceTitle}>
        <Link href={`/ressources/${r.slug}`} className={styles.stretch}>{r.title}</Link>
      </h3>
      <p className={styles.summary}>{r.summary}</p>
      <p className={styles.resourceMeta}><time dateTime={r.date}>{formatDate(r.date, { month: "long", year: "numeric" })}</time> · {r.tags.join(", ")}</p>
    </article>
  );
}
