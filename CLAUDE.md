# slash-o.xyz

Static Astro site for slash-o.xyz. English only, no client-side framework, no
third-party script.

The design is produced with `/impeccable:impeccable` — it owns
`.impeccable/design.json`, `src/styles/global.css` and the page markup. This
scaffold deliberately holds no aesthetic opinion so there is nothing to unwind.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | `astro check` — TypeScript and template typecheck |
| `npm run todo` | Lists every `TODO(content)` placeholder still in the source |

`npm run build` and `npm run check` are the entire quality gate; CI runs both on
every push and pull request (`.github/workflows/ci.yml`). There is no linter and
no test runner by design.

Node 22+ (`.nvmrc`), npm.

## How it fits together

- **`src/data/site.ts`** is the single source of truth for the canonical origin
  and the site's name, tagline and description. `astro.config.mjs` imports
  `SITE_URL` from it, so the domain is written once and the sitemap, canonical
  links and Open Graph tags all derive from that one value.
- **`src/layouts/Base.astro`** is the document shell. It owns everything that
  must be right on every URL — canonical link, social card tags, the stylesheet
  import — so a page supplies only `title`, `description` and its body. Pass
  `indexable={false}` to keep a page out of search results.
- **`src/styles/global.css`** is the only stylesheet. Tailwind v4 is wired as a
  Vite plugin (`@tailwindcss/vite`), not as an Astro integration —
  `@astrojs/tailwind` was for v3 and is deprecated. Design tokens go in the
  `@theme` block; Tailwind turns each custom property there into both a utility
  class and a CSS variable.
- **`trailingSlash: 'never'` and `build.format: 'file'`** only make sense
  together: `file` emits `about.html` rather than `about/index.html`, which is
  what lets URLs stay extensionless and slashless.
- **`build.inlineStylesheets: 'auto'`** is why the CSP in `public/_headers`
  needs `style-src 'unsafe-inline'`. Changing one means revisiting the other.

## Deployment — Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `NODE_VERSION=22` |

Deploys are driven by the Pages Git integration: every push to `main` builds and
goes live.

- **`public/_headers`** — security headers and the immutable cache policy for
  `/_astro/*`, which Astro fingerprints.
- **`functions/_middleware.js`** — a Pages Function that sends
  `X-Robots-Tag: noindex` and a `Disallow: /` robots.txt on any host that is not
  `slash-o.xyz` or `www.slash-o.xyz`. Without it, every `*.pages.dev` preview
  deployment competes with the real domain in search results. It cannot be done
  with a static file, because the decision depends on which host asked.

## Conventions

- Placeholders are marked `TODO(content)` so they are greppable; `isPlaceholder()`
  in `src/data/site.ts` lets a component hide a link that is still fake.
- Imports use the `@/*` alias for `src/*`.
- Commit messages are sentence-case prose, no Conventional Commits prefixes.
