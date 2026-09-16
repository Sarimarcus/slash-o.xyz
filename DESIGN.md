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
    fontSize: "clamp(1.75rem, 1.45rem + 1.1vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.005em"
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
  margin-note:
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: "1.5rem 0"
  margin-note-live:
    textColor: "{colors.altitude}"
  refusal-field:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.75rem 0"
---

# Design System: Slash O

## Overview

**Creative North Star: "The Annotated Plate"**

The page is one scientific plate read as a descent: a narrow margin column carrying only true measurements, a body of text beside it, and at the top a machine plotting isolines live. Everything is drawn on a single sheet of aged linen. Structure is not a second surface but a darker shade of the same paper: 1px rules, the tinted margin column, hatching. Text is a deep green-black ink, hairlines and minor contours are lichen, and two poles (altitude blue, oxide) belong to the field and reach the page only three times: the mark's slash, the one filled button, and the live/altitude accents (links, focus, selection, live readings).

Density is that of a printed plate, not a dashboard. Six colour values, one typeface with its optical-size axis, one angle for every hatch and tick (the slash's, 70° from horizontal). Square corners, no shadows, no gradient used as decoration, no dark mode. The plate refuses the consultancy landing page: no split hero, no feature cards, no stat tiles, no scroll reveals, no contact form, and no depiction of AI.

There is one authored motion on the page, the plot-in of the hero field (1.8s), followed by the field bending slowly under the pointer. Nothing else moves on scroll or on entry. Under reduced motion, no JavaScript or no WebGL2 the same field at rest is served as an SVG plotted at build.

**Key Characteristics:**
- One sheet: linen ground, structure in linen shade, ink for text; the margin tint is derived with `color-mix`, not a seventh value
- Margin column of measured facts, ruled rows, subgrid alignment; below 48rem the margin becomes a header row and notes become footnotes
- One face (Source Serif 4, `opsz` + `wght`), tabular lining figures wherever numbers sit in the margin
- One angle: `--slash: 70deg` for the mark, the lichen ticks and the hatched refusal field (`--hatch: 160deg` is its gradient complement)
- Square corners, no shadows, no decorative gradients, one authored motion, no scroll-triggered reveals
- Every margin number traces to a file, a build step or a public URL and carries a date when it is not computed at build

## Colors

A single sheet of aged paper with its own shade for structure, ink for text, lichen for hairlines, and two poles that belong to the field.

### Primary
- **Oxide** (#9c4b2f): the warm pole. Major contours at the base of the field, the mark's slash (once in the SVG mark, once inline in the refusal's running text), the current nav item, the caret, and the background of the page's one filled button. Never a text colour on linen apart from the current nav link and the inline slash.

### Secondary
- **Altitude blue** (#3c5a6b): the cool pole. Major contours at the summit of the field, link underline colour, `:focus-visible` outline (2px, offset 3px), `::selection` background, `accent-color`, and the `.live` colour on a margin value that was fetched at build rather than recorded.

### Tertiary
- **Lichen** (#6e7f5c): hairlines only. The minor contours in the field, the 1px angled tick where a band rule crosses the margin edge, the scrollbar thumb. It never carries text; its contrast on linen is not a text contrast.

### Neutral
- **Linen** (#e4dfd1): the ground of every surface, the hero field's paper, the text colour on the filled button, the `theme-color`.
- **Linen shade** (#d3ccba): every structural line: band rules, row hairlines, the margin column's 1px edge, the note dividers, the hatching of the refusal field, the scrollbar track. Also one half of the margin tint.
- **Deep ink** (#24302b): all running text, headings, the mark's O, the filled button's hover background and border.
- **Margin tint** (derived): `color-mix(in srgb, var(--linen) 55%, var(--linen-shade))`, the fill of the margin column on desktop and of the band header row below 48rem. It is a mix of two existing values, never a new hex.

### Named Rules
**The Six Values Rule.** The palette is six hex values and nothing else. A new tone is a `color-mix` of two of them or it does not exist; there is no dark mode and no alpha-tinted variant.

**The Lichen Is Not Text Rule.** Lichen draws 1px hairlines, ticks and minor contours. It never sets type, not even a caption.

**The Two Poles Rule.** Altitude blue and oxide are the field's temperature poles first. On the page, oxide fills one button and cuts one slash; altitude marks what is live, linked, focused or selected. Neither is a brand wash: no oxide headings, no blue panels.

## Typography

**Display Font:** Source Serif 4 variable (`opsz` + `wght`, 400 to 600), with a metric-adjusted `Source Serif Fallback` (Georgia, `size-adjust: 95%`) then Georgia, serif
**Body Font:** the same face; `font-optical-sizing: auto` lets the optical-size axis do the display/text distinction
**Label/Mono Font:** none; figures in the margin are set in the same face with `tabular-nums lining-nums`

**Character:** one serif, doing everything from a 5.5rem headline to a 13px margin note, differentiated by optical size, weight (400, 500, 560, 600) and italic rather than by a second family. Labels in the margin are italic; values are roman, tabular.

### Hierarchy
- **Display** (560, `clamp(2.75rem, 2rem + 4.1vw, 5.5rem)`, 1.02, -0.01em): the h1 only, balanced, max 14ch on desktop. It is the LCP element and paints before any script.
- **Headline** (500, `clamp(1.75rem, 1.45rem + 1.1vw, 2.25rem)`, 1.12, -0.005em): band titles, set in the margin column, `text-wrap: balance`.
- **Title** (500, `clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)`, 1.3): h3 inside a row or the refusal field; also the weight and size of the owned-site links and the contact email.
- **Lede** (400, same size as Title, 1.45): the hero lede (max 52ch) and each band's `.intro`.
- **Body** (400, `clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)`, 1.55): running text, measure 66ch (70ch from 90rem).
- **Label** (500, 0.9375rem, line-height 1 on the button): the nav paths, the filled button, the text link.
- **Caption** (400, 0.8125rem, 1.35, `tabular-nums lining-nums`): every margin note and readout; the colophon at 1.5 line height. Labels (`dt`) italic, values (`dd`) roman.

### Named Rules
**The One Face Rule.** Source Serif 4 is the only family. Hierarchy comes from optical size, four weights and italic. No second face, no monospace, no system display face.

**The Tabular Margin Rule.** Anything numeric in the margin column or a readout is set with `tabular-nums lining-nums` so values line up and change without jitter.

## Layout

The plate is a two-column grid on every structural element (`.plate-head`, `.band`, `.colophon`): `grid-template-columns: var(--margin-w) minmax(0, 1fr)` with `--margin-w: clamp(9.5rem, 17vw, 14rem)`. The margin column is painted once on `body` as a continuous vertical band: the margin tint to `--margin-w - 1px`, a 1px linen-shade edge, then linen. Bands draw only horizontal 1px linen-shade rules on top of it, each rule carrying a 1px by 1rem lichen tick at the margin edge, rotated `90deg - var(--slash)` (20° from vertical, so the tick lies at the slash's 70°). The hero band has no top rule and no tick.

A band's first row places the h2 in the margin and the intro in the content cell; further rows are `.row` elements with `grid-template-columns: subgrid`, one hairline across margin and body alike, the note (`dl.note`) beside the passage it annotates. Horizontal padding is `--gutter: clamp(1.25rem, 3.5vw, 3rem)`; band padding is `--band-pad: clamp(3rem, 7vw, 6rem)`; rows pad 1.5rem vertically; the last row of a band closes with `--band-pad`. Content stacks at 1.25rem (0.75rem inside a row); an h3 opens with 2.5rem above and 0.5rem below. Content cells cap at `calc(var(--measure) + 2 * var(--gutter))`.

Below 48rem (`max-width: 47.99rem`) the body's painted margin column is dropped, every grid collapses to one column, the band's margin cell becomes a tinted header row (`--margin-tint` fill, 1px linen-shade bottom rule, 2rem top padding), the ticks are hidden, notes move below their passage as footnotes (`.row-margin { order: 2 }`), the meta list flows into an auto-fit grid of 9rem columns, and the hero drops its full-viewport height for `padding-top: 20vh` on the copy. From 90rem the measure widens to 70ch.

The hero fills `100svh - 4.2rem` (the plate head's height), with the field absolutely positioned behind, readouts at the top of the margin and the copy at the bottom of the content cell.

### Named Rules
**The One Angle Rule.** Every diagonal on the page is the slash's: `--slash: 70deg` from the horizontal. CSS gradients that draw stripes use `--hatch: 160deg`, its perpendicular. No other angle is introduced.

**The Traceable Margin Rule.** Every number in a margin column traces to a file in the repository, a build step or a public URL, and carries a date when it is not computed at build. A value fetched live at build is marked in altitude; a fallback is not. No invented metadata.

**The Footnote Rule.** On a narrow plate the note follows its passage as a footnote. It is never rendered as a label above the heading.

## Elevation & Depth

There is no elevation. No `box-shadow`, no `text-shadow`, no `filter`, no layering of surfaces: the whole page is one sheet, and the only two stacked elements are the hero's field canvas (z 0) and the hero copy above it (z 1) within an isolated band. Depth is conveyed by paper: the margin column is a slightly darker shade of the same linen, separated by a 1px rule; excluded terrain (the refusal) is hatched in linen shade at 9px pitch. The hero field's shader adds a fine grain biased toward the linen so it reads as paper tooth; that grain lives inside the field only and is not a page overlay.

### Named Rules
**The One Sheet Rule.** Nothing floats. A region is set apart by a rule, a tint or a hatch drawn in linen shade, never by a shadow or a raised surface.

## Shapes

All corners are square (`border-radius` is never declared; `rounded.none` is `0`). Lines are 1px: rules, hairlines, note dividers, the link underline (2px on hover, `text-underline-offset: 0.18em`), the margin column's edge. The mark is two strokes at the same 5-unit width in a 64 by 40 viewBox: a slash from (22,36) to (34,4) in oxide, a circle of radius 13.5 in ink, so the slash cuts the paper rather than sitting beside the letter. The filled button is a rectangle with a 1px border in its own colour. Gradients appear only where they draw structure or data: the body's margin column, the `repeating-linear-gradient` hatch, and the SVG fallback's cool-to-warm stroke on major contours. None is decorative.

## Components

### Buttons
- **Shape:** square (radius 0), 1px border matching the fill.
- **Primary (`.button`):** oxide fill, linen text, label type (500, 0.9375rem, line-height 1), padding 0.8rem 1.4rem. Appears twice on the page (hero, terms), both "Book a diagnostic". Linen on oxide measures 4.6:1.
- **Hover / Focus:** fill and border go to ink; no transition, no transform. `:focus-visible` uses the global 2px outline, recoloured to ink on the button so it does not read as a link ring.
- **Secondary (`.text-link`):** a plain underlined link in label type (500, 0.9375rem), underline in altitude, 1px going to 2px on hover. There is no ghost or outline button.

### Links
- Inherit ink; the underline is altitude, 1px, offset 0.18em; 2px on hover. Owned-site links and the contact email are set at Title size and weight 500.

### Navigation (`.path-nav`)
- Path-style anchor labels (the fragment paths themselves) in label type, no underline at rest, underline on hover, flex-wrapped with a 0.25rem by 1.5rem gap (1.1rem below 48rem), 0.9rem vertical padding. The band in view is marked with `aria-current="true"` and rendered in oxide with an oxide underline. Without JavaScript the nav is a plain list of anchors. The mark sits in the margin column at 3.25rem wide.

### Margin notes (`dl.note`, `dl.meta`)
- Caption type, tabular lining figures, label in italic (`dt`), values roman (`dd`) at 0.1rem stack. Groups in `.meta` are ruled off with 0.75rem padding and a linen-shade hairline above (dropped below 48rem where they flow into an auto-fit grid). A value fetched at build carries `.live` in altitude. In the hero, `.readout` values are 1rem with an italic unit.

### Ruled rows (`.row`)
- The plate's repeating unit: a subgrid row with one linen-shade hairline across both columns, the note in the margin cell and the passage in the content cell, 1.5rem vertical padding, 0.75rem internal stack, h3 at the top with no extra margin. Empty margin cells collapse to zero padding.

### Refusal field (`.refusal`)
- A block of excluded terrain: `repeating-linear-gradient(var(--hatch), var(--linen-shade) 0 1px, transparent 1px 9px)` on linen, ruled top and bottom in linen shade, padding 1.75rem by `--gutter`. The inline `/O` in its lead sets the slash in oxide. Used once on the page.

### The field (signature)
- A WebGL2 fragment shader on one quad (`src/hero/field.glsl`) drawing nine isolines of the same noise on linen: minors in lichen at 0.55 alpha and 0.9px, every third contour major at 0.92 alpha and 1.5px, majors coloured from altitude at the summit to oxide at the base. The plot-in lasts 1800ms, majors first, each contour swept left to right; the pointer bends the field with a 0.04 per-frame ease and the margin readouts update every 100ms. Reduced motion, no JavaScript and no WebGL2 all receive `/field-rest.svg`, the same field at rest traced at build (`src/hero/plot.js`), and static readouts computed from the CPU port (`src/hero/noise.js`).

## Do's and Don'ts

### Do:
- **Do** draw every structural line in linen shade at 1px; tick band rules with a 1px lichen stroke at the slash's angle.
- **Do** derive any new tint with `color-mix` from two of the six values; the margin tint is the precedent.
- **Do** set every margin number in tabular lining figures, with its label in italic, and mark a build-fetched value with `.live` in altitude.
- **Do** keep the two-column plate on every structural element and let the margin become a tinted header row, and notes become footnotes, below 48rem.
- **Do** use oxide for the mark's slash and the one filled button, and altitude for links, focus, selection and live values.
- **Do** serve the field at rest as the build-time SVG under reduced motion, no JavaScript or no WebGL2, with static readouts.
- **Do** trace every margin value to a file, a build step or a public URL, and date it when it is not computed at build.

### Don't:
- **Don't** add a seventh colour value, an alpha-tinted variant or a dark mode.
- **Don't** set text in lichen, at any size.
- **Don't** introduce a `border-radius`, a `box-shadow`, a `text-shadow` or a raised surface.
- **Don't** use a gradient for decoration; gradients draw the margin column, the hatch and the contour poles only.
- **Don't** introduce a second typeface, a monospace or a system display face; use optical size, weight and italic.
- **Don't** add scroll-triggered reveals, parallax, cursor effects, transitions on hover or any authored motion beyond the plot-in and the field's pointer response.
- **Don't** introduce a diagonal at any angle other than 70° (`--slash`) or its gradient complement `--hatch: 160deg`.
- **Don't** render a margin note above its heading on a narrow plate; it is a footnote.
- **Don't** add eyebrow labels, 01/02/03 numbering, arrow glyphs on buttons, middle-dot meta strings, one accented headline word, stat tiles or feature cards.

### Recorded detector exceptions
Three design-detector exceptions are pinned in `.impeccable/config.json` and are decisions of this system, not defects:
- **cream-palette** on `dist/index.html` and `src/styles/global.css`: the aged linen ground `#e4dfd1` was pinned by the brief (2026-09-16). It is a paper, not the banned cream-plus-terracotta template.
- **gray-on-color** on the same files: linen `#e4dfd1` text on the oxide button, the page's one filled button, measured 4.6:1 and confirmed in the plan.
- **cramped-padding** on `dist/index.html`: padding is set in custom properties the detector cannot resolve; computed values were verified in the browser on 2026-09-16 (`.meta > div` 12px top, `.margin` 44.8px desktop / 20px mobile).
