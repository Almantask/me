import type { Language } from '../content/types'

/**
 * `2023-10` -> `Oct 2023` in English, `10/2023` in Lithuanian.
 *
 * Lithuanian's CLDR abbreviated months are numeric, which is also exactly how the
 * Lithuanian CV writes date ranges. Rather than special-casing the language, join on
 * whether the abbreviation came back as digits — that stays right for any locale
 * added later.
 */
export function formatMonth(value: string, locale: Language): string {
  const [year, month] = value.split('-')
  const date = Date.UTC(Number(year), Number(month) - 1, 1)
  const short = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(date)

  return /^\d+$/.test(short) ? `${short}/${year}` : `${short} ${year}`
}

/** `null` end means the role is current, so the caller supplies the wording. */
export function formatRange(
  start: string,
  end: string | null,
  locale: Language,
  presentLabel: string,
): string {
  return `${formatMonth(start, locale)} — ${end ? formatMonth(end, locale) : presentLabel}`
}

/** Sortable key, so ordering never depends on the display format. */
export function monthKey(value: string): number {
  const [year, month] = value.split('-')
  return Number(year) * 12 + Number(month)
}
