/** Shapes for every piece of content on the site. Components render these; they never hold copy. */

export interface Link {
  readonly label: string
  readonly href: string
}

export interface Role {
  readonly id: string
  readonly role: string
  readonly org: string
  /** ISO-ish `YYYY-MM`. Used for sorting and for the rendered date range. */
  readonly start: string
  /** `null` means "present". */
  readonly end: string | null
  readonly summary: string
  readonly highlights: readonly string[]
  readonly tech: readonly string[]
  /** Featured roles render expanded; the rest sit behind the disclosure. */
  readonly featured: boolean
}

export interface Project {
  readonly id: string
  readonly name: string
  readonly years: string
  readonly blurb: string
  readonly tech: readonly string[]
  readonly href: string
  /** Optional flourish, e.g. "1000+ stars". */
  readonly badge?: string
}

export interface Talk {
  readonly id: string
  readonly year: number
  readonly events: readonly string[]
  readonly title: string
  readonly href?: string
}

export interface Award {
  readonly id: string
  readonly title: string
  readonly years: string
  readonly blurb: string
  readonly href?: string
}

export interface Book {
  readonly id: string
  readonly title: string
  readonly publisher: string
  readonly year: number
  readonly credit: string
  readonly blurb: string
  readonly href: string
}

export interface CommunityItem {
  readonly id: string
  readonly title: string
  readonly period: string
  readonly blurb: string
  readonly links: readonly Link[]
}

export interface Stat {
  readonly id: string
  readonly value: number
  readonly prefix?: string
  readonly suffix?: string
  readonly label: string
}

export interface Section {
  readonly id: string
  readonly label: string
}
