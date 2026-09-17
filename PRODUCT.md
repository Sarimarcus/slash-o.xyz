# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: CEOs, CPOs and private-equity operating partners at digital media groups
and publishers. They have already been sold to by a Big Four consultancy and were
unimpressed. Time-poor, skeptical, allergic to hype. They arrive about equally in two
situations: after a conversation with Olivier (the page confirms who he is and gives
them terms to forward), or cold from LinkedIn or a referral link (the page has to
establish who he is first).

The job they are doing: judging from the evidence on the page whether this person can
help them, and deciding whether it is worth a conversation. The decision is made
offline. A successful visit ends with a note or a booked call — or with a correct
decision not to write. It never ends with a form.

## Product Purpose

slash-o.xyz is the one-page site of Slash O, written "/O": Olivier's independent
advisory practice as CTO for digital media groups. It exists to state what he sells,
what he refuses to sell, and why his method is different, in a form a skeptical
executive can read in three minutes and forward.

Success: a qualified reader starts a conversation, and an unqualified one decides from
the page that Olivier is not the right person. Failure: the page reads like a
consultancy template, or promises an outcome nobody has measured yet.

## Positioning

"Evidence before intervention." Olivier records a measured baseline before anything
changes, because most obvious fixes cost traffic and nobody can prove it afterwards.
This extends to coding agents: he measures how a codebase behaves before agents are
let into it, so that what agents break can later be separated from what was already
broken.

He ran engineering inside a multi-site European media portfolio rather than
observing one from a consultancy. He does not sell a package. Engagements have taken
two shapes, a fixed-scope look at something specific and a standing advisory
arrangement, and which one fits, how long it runs and what it costs are decided per
case, after the conversation rather than before it. He does not sell implementation
and refuses to sell it on the back of his own findings. The refusals are the selling
point, and they are on the page so a reader can rule himself out without asking.

He develops with coding agents as his primary method, and runs three content sites
through an agent-operated factory with its own quality gates. That practice is
evidence, not a feature.

## Operating Context

- Olivier is based in Madrid and works in English, French and Spanish. The site is
  English only.
- He is employed as Engineering Manager at Webedia Group, Madrid. He advises in a
  personal capacity; Webedia is not party to any engagement, and he does not take
  work that competes with it.
- Deployment: Cloudflare Pages, static output, Git integration on `main`. Strict CSP
  in `public/_headers` (`script-src 'self' 'unsafe-inline'`, `font-src 'self'`,
  `form-action 'none'`). No third-party script, no analytics, no cookies.
- Quality gate: `npm run build` and `npm run check` in CI. No linter, no test runner.

## Capabilities and Constraints

- One page with anchor navigation, seven bands: hero, what usually goes wrong, where
  I am useful (closing with its mirror, "Where I am not"), four readings from recent
  work, I still run my own sites, how I work, contact.
- Contact is an email link and a calendar link. No form (CSP and product decision).
- Must work with JavaScript disabled and under `prefers-reduced-motion`; WCAG AA
  contrast; visible keyboard focus.
- Performance is part of the pitch: the h1 must be the LCP element; the hero's WebGL
  canvas is dynamically imported behind idle time and viewport intersection; total
  JavaScript budget 60 KB gzipped.
- Stack (existing scaffold): Astro 7, static, vanilla JS, plain CSS. OGL for the
  hero's single fullscreen quad. Fonts self-hosted.
- Undecided: surname, and the last "Where I am not" item. Marked `TODO(content)` and
  hidden by `isPlaceholder()` until real. Enquiries go to hello@slash-o.xyz and the
  primary button to the Proton bookings page.

## Brand Commitments

- Name: Slash O, written "/O". The slash is a filesystem root plus his initial, and
  is to be treated as an active typographic element, not a logo.
- Voice: sentence case, active voice, plain verbs, no filler, no superlatives, no
  "AI-powered" or "leveraging". Agents are named by role, never by vendor.
- Binding visual constraints volunteered by the user, recorded without expansion:
  the anchor reference is Humboldt and Bonpland's *Tableau physique des Andes*
  (1807) and Swiss relief cartography (isolines); vintage scientific illustration
  with natural subject matter drawn by a machine; no depiction of AI (robots,
  circuits, node graphs, brains, sparkles); no CRT, synthwave, steampunk, faux
  parchment, global paper-grain overlay; no scroll-triggered reveals. Palette seed:
  linen `#E4DFD1`, deep ink `#24302B`, lichen `#6E7F5C`, altitude blue `#3C5A6B`,
  oxide `#9C4B2F`. The full direction contract is the approved plan at
  `~/.claude/plans/you-are-the-design-wondrous-tarjan.md`.

## Evidence on Hand

- Three owned and operated sites, publicly checkable: explorecordoba.com (573 URLs
  in sitemap, 2026-09-16), exploregranada.org (519), darkskiesatlas.com (638).
- The content factory that runs them, at `~/dev/projects/content-sites-factory`
  (GitHub: Sarimarcus/content-sites-factory): 2,112 commits, 16 named agents with
  written briefs, 54 validator/audit/lint scripts, 14 commit-and-push gates, 10
  test suites that test the validators, a build-determinism check. Measured
  2026-09-16.
- The "four readings" band draws on these three sites only, never on Webedia
  properties. Figures are not yet supplied; they ship as `TODO(content)`.
- No testimonials, no client logos, no press. None are to be fabricated.
- The site's own build is evidence: commit SHA, CI gates and transferred bytes are
  computed at build time for the colophon.

## Product Principles

1. Measure before you claim. Every number on the page traces to a file, a build step
   or a public URL, and carries a date when it is not computed at build.
2. Refusals are part of the offer. What he will not do is stated as plainly as what
   he does.
3. Demonstrate, never depict. The method is shown by execution (a live computed
   field, honest readouts, a fast page), not by imagery of intelligence.
4. Forwardable. A skeptical executive can read it in three minutes and send it on
   with the terms intact.
5. Performance is the pitch. A site selling Core Web Vitals audits ships fast or
   contradicts itself.
6. Show, do not promise. The page states what he does, what he has measured and what
   he refuses. It does not scope, price or guarantee an outcome ahead of the
   conversation that would define it.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard-operable with visible focus. Full content and navigation with
JavaScript disabled. `prefers-reduced-motion` disables the canvas entirely and
substitutes a static CSS field with static readouts. No colour used as the sole
carrier of meaning.
