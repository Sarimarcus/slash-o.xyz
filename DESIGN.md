---
name: Slash O
description: A scientific plate after Humboldt's Tableau physique, on aged linen, with a margin column of true measurements and a live isoline field.
colors:
  linen: "#e4dfd1"
  linen-shade: "#d3ccba"
  ink: "#24302b"
  lichen: "#6e7f5c"
  altitude: "#3c5a6b"
  oxide: "#9c4b2f"
typography:
  display:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(2.75rem, 2rem + 4.1vw, 5.5rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(2.25rem, 1.55rem + 2.9vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  title-display:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.005em"
  question:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)"
    fontWeight: 500
    lineHeight: 1.3
  lede:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
  caption:
    fontFamily: "'Source Serif 4', 'Source Serif Fallback', Georgia, serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.35
    fontFeature: "tabular-nums lining-nums"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  margin-w: "clamp(9.5rem, 17vw, 14rem)"
  gutter: "clamp(1.25rem, 3.5vw, 3rem)"
  band-pad: "clamp(3rem, 7vw, 6rem)"
  row-pad: "1.5rem"
  stack: "1.25rem"
  row-stack: "0.75rem"
  title-gap: "1.75rem"
  measure: "66ch"
components:
  button-primary:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.linen}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.linen}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  path-nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.9rem 0"
  path-nav-link-current:
    textColor: "{colors.oxide}"
  mark:
    height: "2.5rem"
    width: "auto"
    padding: "0.9rem clamp(1.25rem, 3.5vw, 3rem)"
  mark-inline:
    height: "0.868em"
    width: "auto"
  band-title:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
  margin-note:
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: "1.5rem clamp(1.25rem, 3.5vw, 3rem)"
  margin-note-live:
    textColor: "{colors.altitude}"
  refusal-field:
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 3.5vw, 3rem)"
---

# Design System: Slash O

## Overview

**Creative North Star: "The Annotated Plate"**

The page is one scientific plate read as a descent: a narrow margin column carrying only true measurements, a body of text beside it, and at the top a machine plotting isolines live. Everything is drawn on a single sheet of aged linen. Structure is not a second surface but a darker shade of the same paper: 1px rules, the tinted margin column, hatching. Text is a deep green-black ink, hairlines and minor contours are lichen, and two poles (altitude blue, oxide) belong to the field and reach the page only three times: the mark's slash, the one filled button, and the live/altitude accents (links, focus, selection, live readings).

Density is that of a printed plate, not a dashboard. Six colour values, one typeface with its optical-size axis, one angle for every hatch and tick (the slash's, 70° from horizontal). Square corners, no shadows, no gradient used as decoration, no dark mode. The plate refuses the consultancy landing page: no split hero, no feature cards, no stat tiles, no scroll reveals, no contact form, and no depiction of AI.

There is one authored motion on the page, the plot-in of the hero field (1.8s), followed by the field bending slowly under the pointer and the slash of the mark cut once the last contour lands (900ms, foot to top). Two small motions answer the reader, never the scroll: following an in-page link rules off the band it lands on with a 2px altitude line (600ms, left to right, after the scroll settles, the band landing 3rem below the top of the screen), and landing on the refusal redraws its hatch behind a 70deg edge (700ms). Nothing moves on scroll or on entry. Under reduced motion, no JavaScript or no WebGL2 the same field at rest is served as an SVG plotted at build, the slash is never held back, and the arrival rule appears without being drawn.

**Key Characteristics:**
- One sheet: linen ground, structure in linen shade, ink for text; the margin tint is derived with `color-mix`, not a seventh value
- Margin column of measured facts, ruled rows, subgrid alignment; band titles open the content column at display size, and the margin beside them holds only real annotations; below 48rem notes become footnotes and empty margins disappear
- One face (Source Serif 4, `opsz` + `wght`), tabular lining figures wherever numbers sit in the margin
- One angle: `--slash: 70deg` for the mark's slash, the lichen ticks and the hatched refusal field; the hatch gradient is `--hatch: calc(180deg - var(--slash))` (110deg), which draws its stripes at 70°
- The mark is Source Serif 4's own O beside a slash redrawn at the page's angle, carried as outlines so it never waits for the web font
- Square corners, no shadows, no decorative gradients, one authored motion plus two answers to a followed link, no scroll-triggered reveals
- Every margin number traces to a file, a build step or a public URL and carries a date when it is not computed at build

## Colors

A single sheet of aged paper with its own shade for structure, ink for text, lichen for hairlines, and two poles that belong to the field.

### Primary
- **Oxide** (#9c4b2f): the warm pole. Major contours at the base of the field, the mark's slash (in the plate head, inline in the refusal heading, on the favicon and on the social card), the current nav item, the caret, and the background of the page's one filled button. The only type it sets on linen is the current nav link.

### Secondary
- **Altitude blue** (#3c5a6b): the cool pole. Major contours at the summit of the field, link underline colour, `:focus-visible` outline (2px, offset 3px), `::selection` background, `accent-color`, and the `.live` colour on a margin value that was fetched at build rather than recorded.

### Tertiary
- **Lichen** (#6e7f5c): hairlines only. The minor contours in the field, the 1px angled tick where a band rule crosses the margin edge, the scrollbar thumb. It never carries text; its contrast on linen is not a text contrast.

### Neutral
- **Linen** (#e4dfd1): the ground of every surface, the hero field's paper, the favicon's square, the text colour on the filled button and in `::selection`, the `theme-color`.
- **Linen shade** (#d3ccba): every structural line: the plate head's bottom rule, band rules, row hairlines, the margin column's 1px edge, the note dividers, the hatching and bottom rule of the refusal field, the scrollbar track. Also one half of the margin tint.
- **Deep ink** (#24302b): all running text, headings, the mark's O (inline in the refusal it takes `currentColor`, which is ink), the favicon O's 0.8-unit stroke, the filled button's hover background and border.
- **Margin tint** (derived): `color-mix(in srgb, var(--linen) 55%, var(--linen-shade))`, the fill of the margin column on desktop. It is a mix of two existing values, never a new hex. Below 48rem no margin is tinted.

### Named Rules
**The Six Values Rule.** The palette is six hex values and nothing else. A new tone is a `color-mix` of two of them or it does not exist; there is no dark mode and no alpha-tinted variant on the page. The social card's cartouche is the one recorded exception.

**The Lichen Is Not Text Rule.** Lichen draws 1px hairlines, ticks and minor contours. It never sets type, not even a caption.

**The Two Poles Rule.** Altitude blue and oxide are the field's temperature poles first. On the page, oxide fills one button and cuts one slash; altitude marks what is live, linked, focused or selected. Neither is a brand wash: no oxide headings, no blue panels.

## Typography

**Display Font:** Source Serif 4 variable (`opsz` + `wght`, 400 to 600; italic at 400), with a metric-adjusted `Source Serif Fallback` (Georgia, `size-adjust: 95%`) then Georgia, serif
**Body Font:** the same face; `font-optical-sizing: auto` lets the optical-size axis do the display/text distinction
**Label/Mono Font:** none; figures in the margin are set in the same face with `tabular-nums lining-nums`

**Character:** one serif, doing everything from a 5.5rem headline to a 13px margin note, differentiated by optical size, weight (400, 500, 560, 600) and italic rather than by a second family. Labels in the margin are italic; values are roman, tabular. `font-synthesis: none`: no faux bold or faux italic.

### Hierarchy
- **Display** (560, `clamp(2.75rem, 2rem + 4.1vw, 5.5rem)`, 1.02, -0.01em): the h1 only, balanced, max 14ch on desktop, no cap below 48rem. It is plain HTML painted before any script; the LCP element is hero text (the h1 on desktop, the h1 or the lede on phones), never the canvas.
- **Headline** (500, `clamp(2.25rem, 1.55rem + 2.9vw, 4.25rem)`, 1.04, -0.01em): band titles, set at the top of the content column, `text-wrap: balance`, max 16ch, followed by 1.75rem before the intro. The refusal's one sentence is set at the same size, max 18ch.
- **Title display** (500, `clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)`, 1.15, -0.005em): the owned-site links and the contact email, the page's two kinds of destination.
- **Question** (400 italic, `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)`, 1.25, balanced): each question in the questions band. A question is someone else's words, so it is italic, a step above a row's title. The size is a literal on the question heading, not a size token.
- **Title** (500, `clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)`, 1.3): h3 inside a ruled row; 2.5rem above and 0.5rem below when it falls in running content.
- **Lede** (400, same size as Title, 1.45): the hero lede (max 52ch, 1.5rem below the h1) and each band's intro.
- **Body** (400, `clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)`, 1.55): running text, measure 66ch (70ch from 90rem). `strong` is 600.
- **Label** (500, 0.9375rem, line-height 1 on the button): the nav paths, the filled button, the text link. Below 48rem the nav paths give way to `clamp(0.75rem, 3.85vw, 0.9375rem)`.
- **Caption** (400, 0.8125rem, 1.35, `tabular-nums lining-nums`): every margin note and readout; the colophon at 1.5 line height. Labels (`dt`) italic, values (`dd`) roman. Hero readout values are 1rem with an italic unit.

### Named Rules
**The One Face Rule.** Source Serif 4 is the only family. Hierarchy comes from optical size, four weights and italic. No second face, no monospace, no system display face.

**The Tabular Margin Rule.** Anything numeric in the margin column or a readout is set with `tabular-nums lining-nums` so values line up and change without jitter.

## Layout

The plate is a two-column grid on every structural element (`.plate-head`, `.band`, `.colophon`): `grid-template-columns: var(--margin-w) minmax(0, 1fr)` with `--margin-w: clamp(9.5rem, 17vw, 14rem)`. The margin column is painted once on `body` as a continuous vertical band: the margin tint to `--margin-w - 1px`, a 1px linen-shade edge, then linen. Bands draw only horizontal 1px linen-shade rules on top of it, each rule carrying a 1px by 1rem lichen tick at the margin edge, rotated `90deg - var(--slash)` (20° from vertical, so the tick lies at the slash's 70°). The hero band has no top rule and no tick.

A band opens with its title at the top of the content cell and the intro 1.75rem below it; the margin cell beside the opening holds only real annotations (the contact band's live clock) and is otherwise left empty. Further rows are `.row` elements with `grid-template-columns: subgrid`, one hairline across margin and body alike, the note (`dl.note`) beside the passage it annotates. Horizontal padding is `--gutter: clamp(1.25rem, 3.5vw, 3rem)`; band padding is `--band-pad: clamp(3rem, 7vw, 6rem)` (2.5rem at the bottom of an opening followed by rows); rows pad 1.5rem vertically; the last row of a band closes with `--band-pad`. Content stacks at 1.25rem (0.75rem inside a row). Content cells cap at `calc(var(--measure) + 2 * var(--gutter))`. A row that is ruled out rather than annotated, the refusal, spans both columns with its hatch, margin included.

The hero fills `100svh - 4.2rem` (the plate head's height), with the field absolutely positioned behind, the readouts pinned at the top of the margin (`position: sticky; top: 0`, no bottom padding, so the Zone reading can be watched changing during the descent) and the copy at the bottom of the content cell.

Below 48rem (`max-width: 47.99rem`) the body's painted margin column is dropped and every grid collapses to one column. An empty margin is hidden, and so is the colophon's. A band's own margin note follows its opening as a footnote, untinted and unruled (`order: 1`, padding `0 var(--gutter) 2.5rem`), before the rows (`order: 2`); a row's note follows its passage the same way (`.row-margin { order: 2 }`). The ticks are hidden, the meta list flows into an auto-fit grid of 9rem columns, the readings go to one column, and the hero drops its full-viewport height and its sticky margin for `padding-top: 20vh` on the copy. The nav stays on one line down to a 320px screen: `gap: 0.25rem 0.375rem`, `justify-content: space-between`, the paths shrinking with the viewport; it wraps only when the reader enlarges text, because the size's floor is in rem. From 90rem the measure widens to 70ch.

### Named Rules
**The One Angle Rule.** Every diagonal on the page is the slash's: `--slash: 70deg` from the horizontal. A CSS gradient's angle is measured clockwise from the top and runs perpendicular to its stripes, so the hatch uses `--hatch: calc(180deg - var(--slash))` (110deg) to draw stripes at 70°. No other angle is introduced.

**The Traceable Margin Rule.** Every number in a margin column traces to a file in the repository, a build step or a public URL, and carries a date when it is not computed at build. A value fetched live at build is marked in altitude; a fallback is not. No invented metadata.

**The Footnote Rule.** On a narrow plate the note follows its passage as a footnote. It is never rendered as a label above the heading.

## Elevation & Depth

There is no elevation. No `box-shadow`, no `text-shadow`, no `filter`, no raised surface: the whole page is one sheet. The only stacking is functional: the plate head is `position: relative; z-index: 2`, and within the isolated hero band the field canvas is at z 0 and the margin and copy at z 1. Depth is conveyed by paper: the margin column is a slightly darker shade of the same linen, separated by a 1px rule; excluded terrain (the refusal) is hatched in linen shade at 9px pitch. The hero field's shader adds a fine grain biased toward the linen so it reads as paper tooth; that grain lives inside the field only and is not a page overlay.

### Named Rules
**The One Sheet Rule.** Nothing floats. A region is set apart by a rule, a tint or a hatch drawn in linen shade, never by a shadow or a raised surface.

## Shapes

All corners are square (`border-radius` is never declared; `rounded.none` is `0`). Lines are 1px: rules, hairlines, note dividers, the link underline (2px on hover, `text-underline-offset: 0.18em`), the margin column's edge. The filled button is a rectangle with a 1px border in its own colour. Gradients appear only where they draw structure or data: the body's margin column, the `repeating-linear-gradient` hatch, and the SVG fallback's cool-to-warm stroke on major contours. None is decorative.

The mark is two filled outlines, generated from the self-hosted font by `scripts/mark-outlines.py` into `src/data/mark.ts`. The O is Source Serif 4's own glyph at `opsz` 60, weight 600, its counter a second contour. The slash is not the font's (the font draws it at about 73°): it is redrawn as a filled parallelogram at 70° with the glyph's stem width and height, in oxide. The O sits 80 font units further from the slash than the typeset pair would. The ink fills the box edge to edge (52.39 by 43.4 units), and the slash descends below the O's baseline, so anything centring the mark centres it on the O (`MARK_O_MID`), not on the box.

## Components

### Buttons
- **Shape:** square (radius 0), 1px border matching the fill.
- **Primary (`.button`):** oxide fill, linen text, label type (500, 0.9375rem, line-height 1), padding 0.8rem 1.4rem. Appears twice on the page, in the hero and in the working-languages row of `/how`, both "Book a call". Linen on oxide measures 4.6:1.
- **Hover / Focus:** fill and border go to ink; no transition, no transform. `:focus-visible` uses the global 2px outline, recoloured to ink on the button so it does not read as a link ring.
- **Secondary (`.text-link`):** a plain underlined link in label type (500, 0.9375rem), underline in altitude, 1px going to 2px on hover. In the hero it reads "See what I will not do" and points at the refusal. There is no ghost or outline button.

### Links
- Inherit ink; the underline is altitude, 1px, offset 0.18em; 2px on hover. Owned-site links and the contact email are set in Title display (500, `--fs-h3-display`). The calendar link sits inside a running sentence ("Or book a call directly."), and the LinkedIn profile is a plain link under the role, at body size.

### Navigation (`.path-nav`)
- Path-style anchor labels (the fragment paths themselves: `/problems /work /readings /sites /asked /how /contact`) in label type, no underline at rest, underline on hover, `white-space: nowrap`, flex-wrapped with a 0.25rem by 1.5rem gap, 0.9rem vertical padding. The band in view is marked with `aria-current="true"` and rendered in oxide with an oxide underline. Without JavaScript the nav is a plain list of anchors. Below 48rem it spreads across one line (see Layout).

### The mark (`.mark`, `.mark-inline`)
- In the plate head the mark sits in the margin column, 2.5rem tall with width auto, padded `0.9rem var(--gutter)`: slash oxide, O ink. It links home.
- Inline in the refusal heading it is `.mark-inline`: 0.868em tall, width auto, `vertical-align: -0.16em` (its box runs from the slash's foot 0.16em below the baseline to its top), slash oxide, O in `currentColor`. It stands in for the name in the sentence "/O does not sell the fix it recommends."
- The favicon (`public/favicon.svg`, a linen square) uses the O from the smallest optical size, `opsz` 8, with a 0.8-unit ink stroke on top, and a slash drawn at twice the stem weight, so both survive at 16px.
- The social card (`og.png`, rasterised at build over the resting field) centres the mark on the O in a linen cartouche ruled in linen shade, 220px tall.

### Margin notes (`dl.note`, `dl.meta`)
- Caption type, tabular lining figures, label in italic (`dt`), values roman (`dd`) at 0.1rem stack. Groups in `.meta` are ruled off with 0.75rem padding and a linen-shade hairline above (dropped below 48rem where they flow into an auto-fit grid). A value fetched at build carries `.live` in altitude. In the hero, `.readout` values are 1rem with an italic unit.

### Ruled rows (`.row`)
- The plate's repeating unit: a subgrid row with one linen-shade hairline across both columns, the note in the margin cell and the passage in the content cell, 1.5rem vertical padding, 0.75rem internal stack, h3 at the top with no extra margin. Empty margin cells collapse to zero padding. In the questions band the row's heading is the italic question.

### Refusal field (`.row--refusal`)
- A full-width row of excluded terrain: `repeating-linear-gradient(var(--hatch), var(--linen-shade) 0 1px, transparent 1px 9px)` across both columns, margin included, ruled above by the row hairline and below by a 1px linen-shade rule. Its content pads `clamp(3rem, 6vw, 5rem)` vertically. The heading is one sentence at Headline size (max 18ch) opened by the inline mark; its topic, "What I do not do", is visually hidden for assistive technology. The body follows 1.75rem below. Used once on the page; the sentence that follows it sits in a plain row of its own.

### The field (signature)
- A WebGL2 fragment shader on one quad (`src/hero/field.glsl`) drawing nine isolines of the same noise on linen: minors in lichen at 0.55 alpha and 0.9px, every third contour major at 0.92 alpha and 1.5px, majors coloured from altitude at the summit to oxide at the base. The plot-in lasts 1800ms, majors first, each contour swept left to right; the pointer bends the field with a 0.04 per-frame ease and the isotherm figure in the margin eases toward its value every frame (0.3 per frame) and text is written only when the printed value changes. Reduced motion, no JavaScript and no WebGL2 all receive `/field-rest.svg`, the same field at rest traced at build (`src/hero/plot.js`), and static readouts computed from the CPU port (`src/hero/noise.js`).

## Do's and Don'ts

### Do:
- **Do** draw every structural line in linen shade at 1px; tick band rules with a 1px lichen stroke at the slash's angle.
- **Do** derive any new tint with `color-mix` from two of the six values; the margin tint is the precedent.
- **Do** set every margin number in tabular lining figures, with its label in italic, and mark a build-fetched value with `.live` in altitude.
- **Do** keep the two-column plate on every structural element; open each band with its title in the content column and leave the margin beside it to real annotations only.
- **Do** let notes follow their passage as untinted footnotes below 48rem, and hide an empty margin there.
- **Do** use oxide for the mark's slash and the one filled button, and altitude for links, focus, selection and live values.
- **Do** take the mark from `src/data/mark.ts` (regenerated by `scripts/mark-outlines.py`), never retype it as text or redraw it geometrically, and centre it on the O.
- **Do** serve the field at rest as the build-time SVG under reduced motion, no JavaScript or no WebGL2, with static readouts.
- **Do** keep hero text as the LCP element, painted before any script; never the canvas.
- **Do** trace every margin value to a file, a build step or a public URL, and date it when it is not computed at build.

### Don't:
- **Don't** add a seventh colour value, an alpha-tinted variant or a dark mode.
- **Don't** set text in lichen, at any size.
- **Don't** introduce a `border-radius`, a `box-shadow`, a `text-shadow` or a raised surface.
- **Don't** use a gradient for decoration; gradients draw the margin column, the hatch and the contour poles only.
- **Don't** introduce a second typeface, a monospace or a system display face; use optical size, weight and italic.
- **Don't** add scroll-triggered reveals, parallax, cursor effects, transitions on hover or any authored motion beyond the plot-in, the field's pointer response, the slash cut and the arrival rule and hatch.
- **Don't** introduce a diagonal at any angle other than the slash's 70° (`--slash`); draw hatching with `--hatch: calc(180deg - var(--slash))`, never a hand-typed gradient angle.
- **Don't** put a band title back in the margin column, or fill the margin beside a band's opening with anything that is not a measured annotation.
- **Don't** render a margin note above its heading on a narrow plate; it is a footnote.
- **Don't** add eyebrow labels, 01/02/03 numbering, arrow glyphs on buttons, middle-dot meta strings, one accented headline word, stat tiles or feature cards.

### Recorded detector exceptions
Three design-detector exceptions are pinned in `.impeccable/config.json`, each for `dist/index.html` and `dist/404.html` (and `src/styles/global.css` for the first two), and are decisions of this system, not defects:
- **cream-palette**: the aged linen ground `#e4dfd1` was pinned by the brief (2026-09-16). It is a paper, not the banned cream-plus-terracotta template.
- **gray-on-color**: linen `#e4dfd1` text on the oxide button, the page's one filled button, measured 4.6:1 and confirmed in the plan.
- **cramped-padding** (`dist/` only): padding is set in custom properties the detector cannot resolve; computed values were verified in the browser on 2026-09-16 (`.meta > div` 12px top, `.margin` 44.8px desktop / 20px mobile).

### Recorded system exceptions
- **Card cartouche alpha** (`src/pages/og.png.ts`): the title box on the social card is linen at 0.88 opacity over the field, so the contours read faintly through it, the way a plate lays its title block over the map. It is the one alpha tint in the system, confirmed by the user on 2026-09-23, and it exists only in the rasterised card, never on the page.
