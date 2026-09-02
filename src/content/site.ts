/** Site-wide constants that are neither copy nor layout. */

export const site = {
  url: 'https://almantask.github.io/me/',
  title: 'Almantas Karpavičius — Engineering Manager, author, mentor',
  description:
    'Engineering Manager at Nord Security. 3× Microsoft MVP, author of two books, conference speaker, and mentor at Idealogue, KTU and Nord Security.',
  ogImage: 'og.jpg',
} as const

/**
 * GitHub Pages cannot process a POST. Leave this `null` and the contact form
 * composes a prefilled `mailto:` instead — no account, no signup, works day one.
 * Set it to a Formspree/Web3Forms endpoint to POST JSON instead.
 */
export const contactFormEndpoint: string | null = null
