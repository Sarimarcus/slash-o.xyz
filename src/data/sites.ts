/**
 * The three owned sites, with sitemap counts fetched at build time.
 *
 * `astro build` runs this on the build machine, so the margin of the sites band
 * reports what each sitemap said on the day the page was built. If a fetch
 * fails (offline build, a site down), the recorded fallback is used and marked
 * with its own date, so the page never shows a number nobody measured.
 */

export interface OwnedSite {
  domain: string;
  url: string;
  what: string;
  /** Fallback, recorded when a build could not fetch the live sitemap. */
  fallback: { urls: number; lastmod: string };
}

export const OWNED_SITES: OwnedSite[] = [
  {
    domain: 'explorecordoba.com',
    url: 'https://www.explorecordoba.com',
    what: 'Córdoba, in English, for people who are actually going',
    fallback: { urls: 573, lastmod: '2026-09-16' },
  },
  {
    domain: 'exploregranada.org',
    url: 'https://www.exploregranada.org',
    what: 'Granada and the Alhambra, the same way',
    fallback: { urls: 519, lastmod: '2026-09-16' },
  },
  {
    domain: 'darkskiesatlas.com',
    url: 'https://www.darkskiesatlas.com',
    what: 'Where the sky is still dark, and how to get there',
    fallback: { urls: 638, lastmod: '2026-09-16' },
  },
];

export interface SiteReading {
  urls: number;
  lastmod: string;
  live: boolean;
}

const TIMEOUT_MS = 8000;

async function text(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

/** Reads sitemap-index.xml, then every child sitemap, and counts <loc> entries. */
export async function readSitemap(site: OwnedSite): Promise<SiteReading> {
  try {
    const index = await text(`${site.url}/sitemap-index.xml`);
    if (!index.includes('<sitemapindex')) throw new Error('not a sitemap index');
    const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, 20);
    const lastmods = [...index.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    const newest = lastmods.sort().at(-1);
    if (!newest) throw new Error('no lastmod');
    const lastmod = newest.slice(0, 10);
    let urls = 0;
    for (const child of children) {
      const xml = await text(child);
      urls += (xml.match(/<loc>/g) ?? []).length;
    }
    if (urls === 0) throw new Error('empty sitemap');
    return { urls, lastmod, live: true };
  } catch {
    return { ...site.fallback, live: false };
  }
}
