"use client";
import { FilterBar, useFilterValues, type Filter } from "@/components/FilterBar";
import { TrainingCard } from "@/components/Cards";
import { TRAININGS } from "@/content/trainings";
import { LABELS } from "@/content/site";
import styles from "./formations.module.css";

const toOpts = (o: Record<string, string>) => Object.entries(o).map(([value, label]) => ({ value, label }));
const FILTERS: Filter[] = [
  { key: "domaine", label: "Domaine", options: toOpts(LABELS.domain) },
  { key: "niveau", label: "Niveau", options: toOpts(LABELS.level) },
  { key: "public", label: "Public", options: toOpts(LABELS.audience) },
  { key: "duree", label: "Durée", options: toOpts(LABELS.duration) },
  { key: "modalite", label: "Modalité", options: toOpts(LABELS.modality) },
];

export function Catalogue() {
  const f = useFilterValues(FILTERS.map((x) => x.key));
  const list = TRAININGS.filter((t) =>
    (!f.domaine || t.domain === f.domaine) &&
    (!f.niveau || t.level === f.niveau) &&
    (!f.public || t.audiences.includes(f.public as never)) &&
    (!f.duree || t.durationBucket === f.duree) &&
    (!f.modalite || t.modalities.includes(f.modalite as never)),
  );
  // Confirmed programmes first, provisional ones after.
  const order = { confirme: 0, "sur-demande": 1, "en-preparation": 2 };
  list.sort((a, b) => order[a.status] - order[b.status]);

  return (
    <>
      <FilterBar filters={FILTERS} count={list.length} noun={["formation", "formations"]} />
      {list.length ? (
        <ul role="list" className={styles.grid} key={Object.values(f).join("|")}>
          {list.map((t, i) => (
            <li key={t.slug} className={styles.item} style={{ "--i": i } as React.CSSProperties}><TrainingCard t={t} headingLevel={2} /></li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p><b>Aucune formation ne correspond à ces critères.</b></p>
          <p className="muted small">Beaucoup de modalités restent à confirmer pour les programmes en préparation. Élargissez la recherche, ou demandez une formation sur mesure.</p>
        </div>
      )}
    </>
  );
}
