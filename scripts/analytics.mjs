#!/usr/bin/env node
/**
 * Snapshots the owned sites' traffic into src/data/analytics.json.
 *
 *   npm run analytics            write the snapshot into this checkout
 *   npm run analytics -- --push  write it in a throwaway worktree on
 *                                origin/main, commit, push (for cron); this
 *                                checkout, its branch and its unpushed work
 *                                are never touched
 *
 * Source: the content factory's analytics dashboard data
 * (content-sites-factory/apps/gsc-dashboard/public/data), which the factory
 * rebuilds every morning from Search Console and GA4. This script never calls
 * Google and needs no credentials. Set CONTENT_FACTORY_DIR if the factory is
 * not a sibling of this repo.
 *
 * Window: the 28 days ending the day before the dashboard's `provisionalFrom`,
 * so every Search Console day in it is final. Summed from the daily series:
 *
 *   - visits       GA4 sessions (consent-filtered, so an undercount)
 *   - aiReferrals  GA4 sessions in the "AI Assistant" channel
 *   - impressions  GSC web search impressions
 *   - clicks       GSC web search clicks
 *
 * A source prints only when its data covers every day of the window, so a new
 * site shows nothing rather than a few days under a 28-day label. A source
 * missing today keeps its previous, dated figures for MAX_AGE_DAYS, then drops.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const REL_OUT = 'src/data/analytics.json';
const SITES_TS = join(ROOT, 'src/data/sites.ts');
const FACTORY = resolve(process.env.CONTENT_FACTORY_DIR ?? join(ROOT, '../content-sites-factory'));
const DATA = join(FACTORY, 'apps/gsc-dashboard/public/data');
const AI_CHANNEL = 'AI Assistant';
const WINDOW_DAYS = 28;
const MAX_AGE_DAYS = 21;
const PUSH = process.argv.includes('--push');

function fail(msg) {
  console.error(`\nanalytics: ${msg}\n`);
  process.exit(1);
}

const readJson = (file) => JSON.parse(readFileSync(join(DATA, file), 'utf8'));
const bare = (host) => host.replace(/^www\./, '').toLowerCase();
const addDays = (day, n) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
const today = new Date().toISOString().slice(0, 10);
const inWindow = (d, from, to) => d >= from && d <= to;

/** Domains straight from sites.ts, so the list has one source of truth. */
function ownedDomains() {
  const src = readFileSync(SITES_TS, 'utf8');
  const domains = [...src.matchAll(/^\s*domain:\s*'([^']+)',?\s*$/gm)].map((m) => m[1]);
  if (domains.length === 0) fail(`no domains found in ${SITES_TS}`);
  return domains;
}

/** Sum one column of a [date, ...values] series over the window. */
const sum = (rows, col, from, to) =>
  rows.filter((r) => inWindow(r[0], from, to)).reduce((n, r) => n + (r[col] ?? 0), 0);

function gscFigures(site, from, to) {
  const t = site.totals;
  if (!t?.daily?.length || !t.historyStart || t.historyStart > from) return null;
  if ((t.missingDates ?? []).some((d) => inWindow(d, from, to))) return null;
  if (t.daily.at(-1)[0] < to) return null;
  return { impressions: sum(t.daily, 2, from, to), clicks: sum(t.daily, 1, from, to) };
}

function gaFigures(ga, from, to) {
  if (!ga?.fetched || ga.thresholded || ga.sampled || !ga.daily?.length) return null;
  if (ga.daily[0][0] > from || ga.daily.at(-1)[0] < to) return null;
  if ((ga.uncoveredDates ?? []).some((d) => inWindow(d, from, to))) return null;
  const ai = ga.channels?.names?.indexOf(AI_CHANNEL) ?? -1;
  return {
    visits: sum(ga.daily, 1, from, to),
    // Channel rows are [date, ...one column per channel name].
    aiReferrals: ai < 0 ? 0 : sum(ga.channels.daily ?? [], ai + 1, from, to),
  };
}

// ---------- read ----------

if (!existsSync(join(DATA, 'overview.json'))) {
  fail(`no dashboard data at ${DATA}. Set CONTENT_FACTORY_DIR to the content-sites-factory checkout.`);
}
const overview = readJson('overview.json');
const bySite = new Map(overview.sites.filter((s) => s.domain).map((s) => [bare(s.domain), s]));
console.log(`${today}  dashboard built ${overview.builtAt}`);

// With --push, work in a worktree on origin/main so this checkout stays as it is.
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
let target = ROOT;
if (PUSH) {
  git(ROOT, 'fetch', '--quiet', 'origin', 'main');
  target = mkdtempSync(join(tmpdir(), 'slash-o-analytics-'));
  git(ROOT, 'worktree', 'add', '--quiet', '--detach', target, 'origin/main');
}
const OUT = join(target, REL_OUT);

try {
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { sites: {} };
  const fresh = (entry) => entry && addDays(entry.to, MAX_AGE_DAYS) >= today;
  const sites = {};

  for (const domain of ownedDomains()) {
    const prev = previous.sites?.[domain] ?? {};
    const out = {};
    const o = bySite.get(domain);
    let site = null;
    let ga = null;
    if (o) {
      try {
        site = readJson(`${o.site}.json`);
        const file = site.parts?.ga?.file;
        ga = file ? readJson(file).ga : null;
      } catch (e) {
        console.warn(`${domain}  dashboard files unreadable: ${e.message}`);
      }
    } else {
      console.warn(`${domain}  not in the dashboard`);
    }

    const to = site?.provisionalFrom ? addDays(site.provisionalFrom, -1) : null;
    const from = to ? addDays(to, -(WINDOW_DAYS - 1)) : null;
    const g = site && gscFigures(site, from, to);
    const a = ga && gaFigures(ga, from, to);

    if (g) Object.assign(out, g, { gsc: { property: o.domain, from, to } });
    else if (fresh(prev.gsc)) Object.assign(out, { impressions: prev.impressions, clicks: prev.clicks, gsc: prev.gsc });
    if (a) Object.assign(out, a, { ga4: { property: ga.property, from, to } });
    else if (fresh(prev.ga4)) Object.assign(out, { visits: prev.visits, aiReferrals: prev.aiReferrals, ga4: prev.ga4 });

    const note = (got, name, kept) => (got ? '' : kept ? `${name} kept from ${kept.to}` : `${name} has no full window`);
    const notes = [note(g, 'GSC', out.gsc), note(a, 'GA4', out.ga4)].filter(Boolean);
    console.log(`${domain}  ${from ?? '?'} to ${to ?? '?'}${notes.length ? `  (${notes.join(', ')})` : ''}`);
    sites[domain] = out;
  }

  writeFileSync(OUT, `${JSON.stringify({ source: 'content-sites-factory analytics dashboard', sites }, null, 2)}\n`);
  console.table(
    Object.fromEntries(
      Object.entries(sites).map(([d, s]) => [
        d,
        { visits: s.visits, impressions: s.impressions, clicks: s.clicks, ai: s.aiReferrals },
      ]),
    ),
  );

  if (!PUSH) {
    console.log(`wrote ${OUT}`);
  } else if (git(target, 'status', '--porcelain', '--', REL_OUT) === '') {
    console.log('no change to commit');
  } else {
    const to = Object.values(sites).flatMap((s) => [s.gsc?.to, s.ga4?.to]).filter(Boolean).sort().at(-1);
    git(target, 'add', '--', REL_OUT);
    git(target, 'commit', '--quiet', '-m', `Refresh the owned sites' traffic${to ? ` to ${to}` : ''}`);
    git(target, 'push', '--quiet', 'origin', 'HEAD:refs/heads/main');
    console.log(`pushed ${git(target, 'rev-parse', '--short', 'HEAD')} to origin/main`);
  }
} finally {
  if (PUSH) {
    git(ROOT, 'worktree', 'remove', '--force', target);
  }
}
