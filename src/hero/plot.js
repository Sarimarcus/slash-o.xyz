/**
 * A static plot of the hero field at rest, drawn at build time as SVG.
 *
 * This is what reduced-motion, no-JavaScript and no-WebGL2 visitors see in
 * place of the live canvas. It samples the same field as the shader (noise.js,
 * seed 0, zone 0, time 0, 16:9 plate) and traces the same isolines with
 * marching squares, so the margin's "values recorded at build" describe the
 * picture beside them. Served by src/pages/field-rest.svg.ts.
 */
import { sampleField, LEVELS } from './noise.js';

/** Sample a cols×rows grid of field values across the plate. */
function sampleGrid({ cols, rows, aspect, seed }) {
  const grid = new Float32Array((cols + 1) * (rows + 1));
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      const u = i / cols;
      const v = 1 - j / rows; // SVG y runs down, the plate's v runs up
      grid[j * (cols + 1) + i] = sampleField({ u, v, aspect, time: 0, zone: 0, seed, pointer: [0.5, 0.5], probe: 0 });
    }
  }
  return grid;
}

/**
 * Marching squares for one iso value. Returns a list of segments
 * [[x0,y0],[x1,y1]] in grid units.
 */
function isolineSegments(grid, cols, rows, iso) {
  const at = (i, j) => grid[j * (cols + 1) + i];
  const lerp = (a, b) => (iso - a) / (b - a || 1e-9);
  const segs = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const tl = at(i, j), tr = at(i + 1, j), br = at(i + 1, j + 1), bl = at(i, j + 1);
      const code = (tl >= iso ? 8 : 0) | (tr >= iso ? 4 : 0) | (br >= iso ? 2 : 0) | (bl >= iso ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const top = [i + lerp(tl, tr), j];
      const right = [i + 1, j + lerp(tr, br)];
      const bottom = [i + lerp(bl, br), j + 1];
      const left = [i, j + lerp(tl, bl)];
      const push = (a, b) => segs.push([a, b]);
      switch (code) {
        case 1: case 14: push(left, bottom); break;
        case 2: case 13: push(bottom, right); break;
        case 3: case 12: push(left, right); break;
        case 4: case 11: push(top, right); break;
        case 5: {
          // saddle: decide by the cell's centre value
          const c = (tl + tr + br + bl) / 4;
          if (c >= iso) { push(left, top); push(bottom, right); } else { push(left, bottom); push(top, right); }
          break;
        }
        case 6: case 9: push(top, bottom); break;
        case 7: case 8: push(left, top); break;
        case 10: {
          const c = (tl + tr + br + bl) / 4;
          if (c >= iso) { push(top, right); push(left, bottom); } else { push(left, top); push(bottom, right); }
          break;
        }
      }
    }
  }
  return segs;
}

/** Stitch segments into polylines so the path is short and the strokes join. */
function stitch(segs) {
  const key = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
  const ends = new Map();
  const add = (k, idx) => { const l = ends.get(k); if (l) l.push(idx); else ends.set(k, [idx]); };
  segs.forEach((s, i) => { add(key(s[0]), i); add(key(s[1]), i); });
  const used = new Uint8Array(segs.length);
  const lines = [];
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = 1;
    const line = [segs[i][0], segs[i][1]];
    for (const dir of [1, -1]) {
      for (;;) {
        const tip = dir === 1 ? line[line.length - 1] : line[0];
        const next = (ends.get(key(tip)) || []).find((n) => !used[n]);
        if (next === undefined) break;
        used[next] = 1;
        const [a, b] = segs[next];
        const other = key(a) === key(tip) ? b : a;
        if (dir === 1) line.push(other); else line.unshift(other);
      }
    }
    lines.push(line);
  }
  return lines;
}

/**
 * @param {object} opts
 * @param {number} [opts.width]
 * @param {number} [opts.height]
 * @param {number} [opts.cols]
 * @param {number} [opts.rows]
 * @param {number} [opts.seed]
 * @param {{ paper: string, minor: string, cool: string, warm: string }} opts.colors
 */
export function fieldRestSvg({ width = 1600, height = 900, cols = 200, rows = 112, seed = 0, colors }) {
  const aspect = width / height;
  const grid = sampleGrid({ cols, rows, aspect, seed });
  const sx = width / cols;
  const sy = height / rows;
  const fmt = (n) => (Math.round(n * 10) / 10).toString();
  const toPath = (lines) =>
    lines
      .map((l) => 'M' + l.map((p, i) => `${i ? 'L' : ''}${fmt(p[0] * sx)} ${fmt(p[1] * sy)}`).join(''))
      .join('');

  const minor = [];
  const major = [];
  for (let k = 1; k < LEVELS; k++) {
    const lines = stitch(isolineSegments(grid, cols, rows, k / LEVELS));
    (k % 3 === 0 ? major : minor).push(...lines);
  }

  const { paper, minor: cMinor, cool, warm } = colors;
  // Majors run cool at the summit to warm at the base, as the live field does.
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="The field at rest: the isolines of the same noise the live hero plots, recorded at build">` +
    `<defs><linearGradient id="pole" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cool}"/><stop offset="1" stop-color="${warm}"/></linearGradient></defs>` +
    `<rect width="${width}" height="${height}" fill="${paper}"/>` +
    `<path d="${toPath(minor)}" fill="none" stroke="${cMinor}" stroke-opacity="0.55" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"/>` +
    `<path d="${toPath(major)}" fill="none" stroke="url(#pole)" stroke-opacity="0.92" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>` +
    `</svg>`
  );
}
