// One-off generator: Natural Earth 1:50m (world-atlas) -> static SVG paths for Africa.
// The site does not depend on these packages; install them temporarily:
//   npm i --no-save world-atlas@2.0.2 topojson-client@3.1.0
//   node scripts/gen-africa-map.mjs src/content/geo/africa.ts
import fs from "node:fs";
import { feature } from "topojson-client";

const topo = JSON.parse(fs.readFileSync(new URL("../node_modules/world-atlas/countries-50m.json", import.meta.url), "utf8"));
const fc = feature(topo, topo.objects.countries);

// ISO 3166-1 numeric codes of African states + Western Sahara
const AFRICA = new Set([12, 24, 72, 108, 120, 132, 140, 148, 174, 178, 180, 204, 226, 231, 232, 262, 266, 270, 288, 324, 384, 404, 426, 430, 434, 450, 454, 466, 478, 480, 504, 508, 516, 562, 566, 624, 646, 678, 686, 690, 694, 706, 710, 716, 728, 729, 732, 748, 768, 788, 800, 818, 834, 854, 894]);
const byName = new Set(["Somaliland"]); // no ISO code in Natural Earth, merged into Somalia below

// Frame (degrees) and projection — mirrored by project() in the generated file
const LON_MIN = -26, LON_MAX = 58, LAT_MIN = -36, LAT_MAX = 38.5;
const W = 1000;
const rad = Math.PI / 180;
const my = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2));
const K = W / ((LON_MAX - LON_MIN) * rad);
const H = Math.round(K * (my(LAT_MAX) - my(LAT_MIN)));
const proj = ([lon, lat]) => [K * (lon - LON_MIN) * rad, K * (my(LAT_MAX) - my(lat))];

// Douglas-Peucker in projected pixels
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let max = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    for (let i = a + 1; i < b; i++) {
      const d = dx || dy ? Math.abs(dy * (pts[i][0] - ax) - dx * (pts[i][1] - ay)) / len : Math.hypot(pts[i][0] - ax, pts[i][1] - ay);
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

const f1 = (n) => Math.round(n * 10) / 10;
function ringPath(ring) {
  const pts = simplify(ring.map(proj), 0.25);
  if (pts.length < 3) return "";
  // tiny islands: drop when under ~1.5px across
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  if (Math.max(...xs) - Math.min(...xs) < 1.2 && Math.max(...ys) - Math.min(...ys) < 1.2) return "";
  let d = "", px = 0, py = 0;
  pts.forEach(([x, y], i) => {
    x = f1(x); y = f1(y);
    d += i === 0 ? `M${x} ${y}` : `l${f1(x - px)} ${f1(y - py)}`;
    px = x; py = y;
  });
  return d + "z";
}

const out = [];
for (const f of fc.features) {
  const id = Number(f.id);
  if (!AFRICA.has(id) && !byName.has(f.properties.name)) continue;
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys.flatMap((p) => p.map(ringPath)).join("");
  if (d) out.push({ id: f.id ?? f.properties.name, name: f.properties.name, d: d.replace(/l/g, " l").replace(/^ /, "") });
}
// Somaliland is drawn as part of Somalia (UN-recognised borders)
const sl = out.find((c) => c.name === "Somaliland"), so = out.find((c) => c.name === "Somalia");
so.d += " " + sl.d; out.splice(out.indexOf(sl), 1);
out.sort((a, b) => a.name.localeCompare(b.name));

const ts = `// Generated from Natural Earth 1:50m (public domain) via world-atlas@2.0.2 — do not edit by hand.
// Mercator projection (conformal: country shapes are preserved), framed on Africa.
// Regenerate with the same LON/LAT frame if you change it: project() below must match the paths.

export const GEO_FRAME = { lonMin: ${LON_MIN}, lonMax: ${LON_MAX}, latMin: ${LAT_MIN}, latMax: ${LAT_MAX} } as const;
export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};

const RAD = Math.PI / 180;
const K = MAP_WIDTH / ((GEO_FRAME.lonMax - GEO_FRAME.lonMin) * RAD);
const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2));

/** [lat, lon] in degrees -> [x, y] in map units (same projection as the paths below). */
export function project(lat: number, lon: number): [number, number] {
  return [K * (lon - GEO_FRAME.lonMin) * RAD, K * (mercY(GEO_FRAME.latMax) - mercY(lat))];
}

/** id = ISO 3166-1 numeric code; name = Natural Earth English name. */
export const AFRICA_SHAPES: { id: string; name: string; d: string }[] = [
${out.map((c) => `  { id: ${JSON.stringify(String(c.id))}, name: ${JSON.stringify(c.name)}, d: ${JSON.stringify(c.d)} },`).join("\n")}
];
`;
fs.writeFileSync(process.argv[2], ts);
console.log(out.length, "shapes", (ts.length / 1024).toFixed(1) + "KB", "H=" + H);
