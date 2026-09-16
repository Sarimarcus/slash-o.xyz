/**
 * Keeps every host that is not the real domain out of search results.
 *
 * Cloudflare Pages serves each deployment on `<hash>.<project>.pages.dev` as
 * well as on the custom domain, and those hosts are publicly reachable. Left
 * alone they get indexed, which puts preview copies of the site in search
 * results competing with the domain, and — because every page's canonical URL
 * points at slash-o.xyz — advertising a host that is not the one the content
 * claims to live on.
 *
 * This cannot be done with `public/robots.txt` or `public/_headers`: both are
 * static files served identically to every host, and the decision depends on
 * which host asked. A middleware is the only place that knows.
 *
 * `X-Robots-Tag` rather than robots.txt alone, because robots.txt asks a
 * crawler not to *fetch* while `noindex` tells it not to *list* — and a URL
 * that is merely disallowed can still appear in results from external links.
 * Both are sent here; the header is the one that binds.
 */

/** The only host whose content is meant to be indexed. */
const CANONICAL_HOST = 'slash-o.xyz';

const isCanonical = (hostname) =>
  hostname === CANONICAL_HOST || hostname === `www.${CANONICAL_HOST}`;

export async function onRequest({ request, next }) {
  const { hostname, pathname } = new URL(request.url);

  if (isCanonical(hostname)) return next();

  // A preview host answers robots.txt for itself, not with the real domain's.
  if (pathname === '/robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-robots-tag': 'noindex, nofollow',
        // Short: this file has to start telling the truth the moment the
        // custom domain is attached.
        'cache-control': 'public, max-age=300',
      },
    });
  }

  // Headers on the response from next() are immutable, so re-wrap it.
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('x-robots-tag', 'noindex, nofollow');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
