/**
 * The hero field runtime. Loaded by src/components/Hero.astro only after the
 * page is idle and the hero is in view, and never under prefers-reduced-motion.
 *
 * One WebGL2 context, one program, one triangle. Everything the field does is a
 * uniform. No textures, no loaders, no readback: the margin readout samples the
 * same noise on the CPU (noise.js).
 *
 * Tuning parameters are the constants at the top; the README lists them.
 */
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import fragment from './field.glsl?raw';
import vertex from './field.vert.glsl?raw';
import { sampleField, contourIndex, contoursPlotted, isotherm } from './noise.js';

const MAX_DPR = 1.5;          // device pixel ratio cap
const MAX_AREA = 3.2e6;       // device pixels the field may cover; DPR drops above it
const MAX_FPS = 40;           // the field drifts slowly; 60 buys heat
const PLOT_MS = 1800;         // plot-in duration
const POINTER_EASE = 0.04;    // per frame at MAX_FPS: weather, not a UI control
const ZONE_EASE = 0.1;        // per frame at MAX_FPS: a fling eases in over ~0.3s instead of jumping the zoom
const READOUT_EASE = 0.3;     // per frame at MAX_FPS: the isotherm glides to its value in ~0.2s rather than stepping

const hexToRgb = (hex) => {
  const n = parseInt(hex.trim().slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export function initHero({ host, field, copy, readout }) {
  const canvas = document.createElement('canvas');
  const renderer = new Renderer({ canvas, dpr: 1, alpha: false, depth: false, antialias: false, webgl: 2 });
  if (!renderer.isWebgl2) return null; // the CSS field stands in
  const gl = renderer.gl;

  const css = getComputedStyle(document.documentElement);
  const color = (name) => hexToRgb(css.getPropertyValue(name));

  const seed = Math.random();
  const uniforms = {
    uRes: { value: [1, 1] },
    uTime: { value: 0 },
    uPointer: { value: [0.5, 0.5] },
    uProbe: { value: 0 },
    uZone: { value: 0 },
    uPlot: { value: 0 },
    uSeed: { value: seed },
    uQuiet: { value: [0, 0, 0, 0] },
    uPaper: { value: color('--linen') },
    uMinor: { value: color('--lichen') },
    uCool: { value: color('--altitude') },
    uWarm: { value: color('--oxide') },
  };

  const program = new Program(gl, { vertex, fragment, uniforms, depthTest: false, depthWrite: false });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  field.appendChild(canvas);
  host.classList.add('is-live');

  // ---- size ----
  let aspect = 1;
  function resize() {
    const w = field.clientWidth;
    const h = field.clientHeight;
    if (!w || !h) return;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    if (w * h * dpr * dpr > MAX_AREA) dpr = Math.sqrt(MAX_AREA / (w * h));
    renderer.dpr = dpr;
    renderer.setSize(w, h);
    uniforms.uRes.value = [w * dpr, h * dpr];
    aspect = w / h;
    quietRect();
  }
  function quietRect() {
    const f = field.getBoundingClientRect();
    const c = copy.getBoundingClientRect();
    if (!f.width || !f.height) return;
    uniforms.uQuiet.value = [
      (c.left - f.left) / f.width,
      1 - (c.bottom - f.top) / f.height,
      (c.right - f.left) / f.width,
      1 - (c.top - f.top) / f.height,
    ];
  }
  new ResizeObserver(resize).observe(field);
  // The copy reflows when the webfont lands or wraps differently; the
  // cartouche follows it.
  new ResizeObserver(quietRect).observe(copy);
  if (document.fonts?.ready) document.fonts.ready.then(quietRect);
  resize();

  // ---- probe ----
  const finePointer = matchMedia('(pointer: fine)').matches;
  const target = { x: 0.5, y: 0.5, probe: 0 };
  const eased = { x: 0.5, y: 0.5, probe: 0 };
  if (finePointer) {
    window.addEventListener(
      'pointermove',
      (e) => {
        const r = field.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height;
        target.probe = 1;
      },
      { passive: true },
    );
    document.addEventListener('pointerleave', () => (target.probe = 0));
  }

  // ---- descent ----
  // Scroll sets the target; the frame loop eases toward it. A touch fling
  // crosses the hero in a few frames, and an unsmoothed zone turns that into a
  // zoom that lurches tens of pixels per frame.
  let zoneTarget = 0;
  function onScroll() {
    const h = host.offsetHeight || 1;
    zoneTarget = Math.min(1, Math.max(0, window.scrollY / h));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  let zone = zoneTarget;

  // ---- readout ----
  const out = {
    t: readout.querySelector('[data-r="t"]'),
    n: readout.querySelector('[data-r="n"]'),
    z: readout.querySelector('[data-r="z"]'),
    x: readout.querySelector('[data-r="x"]'),
    y: readout.querySelector('[data-r="y"]'),
  };
  // The field is sampled every frame and the isotherm shown eases toward it,
  // so the figure runs through its values instead of jumping between them.
  // Text is written only when the printed value changes. Zone and probe are
  // already eased upstream; the contour count stays a count.
  let shownT = null;
  const printed = {};
  const write = (key, text) => {
    if (out[key] && printed[key] !== text) out[key].textContent = printed[key] = text;
  };
  const dec3 = (v) => v.toFixed(3).replace(/^0/, '');
  function updateReadout(time, plot) {
    const f = sampleField({
      u: eased.x,
      v: eased.y,
      aspect,
      time,
      zone,
      seed,
      pointer: [eased.x, eased.y],
      probe: eased.probe,
    });
    const n = plot < 1 ? contoursPlotted(plot) : contourIndex(f);
    const t = isotherm(f, zone);
    shownT = shownT === null ? t : shownT + (t - shownT) * READOUT_EASE;
    write('t', shownT.toFixed(1));
    write('n', String(n));
    write('z', zone.toFixed(2));
    write('x', dec3(eased.x));
    write('y', dec3(eased.y));
  }

  // ---- loop ----
  const minFrame = 1000 / MAX_FPS;
  let running = false;
  let raf = 0;
  let last = 0;
  let started = 0;
  let elapsed = 0;
  let cut = false;

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    if (now - last < minFrame) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    elapsed += dt;
    if (!started) started = now;
    const plot = Math.min(1, (now - started) / PLOT_MS);

    eased.x += (target.x - eased.x) * POINTER_EASE;
    eased.y += (target.y - eased.y) * POINTER_EASE;
    eased.probe += (target.probe - eased.probe) * POINTER_EASE;
    zone += (zoneTarget - zone) * ZONE_EASE;
    if (Math.abs(zoneTarget - zone) < 1e-4) zone = zoneTarget;

    uniforms.uTime.value = elapsed;
    uniforms.uPointer.value = [eased.x, eased.y];
    uniforms.uProbe.value = eased.probe;
    uniforms.uZone.value = zone;
    uniforms.uPlot.value = plot;

    renderer.render({ scene: mesh });
    updateReadout(elapsed, plot);
    // Once the last contour lands, the mark's slash is cut (global.css).
    if (plot === 1 && !cut) {
      cut = true;
      document.documentElement.classList.replace('mark-pending', 'mark-cut');
    }
  }

  let inView = true;
  function start() {
    if (running || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new IntersectionObserver(
    ([e]) => {
      inView = e.isIntersecting;
      inView ? start() : stop();
      // Scrolled away before the plot finished: cut the slash now rather than
      // leave the header without it.
      if (!inView && !cut) {
        cut = true;
        document.documentElement.classList.replace('mark-pending', 'mark-cut');
      }
    },
    { threshold: 0 },
  ).observe(host);

  start();
  return { stop, start };
}
