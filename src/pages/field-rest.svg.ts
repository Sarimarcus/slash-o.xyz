/**
 * /field-rest.svg: the hero field at rest, plotted at build time.
 *
 * Shown by CSS only to visitors who never get the live canvas (reduced motion,
 * JavaScript disabled, no WebGL2). Same noise, same seed 0 and 16:9 plate as
 * the static readouts in Hero.astro, so the margin describes this picture.
 */
import type { APIRoute } from 'astro';
import { fieldRestSvg } from '@/hero/plot.js';

export const GET: APIRoute = () => {
  const svg = fieldRestSvg({
    width: 1600,
    height: 900,
    cols: 200,
    rows: 112,
    seed: 0,
    colors: { paper: '#e4dfd1', minor: '#6e7f5c', cool: '#3c5a6b', warm: '#9c4b2f' },
  });
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
