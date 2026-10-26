"use client";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { AFRICA_SHAPES, MAP_HEIGHT as H, MAP_WIDTH as W, project } from "@/content/geo/africa";
import { CAMPUS_STATUS_LABEL } from "@/content/campusBuilder";
import type { CampusCountry } from "@/content/types";
import styles from "./CampusMap.module.css";

// Two SVG layers: country shapes (zoomed as a group, non-scaling borders), then markers
// redrawn in screen pixels so they keep a constant size.

type View = { k: number; x: number; y: number };
type Pt = { x: number; y: number };
const MAX_K = 6;
const LABEL_OFFSET = { top: [0, -14, "middle"], bottom: [0, 22, "middle"], left: [-13, 4, "end"], right: [13, 4, "start"] } as const;

const clampView = ({ k, x, y }: View): View => {
  k = Math.min(MAX_K, Math.max(1, k));
  return { k, x: Math.min(0, Math.max(W - W * k, x)), y: Math.min(0, Math.max(H - H * k, y)) };
};

/** Zoom to `k` keeping the map point under `c` (map units, screen side) fixed. */
const zoomAt = (v: View, k: number, c: Pt) => {
  const r = clampView({ ...v, k }).k / v.k;
  return clampView({ k: v.k * r, x: c.x - (c.x - v.x) * r, y: c.y - (c.y - v.y) * r });
};

export function CampusMap({ countries }: { countries: CampusCountry[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [view, setView] = useState<View>({ k: 1, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const [scale, setScale] = useState(0.7); // CSS px per map unit
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const active = hovered ?? pinned;

  const byCode = useMemo(() => new Map(countries.map((c) => [c.code, c])), [countries]);
  const byIso = useMemo(() => new Map(countries.map((c) => [c.iso, c])), [countries]);
  const points = useMemo(() => new Map(countries.map((c) => [c.code, project(c.marker.lat, c.marker.lon)])), [countries]);

  // map units -> CSS px inside the map box
  const toPx = ([x, y]: [number, number]): [number, number] => [(x * view.k + view.x) * scale, (y * view.k + view.y) * scale];

  // Track the rendered size; pause animations while the map is off-screen
  useEffect(() => {
    const svg = svgRef.current!;
    const ro = new ResizeObserver(() => setScale(svg.getBoundingClientRect().width / W || 0.7));
    ro.observe(svg);
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting));
    io.observe(svg);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  const toMap = (clientX: number, clientY: number): Pt => {
    const r = svgRef.current!.getBoundingClientRect();
    const s = r.width / W;
    return { x: (clientX - r.left) / s, y: (clientY - r.top) / s };
  };

  // Ctrl/⌘ + wheel (and trackpad pinch) zooms; a plain wheel keeps scrolling the page
  useEffect(() => {
    const svg = svgRef.current!;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const v = viewRef.current;
      setView(zoomAt(v, v.k * Math.exp(-e.deltaY * 0.004), toMap(e.clientX, e.clientY)));
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to pan, two fingers to pinch-zoom
  const pointers = useRef(new Map<number, Pt>());
  const gesture = useRef<{ start: View; origin: Map<number, Pt>; moved: boolean } | null>(null);
  const dragged = useRef(false);
  const rebase = () => { gesture.current = { start: viewRef.current, origin: new Map(pointers.current), moved: gesture.current?.moved ?? false }; };

  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointers.current.set(e.pointerId, toMap(e.clientX, e.clientY));
    if (pointers.current.size === 1) gesture.current = null;
    rebase();
  };
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const g = gesture.current;
    if (!g || !pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, toMap(e.clientX, e.clientY));
    const [p0, p1] = [...pointers.current.values()];
    const [o0, o1] = [...g.origin.values()];
    if (!o0) return;
    if (pointers.current.size === 1) {
      const dx = p0.x - o0.x, dy = p0.y - o0.y;
      if (!g.moved && Math.hypot(dx, dy) * scale < 5) return;
      if (!g.moved) e.currentTarget.setPointerCapture(e.pointerId);
      g.moved = true;
      setView(clampView({ ...g.start, x: g.start.x + dx, y: g.start.y + dy }));
    } else if (p1 && o1) {
      g.moved = true;
      const k = g.start.k * (Math.hypot(p1.x - p0.x, p1.y - p0.y) / (Math.hypot(o1.x - o0.x, o1.y - o0.y) || 1));
      const mid = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 }, mid0 = { x: (o0.x + o1.x) / 2, y: (o0.y + o1.y) / 2 };
      const z = zoomAt(g.start, k, mid0);
      setView(clampView({ k: z.k, x: z.x + mid.x - mid0.x, y: z.y + mid.y - mid0.y }));
    }
  };
  const onPointerEnd = (e: PointerEvent<SVGSVGElement>) => {
    if (!pointers.current.delete(e.pointerId)) return;
    if (pointers.current.size) return rebase();
    if (gesture.current?.moved) { dragged.current = true; setTimeout(() => { dragged.current = false; }, 0); }
    gesture.current = null;
  };

  const zoomBy = (f: number) => setView((v) => zoomAt(v, v.k * f, { x: W / 2, y: H / 2 }));
  const select = (code: string | null) => { if (!dragged.current) setPinned((p) => (p === code ? null : code)); };
  const hoverProps = (code: string) => ({
    onPointerEnter: (e: PointerEvent) => { if (e.pointerType === "mouse") setHovered(code); },
    onPointerLeave: (e: PointerEvent) => { if (e.pointerType === "mouse") setHovered(null); },
  });
  const onMarkerKey = (e: KeyboardEvent, code: string) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(code); }
  };

  // Country shapes only change when the highlighted country does — panning just moves their group
  const land = useMemo(() => AFRICA_SHAPES.map((s) => {
    const c = byIso.get(s.id);
    if (!c) return <path key={s.id} d={s.d} className={styles.country}><title>{s.name}</title></path>;
    return (
      <path key={s.id} d={s.d} className={styles.member} data-active={c.code === active || undefined}
        onClick={(e) => { e.stopPropagation(); select(c.code); }} {...hoverProps(c.code)} />
    );
  }), [byIso, active]);

  const showLabels = scale * view.k >= 0.55;
  const activeCountry = active ? byCode.get(active) : undefined;
  const [cardX, cardY] = activeCountry ? toPx(points.get(activeCountry.code)!) : [0, 0];
  const boxW = W * scale, boxH = H * scale;
  const cardStyle = { left: Math.min(Math.max(cardX, 80), boxW - 80), top: cardY } as CSSProperties;

  return (
    <div className={styles.explorer}>
      <div className={styles.mapCol}>
        <div className={styles.map} data-paused={paused || undefined}
          onKeyDown={(e) => { if (e.key === "Escape") { setPinned(null); setHovered(null); } }}>
          <svg ref={svgRef} className={styles.svg} viewBox={`0 0 ${W} ${H}`} role="group"
            aria-label="Carte de l'Afrique : pays du réseau Campus Builder"
            style={{ touchAction: view.k > 1 ? "none" : "pan-y" }}
            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}
            onClick={() => { if (!dragged.current) setPinned(null); }}
            onDoubleClick={(e) => setView((v) => zoomAt(v, v.k * 2, toMap(e.clientX, e.clientY)))}>
            <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>{land}</g>

            <g transform={`scale(${1 / scale})`}>
              {countries.map((c, i) => {
                const [x, y] = toPx(points.get(c.code)!);
                const [lx, ly, anchor] = LABEL_OFFSET[c.label ?? "right"];
                return (
                  <g key={c.code} className={styles.marker} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                    data-status={c.status} data-active={c.code === active || undefined}
                    style={{ "--delay": `${(i * 0.43).toFixed(2)}s` } as CSSProperties}
                    role="button" tabIndex={0} aria-pressed={pinned === c.code}
                    aria-label={`${c.name} — ${CAMPUS_STATUS_LABEL[c.status]}`}
                    onClick={(e) => { e.stopPropagation(); select(c.code); }} onKeyDown={(e) => onMarkerKey(e, c.code)}
                    onFocus={() => setHovered(c.code)} onBlur={() => setHovered(null)} {...hoverProps(c.code)}>
                    <circle r={20} className={styles.hit} />
                    <circle r={5} className={`${styles.ring} ${styles.halo}`} style={{ "--i": 0 } as CSSProperties} />
                    <circle r={5} className={styles.ring} style={{ "--i": 1 } as CSSProperties} />
                    <circle r={5} className={styles.ring} style={{ "--i": 2 } as CSSProperties} />
                    <circle r={5} className={styles.dot} />
                    {showLabels && <text x={lx} y={ly} textAnchor={anchor} className={styles.label}>{c.shortName ?? c.name}</text>}
                  </g>
                );
              })}
            </g>
          </svg>

          <div className={styles.controls}>
            <button type="button" onClick={() => zoomBy(1.6)} disabled={view.k >= MAX_K} aria-label="Zoomer">+</button>
            <button type="button" onClick={() => zoomBy(1 / 1.6)} disabled={view.k <= 1} aria-label="Dézoomer">−</button>
            <button type="button" onClick={() => setView({ k: 1, x: 0, y: 0 })} disabled={view.k === 1} aria-label="Recentrer sur l'Afrique" className={styles.reset}>⤢</button>
          </div>

          <div className={styles.cardSlot} aria-live="polite"
            data-place={cardY > boxH * 0.42 ? "above" : "below"} style={activeCountry ? cardStyle : undefined}>
            {activeCountry && (
              <p className={styles.card}>
                <b>{activeCountry.shortName ?? activeCountry.name}</b>
                <span><b className={styles.total}>{activeCountry.participants}</b> participant{activeCountry.participants > 1 ? "s" : ""}</span>
              </p>
            )}
          </div>
        </div>
        <p className={styles.help}>Glissez pour vous déplacer · pincez ou <kbd>Ctrl</kbd> + molette pour zoomer · double-clic pour agrandir.</p>
      </div>

      <aside className={styles.aside} aria-label="Pays participants">
        <ul role="list" className={styles.legend}>
          <li><span className={styles.legendDot} aria-hidden="true" /> Pays participant</li>
        </ul>
        <p className={styles.count}><b>{countries.length}</b> pays</p>
        <ul role="list" className={styles.list}>
          {countries.map((c) => (
            <li key={c.code}>
              <button type="button" aria-pressed={pinned === c.code} data-active={c.code === active || undefined}
                onClick={() => setPinned((p) => (p === c.code ? null : c.code))} {...hoverProps(c.code)}>
                <img src={`/flags/${c.code.toLowerCase()}.svg`} alt="" className={styles.flag} />
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
