"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";
import styles from "./TeamGrid.module.css";

export type TeamCardData = { id: string; name: string; role: string; photo?: string; linkedin?: string; bio?: string };
type Side = "right" | "left" | "below";

const POPUP_W = 352; // keep in sync with --popup-w in TeamGrid.module.css
const GAP = 16;

/** Side of the card with room for the popup; "below" when neither fits (phones, narrow tablets). */
export function placePopup(rect: { left: number; right: number }, viewport: number, width = POPUP_W): Side {
  if (viewport - rect.right >= width + GAP) return "right";
  if (rect.left >= width + GAP) return "left";
  return "below";
}

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/** Hover (mouse) previews a member's description; click, tap or Enter pins it open; Escape or a click outside closes it. */
export function TeamGrid({ members }: { members: TeamCardData[] }) {
  const [open, setOpen] = useState<{ id: string; pinned: boolean } | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelector<HTMLElement>(`[data-member="${open.id}"] button`)?.focus();
      close();
    };
    const onDown = (e: PointerEvent) => { if (!(e.target as Element).closest(`[data-member="${open.id}"]`)) close(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <ul role="list" className={styles.grid}>
      {members.map((m) => (
        <Card
          key={m.id}
          m={m}
          open={open?.id === m.id}
          onHover={(on) => setOpen((o) => (o?.pinned ? o : on ? { id: m.id, pinned: false } : o?.id === m.id ? null : o))}
          onToggle={() => setOpen((o) => (o?.id === m.id && o.pinned ? null : { id: m.id, pinned: true }))}
          onClose={() => setOpen(null)}
        />
      ))}
    </ul>
  );
}

function Card({ m, open, onHover, onToggle, onClose }: { m: TeamCardData; open: boolean; onHover: (on: boolean) => void; onToggle: () => void; onClose: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const [side, setSide] = useState<Side>("right");
  const popupId = useId();
  const paras = m.bio?.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) ?? [];
  const place = () => { if (ref.current) setSide(placePopup(ref.current.getBoundingClientRect(), document.documentElement.clientWidth)); };

  const identity = (
    <>
      <span className={styles.photo}>
        {m.photo ? <Image src={m.photo} alt="" fill sizes="(min-width: 64rem) 18rem, (min-width: 40rem) 33vw, 100vw" /> : <span aria-hidden="true">{initials(m.name)}</span>}
      </span>
      <span className={styles.name}>{m.name}</span>
      <span className={styles.role}>{m.role}</span>
    </>
  );

  return (
    <li
      ref={ref}
      className={styles.card}
      data-member={m.id}
      data-open={open || undefined}
      data-side={side}
      onPointerEnter={(e) => { if (e.pointerType === "mouse" && paras.length) { place(); onHover(true); } }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") onHover(false); }}
    >
      {paras.length ? (
        <button type="button" className={styles.trigger} aria-expanded={open} aria-controls={popupId} onClick={() => { place(); onToggle(); }}>
          {identity}
          <span className={styles.more}>Découvrir son parcours <Icon name="chevron" size={16} /></span>
        </button>
      ) : (
        <div className={styles.trigger}>{identity}</div>
      )}
      {paras.length > 0 && (
        <div id={popupId} className={styles.popup} role="region" aria-label={`Présentation de ${m.name}`}>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <p><b>{m.name}</b><br /><span className="muted small">{m.role}</span></p>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer la présentation"><Icon name="close" size={18} /></button>
            </div>
            {paras.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      )}
      {m.linkedin && (
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
          <Icon name="linkedin" size={18} /> LinkedIn<span className="visually-hidden"> de {m.name} (nouvel onglet)</span>
        </a>
      )}
    </li>
  );
}
