/**
 * /og.png: the social card, 1200x630.
 *
 * The page exists to be forwarded — to a CEO, a board, a colleague — and a
 * forwarded link is rendered by Slack, LinkedIn or a mail client as a card. It
 * had no image, so it rendered as a blank.
 *
 * The card is the plate: the same field the hero plots, at rest, from the same
 * noise and the same seed 0 as /field-rest.svg, with the mark set in a
 * cartouche over it. This is the only surface where the mark is big enough to
 * carry its measured form, so this is where src/data/mark.ts is used.
 *
 * It carries no type. Rasterising text here would mean either a system font on
 * the build machine, which CI does not have and which would not be Source Serif
 * anyway, or a font library to convert glyphs to outlines. The card is an
 * image; the title and description beside it are the platform's job, and they
 * come from the Open Graph tags in Base.astro.
 */
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { fieldRestSvg } from '@/hero/plot.js';
import { MARK_SLASH, MARK_O_CUT } from '@/data/mark';

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

  // The mark is centred on its ink, not on its viewBox. The viewBox is 64 wide
  // but the drawn mark runs x 19.66 to 63.5 once the 5-wide strokes are counted
  // (the slash's cap extends 2.34 either side at 70deg), so its optical centre
  // is 41.58, not 32. Centring the box instead pushes the mark visibly right.
  const MARK_INK = { cx: 41.58, cy: 20, w: 43.84 };
  // Ink 316px wide inside the 600x330 cartouche: the O lands at ~97px radius,
  // past the ~100px diameter where the field displacement starts to read.
  const scale = 316 / MARK_INK.w;
  const x = CARD.cx - MARK_INK.cx * scale;
  const y = CARD.cy - MARK_INK.cy * scale;

  // A cartouche, the way a plate carries its title block: the field is quieted
  // under the mark rather than cropped, as the hero quiets it under the copy.
  const card =
    `<rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" fill="${LINEN}" fill-opacity="0.88" stroke="${SHADE}" stroke-width="2"/>` +
    `<g transform="translate(${x} ${y}) scale(${scale})">` +
    `<path d="${MARK_SLASH}" fill="none" stroke="${OXIDE}" stroke-width="5" stroke-linecap="butt"/>` +
    `<path d="${MARK_O_CUT}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>` +
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
