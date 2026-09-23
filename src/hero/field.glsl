#version 300 es
precision highp float;
// The hash needs 32-bit integers. Fragment ints default to mediump, which
// Mali runs at 16 bits: the hash overflows and the whole field goes flat.
precision highp int;

// The hero field: domain-warped value-noise FBM drawn as isolines, an isotherm
// chart being plotted. Everything the page does to it arrives as a uniform.
//
// The noise functions here are ported line for line in src/hero/noise.js so
// the margin readout can sample the same field on the CPU. Change one, change
// the other, and keep the constants in both in step.

uniform vec2  uRes;      // canvas size in device pixels
uniform float uTime;     // seconds since init
uniform vec2  uPointer;  // eased probe position, plate uv (0..1, y up)
uniform float uProbe;    // probe strength 0..1 (0 on touch, before first move)
uniform float uZone;     // 0 at the top of the descent, 1 at the bottom
uniform float uPlot;     // plot-in progress 0..1 over ~1.8s
uniform float uSeed;     // per-load offset, so two loads never match
uniform vec4  uQuiet;    // uv rect (x0, y0, x1, y1) under the copy, lines dimmed
uniform vec3  uPaper;    // linen
uniform vec3  uMinor;    // lichen: the minor contours
uniform vec3  uCool;     // altitude blue: the major contours at the top
uniform vec3  uWarm;     // oxide: the major contours at the bottom

out vec4 fragColor;

// ---- constants shared with noise.js ----
const float LEVELS      = 9.0;   // isolines across the field's range
const float SCALE_TOP   = 2.8;   // field units per plate height at uZone 0 (tighter)
const float SCALE_BOT   = 1.7;   // at uZone 1 (looser)
const float WARP        = 1.6;   // domain-warp amplitude
const float DRIFT_A     = 0.030; // warp drift speeds, per second
const float DRIFT_B     = 0.022;
const float PROBE_AMP   = 0.16;  // how far the probe lifts the field
const float PROBE_SIGMA = 0.11;  // probe radius in plate heights
const mat2  ROT         = mat2(0.8, 0.6, -0.6, 0.8);

// An integer hash. The float hash it replaces kept only the fraction of a
// large product, so a compiler that reassociated the arithmetic (Mali does)
// gave neighbouring cells different values for the corner they share, and the
// contours broke into shards. Integer multiplication wraps exactly on every
// GPU. The offset keeps negative lattice coordinates out of the uint cast.
float hash21(vec2 p) {
  uvec2 q = uvec2(ivec2(p) + 32768) * uvec2(1597334673u, 3812015801u);
  uint n = (q.x ^ q.y) * 1597334673u;
  return float(n) * (1.0 / 4294967296.0);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = ROT * p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

float field(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(t * DRIFT_A, 0.0)),
    fbm(p + vec2(5.2, 1.3) - vec2(0.0, t * DRIFT_B))
  );
  return fbm(p + WARP * q);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 st = vec2(uv.x * aspect, uv.y);

  float scale = mix(SCALE_TOP, SCALE_BOT, uZone);
  vec2 p = st * scale + vec2(uSeed * 7.31, uSeed * 3.17);
  float f = field(p, uTime);

  // The probe: a radial lift added before the isolines are computed, so the
  // contours bend around the cursor the way isobars bend around an anomaly.
  vec2 pp = vec2(uPointer.x * aspect, uPointer.y);
  float d = length(st - pp);
  f += uProbe * PROBE_AMP * exp(-d * d / (2.0 * PROBE_SIGMA * PROBE_SIGMA));

  // Isolines with screen-space anti-aliasing.
  float v = f * LEVELS;
  float w = max(fwidth(v), 1e-4);
  float k = fract(v);
  float distPx = min(k, 1.0 - k) / w;
  float idx = floor(v + 0.5);
  float major = 1.0 - min(mod(idx, 3.0), 1.0);       // 1 on every third contour
  float widthPx = mix(0.9, 1.5, major);
  float line = 1.0 - smoothstep(widthPx - 0.6, widthPx + 0.6, distPx);

  // Plot-in: each contour starts at its own time, majors first, and is swept in
  // from left to right like a pen. After uPlot reaches 1 this is a no-op.
  float order = clamp(idx / LEVELS, 0.0, 1.0);
  float start = mix(0.42 + order * 0.45, order * 0.30, major);
  float prog = clamp((uPlot - start) / 0.28, 0.0, 1.0) * 1.12;
  line *= 1.0 - smoothstep(prog - 0.06, prog + 0.06, uv.x);

  // The cartouche: lines are quieter under the copy, as an engraver clears the
  // ground under a label.
  vec2 qa = smoothstep(uQuiet.xy - 0.03, uQuiet.xy + 0.03, uv);
  vec2 qb = 1.0 - smoothstep(uQuiet.zw - 0.03, uQuiet.zw + 0.03, uv);
  float quiet = qa.x * qa.y * qb.x * qb.y;
  line *= mix(1.0, 0.3, quiet);

  // Colour: majors run from altitude blue at the summit to oxide at the base,
  // within the plate (uv.y) and along the descent (uZone), nudged by the field
  // itself; minors stay lichen.
  float warmth = (1.0 - uv.y) * 0.55 + uZone * 0.45 + (f - 0.5) * 0.3;
  vec3 pole = mix(uCool, uWarm, clamp(warmth, 0.0, 1.0));
  vec3 lineCol = mix(uMinor, pole, major);
  float alpha = mix(0.55, 0.92, major);

  // The paper: a very slight tonal band between contours, then the lines.
  vec3 paper = uPaper * (1.0 - 0.035 * (f - 0.5));
  vec3 col = mix(paper, lineCol, line * alpha);

  // Grain biased toward the linen, so it reads as paper tooth, not video noise.
  // Fixed per pixel: paper tooth does not move, and re-rolled every frame it
  // shimmers once a phone upscales the DPR-capped canvas.
  float g = hash21(gl_FragCoord.xy) - 0.5;
  col = mix(col, uPaper, g * 0.10);

  fragColor = vec4(col, 1.0);
}
