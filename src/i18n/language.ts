import { LANGUAGES, type Language } from '../content/types'

export const LANGUAGE_STORAGE_KEY = 'akarpavicius-language'
export const LANGUAGE_PARAM = 'lang'
export const DEFAULT_LANGUAGE: Language = 'en'

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}

/**
 * Precedence: an explicit `?lang=` in the URL beats a stored choice, which beats
 * the browser's own preference, which falls back to English.
 *
 * The URL wins so a shared link always opens in the language it was shared in, even
 * for a reader who has picked the other one before.
 */
export function resolveLanguage(
  param: string | null,
  stored: string | null,
  browser: readonly string[],
): Language {
  if (isLanguage(param)) return param
  if (isLanguage(stored)) return stored

  for (const tag of browser) {
    // Match on the primary subtag so "lt-LT" resolves the same as "lt".
    const primary = tag.toLowerCase().split('-')[0]
    if (isLanguage(primary)) return primary
  }

  return DEFAULT_LANGUAGE
}

/** The other language — this site ships exactly two, so the switch is a toggle. */
export function otherLanguage(current: Language): Language {
  return current === 'en' ? 'lt' : 'en'
}
