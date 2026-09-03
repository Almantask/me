import type { ContentBundle, Language } from './types'
import { en } from './en'
import { lt } from './lt'

/** Every language the site ships. Keyed by the code used in the URL and in storage. */
export const bundles: Readonly<Record<Language, ContentBundle>> = { en, lt }

/** Shown on the language switch itself. */
export const languageNames: Readonly<Record<Language, string>> = {
  en: 'English',
  lt: 'Lietuvių',
}
