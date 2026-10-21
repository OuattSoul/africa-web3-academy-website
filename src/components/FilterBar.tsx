"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./FilterBar.module.css";

export interface Filter { key: string; label: string; options: { value: string; label: string }[] }

/** URL-driven filters (shareable, back-button friendly). Read the same params with useFilterValues. */
export function FilterBar({ filters, count, noun }: { filters: Filter[]; count: number; noun: [string, string] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = filters.filter((f) => params.get(f.key));

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.filters} role="group" aria-label="Filtres">
        {filters.map((f) => (
          <div key={f.key} className={styles.filter}>
            <label htmlFor={`flt-${f.key}`}>{f.label}</label>
            <select id={`flt-${f.key}`} value={params.get(f.key) ?? ""} onChange={(e) => update(f.key, e.target.value)} data-set={params.get(f.key) ? "" : undefined}>
              <option value="">Tous</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className={styles.status}>
        <p aria-live="polite"><b>{count}</b> {count > 1 ? noun[1] : noun[0]}</p>
        {active.length > 0 && (
          <button type="button" className={styles.reset} onClick={() => router.replace(pathname, { scroll: false })}>Réinitialiser les filtres</button>
        )}
      </div>
    </div>
  );
}

export function useFilterValues(keys: string[]) {
  const params = useSearchParams();
  return Object.fromEntries(keys.map((k) => [k, params.get(k) ?? ""])) as Record<string, string>;
}
