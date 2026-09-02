const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/** `2023-10` -> `Oct 2023`. */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  const index = Number(month) - 1
  return `${MONTHS[index] ?? month} ${year}`
}

/** `null` end means the role is current. */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'present'}`
}

/** Sortable key, so ordering never depends on the string format. */
export function monthKey(value: string): number {
  const [year, month] = value.split('-')
  return Number(year) * 12 + Number(month)
}
