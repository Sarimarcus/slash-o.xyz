/**
 * Counts from the content factory that runs the three owned sites.
 *
 * Cloudflare Pages cannot see that repository, so these numbers are measured
 * locally and committed with the date they were measured on. Refresh them with
 * `npm run refresh:factory`, which rewrites this file from the factory checkout
 * (path from FACTORY_DIR, default ../content-sites-factory). Never edit the
 * numbers by hand: the date is what keeps the claim honest.
 */
export const FACTORY = {
  measuredOn: '2026-09-16',
  repo: 'https://github.com/Sarimarcus/content-sites-factory',
  commits: 2112,
  /** Agent briefs under .claude/agents/*.md */
  agents: 16,
  /** validate-*, audit-*, check-*, lint-* scripts under scripts/ */
  validators: 54,
  /** Entries in scripts/factory-gates.json that run on commit and push */
  gates: 14,
  /** tests/run-*.mjs suites, including the one that tests the validators */
  testSuites: 10,
  buildDeterminismCheck: true,
} as const;
