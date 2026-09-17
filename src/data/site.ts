/**
 * Single source of truth for everything that identifies the site.
 *
 * `astro.config.mjs` reads SITE_URL from here so the canonical origin is
 * declared once: the sitemap, the canonical link and the Open Graph tags all
 * derive from this value rather than each hard-coding the domain.
 *
 * Strings that start with `TODO(content)` are placeholders. `npm run todo`
 * lists them; `isPlaceholder()` lets a component hide a link that is still fake.
 */

/** Canonical origin. No trailing slash: everything else appends its own path. */
export const SITE_URL = 'https://slash-o.xyz';

export const SITE = {
  /** Used as the <title> suffix and the Open Graph site name. */
  name: 'Slash O',
  /** The mark as written. */
  mark: '/O',
  tagline: 'Evidence before intervention.',
  description:
    'Independent advisory CTO for digital media groups. I measure how the engineering behaves before anyone changes it, coding agents included. I never sell the fix.',
  /** BCP 47 tag for <html lang>. */
  locale: 'en',
  /** Open Graph wants the underscored form. */
  ogLocale: 'en_GB',
  /** Alt text for /og.png, the social card. */
  ogImageAlt:
    'The plate: the hero field at rest, drawn as isolines, with the slash-O mark set in a cartouche over it.',
  /** Public repository, cited in the colophon. */
  repo: 'https://github.com/Sarimarcus/slash-o.xyz',
} as const;

export const PERSON = {
  firstName: 'Olivier',
  /** TODO(content): surname. */
  surname: 'TODO(content): surname',
  role: 'Engineering Manager at Webedia Group, Madrid',
  city: 'Madrid',
  /** IANA zone for the contact band's clock. */
  timeZone: 'Europe/Madrid',
  /** The address that receives enquiries. */
  email: 'hello@slash-o.xyz',
  /** Booking page. The primary button points here; email is the fallback. */
  calendar: 'https://calendar.proton.me/bookings#Z2PrOwwdoCL1ehvCZ_DK88_3T2FkLV756Yuj8DU3Q-Y=',
  languages: ['English', 'French', 'Spanish'],
} as const;

/** True while a value is still a placeholder. */
export const isPlaceholder = (value: string): boolean => value.startsWith('TODO');

/** Full name, or the first name alone while the surname is a placeholder. */
export const displayName = (): string =>
  isPlaceholder(PERSON.surname) ? PERSON.firstName : `${PERSON.firstName} ${PERSON.surname}`;
