/**
 * The four owned sites, with sitemap counts fetched at build time.
 *
 * `astro build` runs this on the build machine, so the margin of the sites band
 * reports what each sitemap said on the day the page was built. If a fetch
 * fails (offline build, a site down), the recorded fallback is used and marked
 * with its own date, so the page never shows a number nobody measured.
 */
import snapshot from './analytics.json';

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
  {
    domain: 'cadizexperience.com',
    url: 'https://www.cadizexperience.com',
    what: 'Cádiz, in English, for people who are actually going',
    fallback: { urls: 246, lastmod: '2026-11-04' },
  },
];

/**
 * Traffic, from the snapshot `npm run analytics` copies out of the content
 * factory's analytics dashboard (see the script for what each number counts).
 * Not fetched at build, so every figure carries the end date of its window.
 */
interface Snapshot {
  sites: Record<
    string,
    {
      visits?: number;
      aiReferrals?: number;
      impressions?: number;
      clicks?: number;
      /** [date, visits, aiReferrals], one row per day of the GA4 window. */
      daily?: [string, number, number][];
      ga4?: { from: string; to: string };
      gsc?: { from: string; to: string };
    }
  >;
}

// JSON imports widen tuples to arrays; the script writes this file, so assert its shape once.
const SNAPSHOT = snapshot as unknown as Snapshot;

export interface TrafficLine {
  value: number;
  key: 'visits' | 'impressions' | 'clicks' | 'aiReferrals';
}

export interface TrafficGroup {
  /** Days in the window, counted from its own dates. */
  days: number;
  to: string;
  lines: TrafficLine[];
}

/** Lines grouped by the window they measure, usually one group. */
export function trafficFor(domain: string): TrafficGroup[] {
  const s = SNAPSHOT.sites[domain];
  if (!s) return [];
  const groups = new Map<string, TrafficGroup>();
  const add = (w: { from: string; to: string } | undefined, key: TrafficLine['key'], value?: number) => {
    if (!w || typeof value !== 'number') return;
    const id = `${w.from}/${w.to}`;
    const days = Math.round((Date.parse(w.to) - Date.parse(w.from)) / 86_400_000) + 1;
    const g = groups.get(id) ?? { days, to: w.to, lines: [] };
    g.lines.push({ key, value });
    groups.set(id, g);
  };
  add(s.ga4, 'visits', s.visits);
  add(s.gsc, 'impressions', s.impressions);
  add(s.gsc, 'clicks', s.clicks);
  add(s.ga4, 'aiReferrals', s.aiReferrals);
  return [...groups.values()].sort((a, b) => b.to.localeCompare(a.to));
}

export interface TrafficDay {
  date: string;
  visits: number;
  ai: number;
}

/** The GA4 window day by day, or null when the snapshot has none for the site. */
export function dailyFor(domain: string): { from: string; to: string; days: TrafficDay[] } | null {
  const s = SNAPSHOT.sites[domain];
  if (!s?.ga4 || !s.daily?.length) return null;
  return {
    from: s.ga4.from,
    to: s.ga4.to,
    days: s.daily.map(([date, visits, ai]) => ({ date, visits, ai })),
  };
}

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
