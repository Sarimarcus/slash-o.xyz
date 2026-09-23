# slash-o.xyz

One-page site for Slash O (`/O`), Olivier's advisory CTO practice for digital media
groups. Astro 7, static output, plain CSS, vanilla JS, one WebGL2 quad for the hero
field via OGL. Deployed on Cloudflare Pages from `main`.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/
npm run check        # astro check
npm run todo         # lists every TODO(content) placeholder
npm run refresh:factory   # re-counts the content factory into src/data/factory.ts
```

Node 22+ (`.nvmrc`).

## Placeholders

Everything still fake is marked `TODO(content)` and listed by `npm run todo`.
Components hide a fake value rather than print it (`isPlaceholder()` in
`src/data/site.ts`).

| Where | What | Effect while a placeholder |
| --- | --- | --- |
| `src/data/site.ts` → `PERSON.surname` | Surname | Only the first name is shown |
| `src/data/site.ts` → `PERSON.email` | Contact address | Production prints "Email address to follow" (CONTACT.emailPending); "Book a call" points to `#contact` |
| `src/data/site.ts` → `PERSON.calendar` | Booking URL | The calendar line is hidden; the button falls back to `mailto:` |
| `src/data/copy.ts` → `READINGS.items` | Four measured cases from the owned sites | The whole band and its nav entry are hidden in production; visible in `npm run dev` with placeholders outlined |

## Where things live

- `src/data/copy.ts`: every word on the page.
- `src/data/site.ts`: identity, person, canonical origin.
- `src/data/factory.ts`: counts from the content factory, with the date they were
  measured. Never edit by hand; run `npm run refresh:factory` with
  `FACTORY_DIR` pointing at a checkout of `content-sites-factory`.
- `src/data/sites.ts`: the three owned sites. Sitemap URL counts and last-modified
  dates are fetched at build time; if a fetch fails the recorded fallback is used
  and the number is not marked live (blue) in the margin.
- `src/integrations/provenance.mjs`: fills the colophon after build with the commit
  SHA and the kilobytes a first visit transfers before the hero script (gzipped
  HTML, gzipped CSS, both font files).
- `src/hero/`: the field. `field.glsl` (fragment), `field.vert.glsl`, `noise.js`
  (CPU port for the readout), `hero.js` (runtime), `plot.js` (build-time SVG of the
  field at rest for the fallback).
- `public/fonts/`: Source Serif 4 variable, subset to Latin with the weight axis
  restricted to 400–600 (roman) and pinned at 400 (italic), optical-size axis kept.
  Rebuilt from `@fontsource-variable/source-serif-4` with fonttools:

  ```bash
  uvx --from fonttools --with brotli fonttools varLib.instancer \
    node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2 \
    wght=400:600 opsz=8:60 -o /tmp/n.woff2
  uvx --from fonttools --with brotli pyftsubset /tmp/n.woff2 --flavor=woff2 \
    --output-file=public/fonts/source-serif-4-opsz-normal.woff2 \
    --unicodes="U+0020-007E,U+00A0-00FF,U+2000-2027,U+2030-2033,U+2039-203A,U+20AC,U+2122,U+2212" \
    --layout-features="kern,liga,calt,ccmp,locl,tnum,lnum,pnum,onum,frac,case,sups,subs,zero" \
    --no-hinting --desubroutinize
  ```

## The hero field

A single fullscreen triangle with one fragment shader. Domain-warped four-octave
value-noise FBM drawn as nine isolines; every third contour is a major. Everything
the page does to it is a uniform: no meshes, no textures, no loaders, no readback.

Behaviour:

- **Probe.** The pointer position is eased (factor 0.04 per frame at 40fps) and adds
  a radial lift to the field before the isolines are computed, so contours bend
  around the cursor and relax behind it. Touch devices get no probe; the readout
  reports the plate centre.
- **Readout.** `noise.js` is a float32-faithful port of the shader's noise. It
  samples the field at the eased probe ten times a second and prints the isotherm
  value, contour index, zone and probe position in the margin.
- **Descent.** `uZone` follows scroll through the hero, eased per frame so a touch
  fling does not jolt the zoom: contours are tighter and cooler at the top, looser
  and warmer at the bottom.
- **Plot-in.** Over 1.8s each contour starts at its own time, majors first, and is
  swept in left to right. The margin counts `n 1 / 9` up as they land. The only
  orchestrated motion on the page.
- **Grain.** The dither is biased toward the linen colour and fixed per pixel, so it
  reads as paper tooth rather than video noise.
- **Cartouche.** Lines are dimmed to 30% under the headline block; the rectangle is
  measured from the DOM and passed as `uQuiet`.

Loading and budget: the chunk is fetched after `requestIdleCallback` *and* the
hero intersecting the viewport. The h1 is the LCP element. DPR is capped at 1.5
and lowered further if the canvas would exceed 3.2 M device pixels. Frames are
capped at 40fps and stop on tab hide and when the hero scrolls out.
`prefers-reduced-motion` never initialises the canvas. In its place, and for
JavaScript-disabled or WebGL2-less visitors, `/field-rest.svg` stands in: the same
field at rest (seed 0, zone 0, 16:9), traced at build time with marching squares in
`src/hero/plot.js` and served by `src/pages/field-rest.svg.ts`, so the margin's
"values recorded at build" describe the picture beside them. Live visitors are
marked before first paint and never download it (about 18 KB gzipped).

### Tuning

| Parameter | Where | Default | Effect |
| --- | --- | --- | --- |
| `LEVELS` | `field.glsl`, `noise.js` | 9 | Number of isolines across the field's range (the static plot follows) |
| warmth | `field.glsl` | 0.55 / 0.45 / 0.3 | How much plate height, scroll zone and field value each pull the majors from altitude blue toward oxide |
| `cols`, `rows` | `field-rest.svg.ts` | 200 × 112 | Sampling grid of the static plot; finer is smoother and heavier |
| `SCALE_TOP`, `SCALE_BOT` | both | 2.8, 1.7 | Field units per plate height at zone 0 and 1; higher is tighter |
| `WARP` | both | 1.6 | Domain-warp amplitude; higher is more turbulent |
| `DRIFT_A`, `DRIFT_B` | both | 0.030, 0.022 | Drift speeds of the two warp fields, per second |
| `PROBE_AMP`, `PROBE_SIGMA` | both | 0.16, 0.11 | How far the probe lifts the field and over what radius (plate heights) |
| major/minor width | `field.glsl` | 1.5 px, 0.9 px | Line widths |
| major/minor alpha | `field.glsl` | 0.92, 0.55 | Line strength against the paper |
| grain | `field.glsl` | 0.10 | Dither amplitude toward linen |
| quiet | `field.glsl` | 0.3 | Line strength under the copy |
| `AXIS_MIN`, `AXIS_SPAN`, `AXIS_ZONE` | `noise.js` | −6, 30, 6 | The isotherm axis the readout prints |
| `MAX_DPR`, `MAX_AREA`, `MAX_FPS` | `hero.js` | 1.5, 3.2e6, 40 | Resolution and frame-rate ceilings |
| `PLOT_MS` | `hero.js` | 1800 | Plot-in duration |
| `POINTER_EASE` | `hero.js` | 0.04 | Probe lag; lower is more sluggish |
| `ZONE_EASE` | `hero.js` | 0.1 | Per-frame easing of the zone toward scroll |

Constants marked "both" exist in `field.glsl` and `noise.js` and must be changed
together, or the readout stops describing the picture.

## Design process

`PRODUCT.md` holds the product truth; the direction contract is in
`.impeccable/surfaces/src-pages-index-astro.md`. The impeccable design detector
runs on every UI edit (`/impeccable hooks status`), and `audit`, `critique` and
`polish` run once each before shipping. `DESIGN.md` is written from the shipped
CSS after the finish review, not before the build.

## Deployment

Cloudflare Pages, build command `npm run build`, output `dist`, `NODE_VERSION=22`.
`public/_headers` carries the CSP; `functions/_middleware.js` keeps preview hosts
out of search results.
