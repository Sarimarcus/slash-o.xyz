/**
 * Every word on the page, in one place.
 *
 * Voice: sentence case, active voice, plain verbs, no filler, no superlatives.
 * Agents are named by role, never by vendor. A tool recommended in an answer
 * (ASKED) may be named, because the recommendation is the answer. Numbers come from data files, not
 * from here. Strings starting with `TODO(content)` are placeholders.
 */

export const NAV = [
  { href: '/#problems', label: '/problems' },
  { href: '/#work', label: '/work' },
  { href: '/#readings', label: '/readings' },
  { href: '/#sites', label: '/sites' },
  { href: '/#asked', label: '/asked' },
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
    'Three sites I own and run myself. Anything I recommend, I have tried on them first.',
  factory: [
    'They are run through one content factory. Each agent has a role and a written brief. A piece of content passes validators before it publishes, every commit and push runs through gates, and a build-determinism check runs before anything deploys.',
    'Nothing publishes because an agent said it was fine. It publishes because the gates passed, and the gates have their own tests.',
  ],
  marginUrls: 'URLs in sitemap',
  marginLastmod: 'last published',
} as const;

export interface Asked {
  /** When it was asked, ISO: a day, or a month when the day is not known. */
  on: string;
  /** Who asked, by role, never by name. */
  by: string;
  /** On the page. Four at most, so the band reads as a sample, not an FAQ. */
  show: boolean;
  /** Olivier has checked `on` and `by`. Unconfirmed items never reach production. */
  confirmed: boolean;
  question: string;
  answer: string[];
}

export const ASKED = {
  title: 'Questions I get asked',
  intro:
    'Asked by people doing the work, answered the way I would answer them in a room. Each one is dated and attributed by role.',
  marginOn: 'asked on',
  marginBy: 'asked by',
  /** Production shows an item only when it is shown and confirmed. */
  items: [
    {
      on: '2026-09-23',
      by: 'an SEO analyst',
      show: true,
      confirmed: true,
      question: 'How do I analyse a lot of Apache logs with AI?',
      answer: [
        'Not by sending the logs to a chat model. It reads every line as tokens, so the bill grows with the log, and a month of access logs is millions of lines that a parser reads exactly, for nothing. Filter to the crawlers you care about and confirm they are who they say they are. Then count hits, status codes and response times by URL. None of that needs a model.',
        'The model is useful where the rules run out: deciding which section or page type a URL belongs to when the URL patterns stopped being consistent years ago. Ask that once per distinct URL, not once per line, and use a model built for that kind of judgment, such as TypeSafe’s Jev, which returns a label and a probability instead of writing text. Thousands of questions instead of millions, and answers that code can count.',
        'Then the question that was asked in the first place has an answer you can check: where the crawl budget goes, by section, and how much of it lands on pages nobody should be crawling.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-07',
      by: 'the head of SEO at a publisher',
      show: true,
      confirmed: false,
      question: 'How do we find pages that compete with each other in search?',
      answer: [
        'Start from Search Console, not from the content. Cannibalisation shows up as several of your URLs taking impressions for the same query, with the one Google ranks changing from week to week. Group by query, keep the queries where two or more URLs share the impressions, and code has built the list for nothing.',
        'Content similarity comes second. Embeddings find the pairs of pages that say the same thing, including across titles that were bought years apart and never compared. A model judges the borderline pairs: the same intent, or two angles on one subject? Two angles can both stay.',
        'A person decides which page is canonical and what happens to the other: merge, redirect, or rewrite it toward a different query. Then watch the query group, not the page, because the point was that one of them wins.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-06',
      by: 'the CTO of a media group',
      show: true,
      confirmed: false,
      question: 'Should we let coding agents work on our legacy CMS?',
      answer: [
        'Yes, once you know how it behaves today. Record the baseline first: which tests exist and pass, how long a build takes, the error rates in production, what a page costs to render. It is a short piece of work next to what comes after it.',
        'Without it, the first incident after the agents arrive gets blamed on the agents and nobody can prove otherwise. Or it gets blamed on the old code, and nobody can prove that either.',
        'Then give the agents narrow jobs whose result can be checked: tests for code that has none, dependency upgrades behind a passing build. Leave the parts nobody understands for last. An agent will change them with confidence.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-08',
      by: 'the CEO of a digital publisher',
      show: true,
      confirmed: false,
      question: 'Can AI tell us why our traffic dropped?',
      answer: [
        'Not on its own. A drop has many candidate causes: a deploy, a template change, the consent banner, a migration, an algorithm update, a competitor, the season. A model can line them up against the chart, but only the ones somebody recorded, with a date.',
        'So the first job is the record: what changed, where and when, from deploy logs, the CMS, the tag manager’s history and Search Console. Then split the drop by template, section and query group. A real cause shows up in one slice before it shows up in the total.',
        'The model is useful for reading that timeline next to the slices and saying which changes line up. It proposes, and the slices confirm it or do not.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-05',
      by: 'an editor-in-chief',
      show: false,
      confirmed: false,
      question: 'Can we use AI to rewrite our old articles for SEO?',
      answer: [
        'Start with which old articles still earn clicks. Take twelve months of Search Console data by URL before anything changes. The pages that earn traffic are the ones a rewrite can lose it on.',
        'Sort the rest: pages worth updating because the facts changed, pages worth merging into a stronger one, pages worth removing. A model can draft the update. An editor signs it, because the article carries your name.',
        'Roll it out in batches and leave a comparable group of pages alone. Compare clicks after the next crawl. Without the untouched group, a seasonal lift looks like a result.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-07',
      by: 'an SEO lead',
      show: false,
      confirmed: false,
      question: 'Can an LLM write our meta titles and descriptions at scale?',
      answer: [
        'Yes, the drafts. A model writes a reasonable title from the article, for the whole archive, quickly. The work is in what runs before anything publishes: a length check, a check that no two pages share a title, and a check that the title says what the article says.',
        'The last check is a judgment, and a model such as TypeSafe’s Jev can make it with a probability attached, so the doubtful ones go to an editor instead of to the page.',
        'Then test before rolling out. Change a sample, leave a comparable sample alone, and compare click-through over a few weeks. Google rewrites many titles anyway, so also count how often yours are shown as written.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-08',
      by: 'an engineering manager',
      show: false,
      confirmed: false,
      question: 'How do we review code that agents wrote when there is ten times more of it?',
      answer: [
        'Stop reviewing every line and review what checks the lines: tests, type checks, a build that comes out the same twice, rules on what a change may touch. If those are weak, code arrives faster than anyone can read it and review becomes a formality.',
        'People keep what a gate cannot judge: the design, the data model, anything that touches money, consent or security. Keep each change small enough to read in one sitting. Ask the agent for that and it will comply.',
        'That is how my own sites run.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-09',
      by: 'a head of platform',
      show: false,
      confirmed: false,
      question: 'Can AI detect incidents in our logs and fix them automatically?',
      answer: [
        'Detection first, and without a model. Count what matters by the minute: error rates, latency, status codes by route, against the same hour last week. A threshold on those fires when something is wrong, and you can measure how often it fires for nothing. Know that number before you automate anything.',
        'The model helps after the alert. It reads the log lines around the spike, lines them up with recent deploys and drafts the incident note, which spares the engineer on call the first round of reading.',
        'Respond automatically only with actions that are cheap to undo: a rollback, a cache purge, more capacity. A person decides everything else.',
      ],
    },
    {
      // TODO(content): proposed by Claude, confirm the month and the asker.
      on: '2026-06',
      by: 'a chief product officer',
      show: false,
      confirmed: false,
      question: 'Can an LLM answer questions about our analytics so editors stop waiting for the data team?',
      answer: [
        'Only on top of definitions that are written down. Ask two analysts what a session, an active subscriber or a page view means on your sites and you may get two answers. A model gives a third, confidently, and a different one the next day.',
        'So the work comes first: a small set of metrics, each defined once, in queries the data team owns. The model’s job is then narrow. It picks the metric and the filters that fit the question and hands them to the query. It selects, it does not calculate.',
        'Show the query with every answer. An editor who can see what was counted can tell when the question was misunderstood.',
      ],
    },
  ] satisfies Asked[],
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
    'The mark is optically sized, like the type it sits beside: a true circle at the sizes it ships at, and on the card image an O whose radius that same field displaces, sampled at uv 0.9147, 0.1741.',
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
