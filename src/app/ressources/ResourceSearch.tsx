"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { ResourceCard } from "@/components/Cards";
import { Icon } from "@/components/Icon";
import { RESOURCES } from "@/content/resources";
import { LABELS } from "@/content/site";
import type { ResourceCategory } from "@/content/types";
import styles from "../pages.module.css";

// Accent-insensitive matching so « reglement » finds « règlement ».
const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function ResourceSearch() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = (params.get("categorie") ?? "") as ResourceCategory | "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const dq = norm(useDeferredValue(q).trim());

  const setCat = (c: string) => {
    const next = new URLSearchParams(params.toString());
    if (c) next.set("categorie", c); else next.delete("categorie");
    router.replace(next.size ? `${pathname}?${next}` : pathname, { scroll: false });
  };

  const list = RESOURCES.filter((r) =>
    (!cat || r.category === cat) &&
    (!dq || norm([r.title, r.summary, r.tags.join(" "), ...r.body.map((b) => ("text" in b ? b.text : b.items.join(" ")))].join(" ")).includes(dq)),
  ).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className={styles.searchRow}>
        <div className={styles.search}>
          <label htmlFor="res-q" className="visually-hidden">Rechercher une ressource</label>
          <Icon name="search" />
          <input id="res-q" type="search" placeholder="Rechercher : hackathon, smart contracts, inscription…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className={styles.cats} role="group" aria-label="Catégories">
          <button type="button" className={styles.cat} aria-pressed={!cat} onClick={() => setCat("")}>Toutes <small>{RESOURCES.length}</small></button>
          {(Object.keys(LABELS.resourceCategory) as ResourceCategory[]).map((c) => (
            <button key={c} type="button" className={styles.cat} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {LABELS.resourceCategory[c]} <small>{RESOURCES.filter((r) => r.category === c).length}</small>
            </button>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="small muted" style={{ marginBottom: "var(--s-4)" }}>{list.length} {list.length > 1 ? "ressources" : "ressource"}</p>
      {list.length ? (
        <ul role="list" className={styles.resGrid}>{list.map((r) => <li key={r.slug} style={{ display: "grid" }}><ResourceCard r={r} /></li>)}</ul>
      ) : (
        <p className="notice"><Icon name="info" /><span><strong>Aucune ressource trouvée.</strong> {cat ? "Cette catégorie sera alimentée prochainement." : "Essayez un autre mot-clé."}</span></p>
      )}
    </>
  );
}
