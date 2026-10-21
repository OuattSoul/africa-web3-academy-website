import styles from "./NetworkMotif.module.css";

// Sparse distributed-network motif echoing the connected Africa inside the logo.
// Decorative only. Deterministic coordinates so server and client render identically.
const NODES: [number, number][] = [
  [40, 70], [150, 30], [250, 95], [360, 45], [455, 120], [95, 190], [205, 215],
  [320, 185], [420, 255], [60, 320], [175, 345], [290, 300], [395, 370], [500, 330], [240, 420], [120, 450],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [2, 7], [3, 7], [4, 8], [5, 6], [6, 7], [7, 8],
  [5, 9], [6, 10], [7, 11], [8, 12], [8, 13], [9, 10], [10, 11], [11, 12], [12, 13], [10, 14], [11, 14], [14, 15], [9, 15],
];
const PULSE = new Set([2, 7, 11, 14]);

export function NetworkMotif({ className }: { className?: string }) {
  return (
    <svg className={`${styles.motif} ${className ?? ""}`} viewBox="0 0 540 480" fill="none" aria-hidden="true" focusable="false">
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} className={styles.edge} />
      ))}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          {PULSE.has(i) && <circle cx={x} cy={y} r={10} className={styles.pulse} style={{ animationDelay: `${i * 0.45}s` }} />}
          <circle cx={x} cy={y} r={PULSE.has(i) ? 4.5 : 3} className={PULSE.has(i) ? styles.hub : styles.node} />
        </g>
      ))}
    </svg>
  );
}
