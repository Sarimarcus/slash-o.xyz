// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './src/data/site.ts';
import provenance from './src/integrations/provenance.mjs';

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
    // The single stylesheet is small enough to inline, which saves the one
    // round trip that would otherwise sit between HTML and first paint. This is
    // why the CSP in public/_headers needs style-src 'unsafe-inline'.
    inlineStylesheets: 'always',
  },

  compressHTML: true,

  // provenance fills the colophon's commit and page-weight tokens after build.
  integrations: [sitemap(), provenance()],
});
