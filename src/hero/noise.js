/**
 * CPU port of src/hero/field.glsl, used for the margin readout.
 *
 * Same hash, same value noise, same four-octave FBM, same domain warp, same
 * probe term. Every operation is rounded to float32 with Math.fround so the
 * JavaScript tracks what the GPU computes in highp float. No pixel readback.
 *
 * The constants below mirror the ones at the top of field.glsl. Keep them in
 * step by hand; there is deliberately no shared source, because the shader is
 * imported as a raw string and the page must never parse GLSL at runtime.
 */

const fr = Math.fround;

export const LEVELS = 9;
export const SCALE_TOP = 2.8;
export const SCALE_BOT = 1.7;
export const WARP = 1.6;
export const DRIFT_A = 0.03;
export const DRIFT_B = 0.022;
export const PROBE_AMP = 0.16;
export const PROBE_SIGMA = 0.11;

/** The isotherm axis the readout prints: -6° at f=0, 24° at f=1, +6° per zone. */
export const AXIS_MIN = -6;
export const AXIS_SPAN = 30;
export const AXIS_ZONE = 6;

const fract = (x) => fr(x - Math.floor(x));
const mix = (a, b, t) => fr(a + fr(fr(b - a) * t));
const smooth = (f) => fr(fr(f * f) * fr(3 - fr(2 * f)));

function hash21(x, y) {
  let px = fract(fr(x * 123.34));
  let py = fract(fr(y * 345.45));
  const d = fr(fr(px * fr(px + 34.345)) + fr(py * fr(py + 34.345)));
  px = fr(px + d);
  py = fr(py + d);
  return fract(fr(px * py));
}

function vnoise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const ux = smooth(fr(x - ix));
  const uy = smooth(fr(y - iy));
  const a = hash21(ix, iy);
  const b = hash21(ix + 1, iy);
  const c = hash21(ix, iy + 1);
  const d = hash21(ix + 1, iy + 1);
  return mix(mix(a, b, ux), mix(c, d, ux), uy);
}

function fbm(x, y) {
  let v = 0;
  let a = 0.5;
  for (let i = 0; i < 4; i++) {
    v = fr(v + fr(a * vnoise(x, y)));
    // p = ROT * p * 2.03 + (1.7, 9.2), with ROT = [0.8 0.6; -0.6 0.8] column-major
    const nx = fr(fr(fr(0.8 * x) + fr(-0.6 * y)) * 2.03);
    const ny = fr(fr(fr(0.6 * x) + fr(0.8 * y)) * 2.03);
    x = fr(nx + 1.7);
    y = fr(ny + 9.2);
    a = fr(a * 0.5);
  }
  return v;
}

function field(x, y, t) {
  const qx = fbm(fr(x + fr(t * DRIFT_A)), y);
  const qy = fbm(fr(x + 5.2), fr(fr(y + 1.3) - fr(t * DRIFT_B)));
  return fbm(fr(x + fr(WARP * qx)), fr(y + fr(WARP * qy)));
}

/**
 * The field value at plate uv (0..1, y up), exactly as the fragment shader
 * computes it for that pixel, including the probe lift.
 */
export function sampleField({ u, v, aspect, time, zone, seed, pointer, probe }) {
  const stx = fr(u * aspect);
  const sty = v;
  const scale = mix(SCALE_TOP, SCALE_BOT, zone);
  const px = fr(fr(stx * scale) + fr(seed * 7.31));
  const py = fr(fr(sty * scale) + fr(seed * 3.17));
  let f = field(px, py, time);
  if (probe > 0) {
    const dx = stx - fr(pointer[0] * aspect);
    const dy = sty - pointer[1];
    const d2 = dx * dx + dy * dy;
    f = fr(f + probe * PROBE_AMP * Math.exp(-d2 / (2 * PROBE_SIGMA * PROBE_SIGMA)));
  }
  return f;
}

/** Contour index under a field value, 1..LEVELS, as the shader's idx. */
export function contourIndex(f) {
  return Math.max(1, Math.min(LEVELS, Math.floor(f * LEVELS + 0.5)));
}

/** When contour `idx` begins to plot, in uPlot units; mirrors the shader. */
export function plotStart(idx) {
  const order = Math.min(1, idx / LEVELS);
  const major = idx % 3 === 0;
  return major ? order * 0.3 : 0.42 + order * 0.45;
}

/** How many of the contours 0..LEVELS have started plotting at progress p. */
export function contoursPlotted(p) {
  let n = 0;
  for (let i = 0; i <= LEVELS; i++) if (p > plotStart(i)) n++;
  return Math.min(LEVELS, n);
}

/** The isotherm axis reading for a field value at a zone. */
export function isotherm(f, zone) {
  return AXIS_MIN + AXIS_SPAN * f + AXIS_ZONE * zone;
}
