/**
 * Astro integration that fills the colophon with facts computed at build time.
 *
 * The page carries two tokens, `%%COMMIT%%` and `%%PAGE_KB%%`. After the build,
 * this hook replaces them in dist/index.html with:
 *
 *   - the short commit SHA the page was built from (CF_PAGES_COMMIT_SHA on
 *     Cloudflare Pages, `git rev-parse` elsewhere; "working tree" if neither);
 *   - the kilobytes a first visit transfers before the hero chunk is even
 *     requested: the gzipped HTML (the stylesheet is inlined into it), the
 *     gzipped page module scripts it references, and the two font files (the
 *     roman on the h1, the italic on the margin labels, both in the first
 *     viewport). The number includes itself; a fixed-width token keeps that
 *     stable.
 *
 * Nothing here is typed by hand, which is the point of a colophon on a site that
 * sells measurement.
 */
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const gz = (buf) => gzipSync(buf, { level: 9 }).length;

function commitSha() {
  if (process.env.CF_PAGES_COMMIT_SHA) return process.env.CF_PAGES_COMMIT_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'working tree';
  }
}

export default function provenance() {
  return {
    name: 'slash-o:provenance',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const indexPath = join(out, 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        // External stylesheets, if any (none while inlineStylesheets is 'always';
        // inline <style> is already inside the HTML measurement).
        const cssFiles = [...html.matchAll(/href="(\/_astro\/[^"]+\.css)"/g)].map((m) => m[1]);
        const cssBytes = cssFiles.reduce((n, f) => n + gz(readFileSync(join(out, f))), 0);
        // Page module scripts (nav highlighter, clock, hero gate). The hero chunk
        // itself is dynamically imported later and is not counted.
        const jsFiles = [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
        const jsBytes = jsFiles.reduce((n, f) => n + gz(readFileSync(join(out, f))), 0);
        const fontDir = join(out, 'fonts');
        const fontBytes = readdirSync(fontDir)
          .filter((f) => f.endsWith('.woff2'))
          .reduce((n, f) => n + statSync(join(fontDir, f)).size, 0);

        // Measure with the tokens already at their final width so the number
        // does not change the size it reports.
        const sha = commitSha();
        const probe = html.replace('%%COMMIT%%', sha).replace('%%PAGE_KB%%', '000');
        const htmlBytes = gz(Buffer.from(probe));
        const kb = Math.round((htmlBytes + cssBytes + jsBytes + fontBytes) / 1024);

        html = html.replace('%%COMMIT%%', sha).replace('%%PAGE_KB%%', String(kb));
        writeFileSync(indexPath, html);
        logger.info(
          `colophon: commit ${sha}, ${kb} KB before the hero chunk (html ${htmlBytes} + css ${cssBytes} + js ${jsBytes} + fonts ${fontBytes} bytes, gzipped where text)`,
        );
      },
    },
  };
}
