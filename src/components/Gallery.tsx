"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { EventMedia } from "@/content/types";
import { Icon } from "./Icon";
import styles from "./Gallery.module.css";

/** Image grid + native <dialog> viewer (focus trap, Esc and backdrop close handled by the browser). */
export function Gallery({ media }: { media: EventMedia[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const photos = media.filter((m) => m.type === "photo");
  const videos = media.filter((m) => m.type === "video");
  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const go = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);
  const cur = photos[index];

  return (
    <>
      <ul role="list" className={styles.grid}>
        {photos.map((m, i) => (
          <li key={m.src}>
            <button type="button" className={styles.thumb} onClick={() => open(i)} aria-label={`Agrandir : ${m.alt}`}>
              <Image src={m.src} alt="" width={m.width ?? 800} height={m.height ?? 600} sizes="(min-width: 900px) 33vw, 50vw" loading="lazy" />
            </button>
          </li>
        ))}
        {videos.map((m) => (
          <li key={m.src} className={styles.video}>
            <video src={m.src} controls preload="none" aria-label={m.alt} />
          </li>
        ))}
      </ul>
      <dialog ref={dialog} className={styles.dialog} aria-label="Visionneuse" onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
        {cur && (
          <figure className={styles.figure}>
            <Image src={cur.src} alt={cur.alt} width={cur.width ?? 1600} height={cur.height ?? 1200} sizes="90vw" />
            <figcaption>{cur.alt} <span>{index + 1} / {photos.length}</span></figcaption>
          </figure>
        )}
        <div className={styles.controls}>
          {photos.length > 1 && <button type="button" onClick={() => go(-1)} aria-label="Photo précédente"><Icon name="arrow" className={styles.prev} /></button>}
          {photos.length > 1 && <button type="button" onClick={() => go(1)} aria-label="Photo suivante"><Icon name="arrow" /></button>}
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Fermer"><Icon name="close" /></button>
        </div>
      </dialog>
    </>
  );
}
