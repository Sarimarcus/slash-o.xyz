// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE_URL } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  // Read from src/data/site.ts so the canonical origin is declared in exactly
  // one place. `site` is what makes absolute URLs and the sitemap possible.
  site: SITE_URL,

  // Static output, no adapter: Cloudflare Pages serves dist/ directly and
  // nothing on this site needs a server at request time. The one piece of
  // per-request logic lives in functions/_middleware.js, which Pages runs.
  output: 'static',

  // 'file' emits about.html rather than about/index.html, which is what lets
  // 'never' hold — the two settings only make sense together.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Small stylesheets go inline to save a round trip; large ones stay
    // external. Note this is why the CSP in public/_headers needs
    // style-src 'unsafe-inline'.
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  integrations: [sitemap()],

  vite: {
    // Tailwind v4 is a Vite plugin, not an Astro integration — @astrojs/tailwind
    // was for v3 and is deprecated.
    plugins: [tailwindcss()],
  },
});
