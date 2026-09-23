/**
 * /og.png: the social card, 1200x630.
 *
 * The page exists to be forwarded — to a CEO, a board, a colleague — and a
 * forwarded link is rendered by Slack, LinkedIn or a mail client as a card. It
 * had no image, so it rendered as a blank.
 *
 * The card is the plate: the same field the hero plots, at rest, from the same
 * noise and the same seed 0 as /field-rest.svg, with the mark set in a
 * cartouche over it.
 *
 * It carries no type. Rasterising text here would mean a system font on the
 * build machine, which CI does not have and which would not be Source Serif
 * anyway. The mark is already outlines (src/data/mark.ts), so it needs no font.
 * The title and description beside the card are the platform's job, and they
 * come from the Open Graph tags in Base.astro.
 */
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { fieldRestSvg } from '@/hero/plot.js';
import { MARK_BOX, MARK_O_MID, MARK_SLASH, MARK_O } from '@/data/mark';

const W = 1200;
const H = 630;

/** The cartouche, and the centre the mark is set on. */
const CARD = { x: 300, y: 150, w: 600, h: 330, cx: 600, cy: 315 };

// The palette, as in global.css. Hard-coded because this is rasterised at
// build time, with no stylesheet to read them from.
const LINEN = '#e4dfd1';
const SHADE = '#d3ccba';
const INK = '#24302b';
const LICHEN = '#6e7f5c';
const ALTITUDE = '#3c5a6b';
const OXIDE = '#9c4b2f';

export const GET: APIRoute = async () => {
  const plate = fieldRestSvg({
    width: W,
    height: H,
    cols: 260,
    rows: 136,
    seed: 0,
    colors: { paper: LINEN, minor: LICHEN, cool: ALTITUDE, warm: OXIDE },
  });

  // Centred across on the box, which the ink fills edge to edge, and down on
  // the O: the slash descends below the baseline, so the box centre sits low.
  // 220px tall inside the 330px cartouche.
  const scale = 220 / MARK_BOX.h;
  const x = CARD.cx - (MARK_BOX.w / 2) * scale;
  const y = CARD.cy - MARK_O_MID * scale;

  // A cartouche, the way a plate carries its title block: the field is quieted
  // under the mark rather than cropped, as the hero quiets it under the copy.
  // The 0.88 alpha is the system's one recorded alpha tint (DESIGN.md).
  const card =
    `<rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" fill="${LINEN}" fill-opacity="0.88" stroke="${SHADE}" stroke-width="2"/>` +
    `<g transform="translate(${x} ${y}) scale(${scale})">` +
    `<path d="${MARK_SLASH}" fill="${OXIDE}"/>` +
    `<path d="${MARK_O}" fill="${INK}"/>` +
    `</g>`;

  const svg = plate
    .replace('<svg xmlns', `<svg width="${W}" height="${H}" xmlns`)
    .replace('</svg>', `${card}</svg>`);

  const png = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
