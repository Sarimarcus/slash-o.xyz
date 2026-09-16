/**
 * Single source of truth for everything that identifies the site.
 *
 * `astro.config.mjs` reads SITE_URL from here so the canonical origin is
 * declared once: the sitemap, the canonical link and the Open Graph tags all
 * derive from this value rather than each hard-coding the domain.
 *
 * The strings below are placeholders until the real copy arrives — `npm run
 * todo` lists what is still fake.
 */

/** Canonical origin. No trailing slash: everything else appends its own path. */
export const SITE_URL = 'https://slash-o.xyz';

export const SITE = {
  /** Used as the <title> suffix and the Open Graph site name. */
  name: 'Slash-O',
  /** TODO(content): the one line that says what this is. */
  tagline: 'TODO(content): tagline',
  /** TODO(content): ~155 characters, the default meta description. */
  description: 'TODO(content): description',
  /** BCP 47 tag for <html lang>. */
  locale: 'en',
  /** Open Graph wants the underscored form. */
  ogLocale: 'en_US',
} as const;

/** True while a value is still a placeholder — components use this to hide dead links. */
export const isPlaceholder = (value: string): boolean => value.startsWith('TODO');
