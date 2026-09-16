#!/usr/bin/env node
/**
 * Rewrites src/data/factory.ts from a local checkout of the content factory.
 *
 *   FACTORY_DIR=../content-sites-factory npm run refresh:factory
 *
 * Every number is derived, none typed. The date is today's, in the factory's
 * own timezone-free ISO form, and is what the page shows next to the counts.
 */
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const factoryDir = resolve(process.env.FACTORY_DIR ?? '../content-sites-factory');
if (!existsSync(join(factoryDir, 'sites.json'))) {
  console.error(`No factory at ${factoryDir} (expected sites.json). Set FACTORY_DIR.`);
  process.exit(1);
}

const sh = (cmd) => execSync(cmd, { cwd: factoryDir, encoding: 'utf8' }).trim();

const commits = Number(sh('git rev-list --count HEAD'));
const agents = readdirSync(join(factoryDir, '.claude/agents')).filter((f) => f.endsWith('.md')).length;
const validators = readdirSync(join(factoryDir, 'scripts')).filter((f) =>
  /^(validate|audit|check|lint)-.*\.(mjs|sh)$/.test(f),
).length;
const gatesJson = JSON.parse(readFileSync(join(factoryDir, 'scripts/factory-gates.json'), 'utf8'));
const gates = (Array.isArray(gatesJson) ? gatesJson : gatesJson.gates ?? Object.values(gatesJson)).length;
const testSuites = readdirSync(join(factoryDir, 'tests')).filter((f) => /^run-.*\.mjs$/.test(f)).length;
const buildDeterminismCheck = existsSync(join(factoryDir, 'scripts/check-build-determinism.mjs'));
const repo = sh('git remote get-url origin')
  .replace(/^git@github\.com:/, 'https://github.com/')
  .replace(/\.git$/, '');
const measuredOn = new Date().toISOString().slice(0, 10);

const out = `/**
 * Counts from the content factory that runs the three owned sites.
 *
 * Cloudflare Pages cannot see that repository, so these numbers are measured
 * locally and committed with the date they were measured on. Refresh them with
 * \`npm run refresh:factory\`, which rewrites this file from the factory checkout
 * (path from FACTORY_DIR, default ../content-sites-factory). Never edit the
 * numbers by hand: the date is what keeps the claim honest.
 */
export const FACTORY = {
  measuredOn: '${measuredOn}',
  repo: '${repo}',
  commits: ${commits},
  /** Agent briefs under .claude/agents/*.md */
  agents: ${agents},
  /** validate-*, audit-*, check-*, lint-* scripts under scripts/ */
  validators: ${validators},
  /** Entries in scripts/factory-gates.json that run on commit and push */
  gates: ${gates},
  /** tests/run-*.mjs suites, including the one that tests the validators */
  testSuites: ${testSuites},
  buildDeterminismCheck: ${buildDeterminismCheck},
} as const;
`;

writeFileSync(new URL('../src/data/factory.ts', import.meta.url), out);
console.log(`factory.ts refreshed: ${commits} commits, ${agents} agents, ${validators} validators, ${gates} gates, ${testSuites} test suites (${measuredOn})`);
