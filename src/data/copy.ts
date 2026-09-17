/**
 * Every word on the page, in one place.
 *
 * Voice: sentence case, active voice, plain verbs, no filler, no superlatives.
 * Agents are named by role, never by vendor. Numbers come from data files, not
 * from here. Strings starting with `TODO(content)` are placeholders.
 */

export const NAV = [
  { href: '/#problems', label: '/problems' },
  { href: '/#work', label: '/work' },
  { href: '/#readings', label: '/readings' },
  { href: '/#sites', label: '/sites' },
  { href: '/#how', label: '/how' },
  { href: '/#contact', label: '/contact' },
] as const;

export const HERO = {
  h1: 'Evidence before intervention.',
  lede:
    'I audit the engineering of media groups before anyone changes it, coding agents included. A measured baseline first, because the obvious fixes cost traffic and nobody can prove it afterwards. Below is what I look for, what I found in my own sites, and what I will not do. Read it and decide whether it is worth a conversation.',
  primary: 'Book a call',
  secondary: 'See what I will not do',
  readoutNote: 'A live reading of the field under the cursor. On touch, the centre of the plate.',
  readoutStaticNote: 'The field at rest. Values recorded at build.',
} as const;

export interface Failure {
  title: string;
  body: string;
  /** What he measures for it, shown in the margin. */
  measures: string[];
}

export const PROBLEMS = {
  title: 'What usually goes wrong',
  intro:
    'Three things I find in most media groups, usually in this order. If none of them sound like your group, I am probably not the person to call.',
  items: [
    {
      title: 'CMS sprawl from acquisitions',
      body:
        'Every acquired title arrived with its own stack, and every migration since was scoped as a quick one. Five years later there are four content systems, three ad wrappers and nobody who can say what a page costs to publish.',
      measures: ['content systems in use', 'cost to publish one page', 'teams who can deploy'],
    },
    {
      title: 'Search decay that resists post-mortem',
      body:
        'Organic traffic slides for eighteen months. Every team has a theory, every theory fits the chart, and nothing was measured before the redesign, the consent banner or the template change that everyone now blames.',
      measures: ['indexed URLs, 90 days', 'click share by template', 'crawl budget spent on waste'],
    },
    {
      title: 'A shrinking addressable audience',
      body:
        'Consent rates fall and third-party identifiers go. The audience the sales team sells is a fraction of the one the analytics dashboard shows, the gap is rarely known, and the sales deck is built on the larger number.',
      measures: ['consented share of sessions', 'addressable reach, by title', 'the two numbers, side by side'],
    },
  ] satisfies Failure[],
} as const;

export interface Area {
  title: string;
  body: string[];
  /** What the work leaves behind, shown in the margin. */
  artefacts: string[];
}

export const WORK = {
  title: 'Where I am useful',
  items: [
    {
      title: 'Platform and architecture review',
      body: [
        'How many systems there are, who owns each, what a page costs to publish, and where the coupling is. Written as a map the board can read, with the risks ranked and the first move named.',
      ],
      artefacts: ['system map', 'ranked risk register'],
    },
    {
      title: 'Search at editorial scale',
      body: [
        'Crawl budget, template-level performance, internal linking, structured data, and what a newsroom of two hundred writers does to all of it every day. Measured per template before anyone touches a template.',
      ],
      artefacts: ['template-level search baseline', 'crawl budget report'],
    },
    {
      title: 'Consent and audience addressability',
      body: [
        'What share of your audience you can still measure and sell, how consent is implemented across titles, and what the honest number is. The gap between the dashboard and the deck, closed.',
      ],
      artefacts: ['addressability report', 'consent implementation review'],
    },
    {
      title: 'Engineering with coding agents',
      body: [
        'Every engineering team is being told to adopt coding agents this year. Before that happens, I measure how the codebase behaves: whether the tests are deterministic, whether the architecture rules are tested rather than written down, whether the documentation gates in CI catch what agents get wrong, and how much of the repository an agent can work in without a human reading every diff.',
        'Then the same measurements after. Without the baseline, nobody can separate what the agents broke from what was already broken. I build this way myself, every day, and run the sites below through it.',
      ],
      artefacts: ['agent-readiness baseline', 'architecture tests', 'mutation score', 'CI documentation gates'],
    },
  ] satisfies Area[],
  /**
   * The mirror of the four areas above: the reader decides from both halves.
   * Items that are still `TODO(content)` are filtered out of the page rather
   * than printed, the same way a placeholder reading is.
   */
  notUseful: {
    title: 'Where I am not',
    intro: 'The same honesty in the other direction. If your situation is one of these, a conversation wastes your time and mine.',
    items: [
      'Building the fix for a problem you paid me to find. That one is a rule; there is a section on it below.',
      'Anything that competes with Webedia Group, where I am employed. I advise in a personal capacity and I keep that line clean.',
      'TODO(content): one or two more, in your words \u2014 the group size, the stage, or the kind of work you would turn down.',
    ],
  },
} as const;

export interface Reading {
  /** Which owned site. */
  site: string;
  /** What was measured, and its value before. */
  measured: string;
  /** What was done. */
  done: string;
  /** The value after, with the same unit and the period. */
  after: string;
}

export const READINGS = {
  title: 'Four readings from recent work',
  intro:
    'Each reading is a measurement, what was done, and the same measurement afterwards. They come from sites I own, so the properties are named and the numbers can be checked.',
  /** TODO(content): four real readings. The band stays hidden in production while any of these is a placeholder. */
  items: [
    { site: 'explorecordoba.com', measured: 'TODO(content): metric and value before', done: 'TODO(content): what was done', after: 'TODO(content): value after, same unit' },
    { site: 'exploregranada.org', measured: 'TODO(content): metric and value before', done: 'TODO(content): what was done', after: 'TODO(content): value after, same unit' },
    { site: 'darkskiesatlas.com', measured: 'TODO(content): metric and value before', done: 'TODO(content): what was done', after: 'TODO(content): value after, same unit' },
    { site: 'explorecordoba.com', measured: 'TODO(content): metric and value before', done: 'TODO(content): what was done', after: 'TODO(content): value after, same unit' },
  ] satisfies Reading[],
} as const;

export const SITES = {
  title: 'I still run my own sites, with agents',
  intro:
    'Three sites, owned, operated and published to. They are where I test what I recommend before I recommend it.',
  /** {agents}, {validators}, {gates}, {tests} are filled from src/data/factory.ts. */
  factory: [
    'They are run through one content factory: {agents} named agents with written briefs, {validators} validators that a piece of content passes before it publishes, {gates} commit and push gates, and {tests} test suites, one of which tests the validators themselves. A build-determinism check runs before anything deploys.',
    'Nothing publishes because an agent said it was fine. It publishes because the gates passed, and the gates have their own tests.',
  ],
  marginUrls: 'URLs in sitemap',
  marginLastmod: 'last published',
  marginMeasured: 'factory counted on',
  marginCommits: 'commits',
} as const;

export const HOW = {
  title: 'How I work',
  engagement: {
    title: 'If I can help',
    body: [
      'Engagements have taken two shapes: a fixed-scope look at something specific, and a standing advisory arrangement. Which one fits, how long it runs and what it costs are decided per case, after the conversation, not before it.',
      'I do not have a package to sell you.',
    ],
    margin: ['agreed per case', 'priced after the conversation'],
  },
  refusal: {
    title: 'What I do not do',
    /** The mark appears mid-sentence exactly once on the page, here. */
    lead: 'does not sell the fix it recommends.',
    body:
      'I build. I do it every day, with agents, on the sites above. What I will not do is find you a problem and then sell you the solution to it. If what I measure says you need a team, I will help you find one and I will not be it. An auditor who also sells the fix has already decided what the fix is.',
  },
  capacity:
    'I advise in a personal capacity. Webedia is not party to any engagement, and I do not take work that competes with it.',
  languages: {
    title: 'Working languages',
    body: 'English, French and Spanish. Anything I write for you is in English unless you ask otherwise.',
    margin: ['EN', 'FR', 'ES'],
  },
} as const;

export const CONTACT = {
  title: 'Contact',
  body:
    'Write to me with the group, the titles, and what you think is wrong. I reply within two working days. If I cannot help, I will say so, and I will try to tell you who can.',
  calendarLead: 'Or book a call directly.',
  marginLabel: 'local time',
  marginStatic: 'Central European Time',
  /** Shown in production while the address is still a placeholder. */
  emailPending: 'Email address to follow.',
} as const;

export const COLOPHON = {
  /** {kb}, {commit} and {date} are filled at build by src/integrations/provenance.mjs and the page. */
  lines: [
    'Set in Source Serif 4. No third-party script, no analytics, no cookies.',
    "The plate is Humboldt and Bonpland's Tableau physique des Andes (1807): measure a baseline, draw isolines from it, theorise after. The field above is computed, not drawn, from the same method.",
    'The mark is cut from that field too: the O is a circle whose radius the field displaces, sampled at uv 0.9147, 0.1741 with the constants in src/hero/noise.js.',
    'Built with coding agents under the same discipline as the sites above: build and typecheck as hard gates in CI, a design detector run before shipping.',
    '{kb} KB transferred before the hero chunk is requested. Commit {commit}, built {date}.',
  ],
  source: 'Source on GitHub',
} as const;

export const NOT_FOUND = {
  title: 'This altitude was not surveyed.',
  body: [
    'There is no page at this address. It was either never written, moved without leaving a forwarding note, or is a typo, which is the most common cause of missing pages and the least often blamed.',
    'Nothing here rose above the baseline, so nothing was plotted.',
  ],
  measuredAs: 'measured as',
  fallbackPath: 'this address',
  back: 'Back to the plate',
  readoutNote: 'Readings taken at the requested address. All instruments agree.',
} as const;
