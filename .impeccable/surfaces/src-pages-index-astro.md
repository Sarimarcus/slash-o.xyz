---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

## Scope & mode

`src/pages/index.astro`, the site's only page. Mode: **Persuade**. The page makes no
offer and no promise: it shows the work and the refusals, and the visitor decides
whether it is worth a conversation.

## Audience & job

CEOs, CPOs and PE operating partners at media groups, already sold to by a Big Four
consultancy and unimpressed. Two arrival situations, about equal: after a
conversation (confirm who this is) and cold from LinkedIn or a referral (establish
who this is first). Job: read in three minutes and judge whether he can help.

## Action / task

Primary: "Book a call" (calendar link, mailto if the URL is ever cleared).
Secondary: "See what I will not do" (anchor to the how-I-work band). Success is
offline and two-sided: a qualified reader writes or books, an unqualified one
correctly decides not to.

## Content & proof

All copy in `src/data/copy.ts`. Proof is measured, never asserted: three owned sites
with sitemap counts fetched at build; the agent factory's counts with a measured
date; the page's own commit and transferred bytes computed at build; a live computed
field in the hero whose margin readouts report real values. Employer named in a
personal-capacity sentence. No testimonials, no logos. The "four readings" band draws
on the owned sites only and ships hidden in production until real figures exist.

## Direction contract

THESIS: the page is a scientific plate, Humboldt's *Tableau physique* read as a
descent: an annotated margin column carrying only true measurements beside a body
of text, and a hero that is a machine plotting isolines live. It refuses the
consultancy landing page (split hero, feature cards, stat tiles, scroll reveals,
contact form) and every depiction of AI.

OWN-WORLD: aged linen ground `#E4DFD1` with structure drawn in a darker paper
`#D3CCBA` (rules, margin tint, hatching), deep green-black ink `#24302B`, lichen
`#6E7F5C` for hairlines only, altitude blue `#3C5A6B` and oxide `#9C4B2F` as the
field's cool and warm poles, the mark's slash and the one filled button. One face,
Source Serif 4 with its optical-size axis, tabular figures in the margin. Square
corners, 1px paper-toned rules with lichen ticks, one hatching angle (the slash's,
about 70°) everywhere. No shadows, no radius, no gradients as decoration.

STORY: within seconds the visitor sees a measured field being drawn and a headline
that says measurement comes first. They read three failures they recognise, four
places this person is useful (including how to let coding agents in without losing
the baseline), the places he says he is not useful, evidence they can check by
clicking, the shape a working relationship takes and the one rule behind it, and a
way to write. They believe this person measures before he speaks, and decide whether
it is worth a conversation.

FIRST VIEWPORT: full-viewport isoline field on linen, contours in blue-to-oxide
with brighter every third, plotting in over 1.8s. Header row: `/O` mark in the margin
column, path-style anchor nav across the content column. Margin column (left, ~9.5rem)
shows four live readouts in 13px caption size: isotherm value, contour n/9, zone,
probe x/y. Content column, lower-left: h1 "Evidence before intervention." at
44 to 72px, a lede at 20 to 22px, then the filled oxide button "Book a call" and the
underlined text link "See what I will not do". The h1 is the LCP element;
the canvas arrives after idle and intersection.

FORM: the annotated plate with descent, position 1 of the ordered structures
(the alternatives, a two-column dossier and a single-column letter, were ranked
below it for failing to carry the margin metadata). Pinned by the client's brief and
approved in the plan on 2026-09-16; no concept-seed roll was made because the brief
pinned the form and the skill's own rule is that the brief wins.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment

The plot-in: nine contours landing in order, majors first, each swept left to right
like a pen, while the margin counts `n 1 / 9` up to `n 9 / 9`. Then the field bends
around the cursor like isobars around a pressure anomaly and the reading changes.

## Constraints

Static Astro 7, no UI framework, plain CSS, OGL for one fullscreen quad, everything
else vanilla JS. JS budget 60 KB gzipped. h1 is the LCP element. DPR ≤ 1.5, ≤ 40fps,
rAF stopped on tab hide and scroll-out. `prefers-reduced-motion`: no canvas, a
build-time SVG plot of the same field at rest, static readouts. Works with JS disabled. WCAG AA; lichen never carries text.
CSP: `script-src 'self' 'unsafe-inline'`, `font-src 'self'`, `form-action 'none'`.
Banned: any depiction of AI, CRT/terminal, synthwave, steampunk, faux parchment,
global grain overlay, cream `#F4F1EA` + high-contrast serif + terracotta, near-black
+ one neon accent, identical rounded cards, eyebrow labels, 01/02/03 numbering, arrow
glyphs on buttons, middle-dot meta strings, one accented headline word, scroll
reveals, parallax, cursor trails, custom cursor, particles, post-processing.

## Undecided

Surname, email, calendar URL, the four readings' figures. All `TODO(content)`.
