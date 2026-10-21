"use client";
import { FilterBar, useFilterValues, type Filter } from "@/components/FilterBar";
import { EventCard } from "@/components/Cards";
import { EVENTS, eventYear, sortedEvents } from "@/content/events";
import { LABELS, isOrganised } from "@/content/site";

const uniq = (xs: string[]) => [...new Set(xs)].sort().map((v) => ({ value: v, label: v }));
const FILTERS: Filter[] = [
  { key: "role", label: "Rôle de l'académie", options: [{ value: "organisation", label: "Organisés par l'académie" }, { value: "participation", label: "Participations externes" }] },
  { key: "type", label: "Format", options: Object.entries(LABELS.eventType).map(([value, label]) => ({ value, label })) },
  { key: "annee", label: "Année", options: uniq(EVENTS.map(eventYear).filter((y) => y !== "—")).reverse() },
  { key: "pays", label: "Pays", options: uniq(EVENTS.map((e) => e.country)) },
  { key: "ville", label: "Ville", options: uniq(EVENTS.flatMap((e) => (e.city ? [e.city] : []))) },
  { key: "theme", label: "Thématique", options: uniq(EVENTS.flatMap((e) => e.themes)) },
];

export function EventsList() {
  const f = useFilterValues(FILTERS.map((x) => x.key));
  const list = sortedEvents().filter((e) =>
    (!f.role || (f.role === "organisation") === isOrganised(e.role)) &&
    (!f.type || e.type === f.type) &&
    (!f.annee || eventYear(e) === f.annee) &&
    (!f.pays || e.country === f.pays) &&
    (!f.ville || e.city === f.ville) &&
    (!f.theme || e.themes.includes(f.theme)),
  );
  const participationsEmpty = f.role === "participation" && !list.length;

  return (
    <>
      <FilterBar filters={FILTERS} count={list.length} noun={["événement", "événements"]} />
      {list.length ? (
        <div style={{ borderBottom: "1px solid var(--border)" }}>{list.map((e) => <EventCard key={e.slug} e={e} />)}</div>
      ) : (
        <div className="notice" style={{ display: "block" }}>
          <p><strong>{participationsEmpty ? "Aucune participation externe documentée pour le moment." : "Aucun événement ne correspond à ces critères."}</strong></p>
          <p>{participationsEmpty ? "Les interventions de l'académie chez d'autres organisateurs seront ajoutées ici, avec le rôle exact de l'académie." : "Modifiez ou réinitialisez les filtres."}</p>
        </div>
      )}
    </>
  );
}
