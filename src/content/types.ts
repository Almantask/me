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

/* ------------------------------------------------------------------ *
 * Localisation
 * ------------------------------------------------------------------ */

export const LANGUAGES = ['en', 'lt'] as const
export type Language = (typeof LANGUAGES)[number]

export interface Profile {
  readonly name: string
  readonly role: string
  readonly org: string
  /** The one line that should stick if a reader takes nothing else away. */
  readonly tagline: string
  readonly intro: string
  readonly location: string
  readonly email: string
}

export interface Education {
  readonly id: string
  readonly qualification: string
  readonly institution: string
  readonly period: string
  readonly note: string
}

export interface Quote {
  readonly text: string
  readonly source: string
  readonly note: string
}

/** Chrome and section furniture — everything that is not CV content. */
export interface UiStrings {
  readonly skipToContent: string
  readonly switchToDark: string
  readonly switchToLight: string
  readonly switchLanguage: string
  readonly heroCtaContact: string
  readonly heroCtaWork: string
  readonly heroFactsLabel: string
  readonly heroPhotoAlt: string
  readonly sectionsNavLabel: string

  readonly aboutEyebrow: string
  readonly aboutTitle: string
  readonly educationHeading: string
  readonly languagesHeading: string

  readonly experienceEyebrow: string
  readonly experienceTitle: string
  readonly experienceLede: string
  readonly showEarlierRoles: (count: number) => string
  readonly hideEarlierRoles: string
  readonly present: string
  readonly techLabel: (org: string) => string

  readonly projectsEyebrow: string
  readonly projectsTitle: string
  readonly projectsLede: string
  readonly openProject: string

  readonly speakingEyebrow: string
  readonly speakingTitle: string
  readonly speakingLede: string
  readonly watchTalk: string
  readonly watchTalkContext: string

  readonly communityEyebrow: string
  readonly communityTitle: string

  readonly writingEyebrow: string
  readonly writingTitle: string
  readonly awardsHeading: string
  readonly findOnAmazon: string

  readonly beyondEyebrow: string
  readonly beyondTitle: string

  readonly contactEyebrow: string
  readonly contactTitle: string
  readonly contactLede: string
  readonly directHeading: string
  readonly elsewhereHeading: string
  readonly formName: string
  readonly formEmail: string
  readonly formMessage: string
  readonly formCompany: string
  readonly formSubmit: string
  readonly errorName: string
  readonly errorEmailMissing: string
  readonly errorEmailInvalid: string
  readonly errorMessage: string
  readonly statusSending: string
  readonly statusSent: string
  readonly statusFailed: string
  readonly statusHandedOff: string
  readonly mailSubject: (name: string) => string

  readonly footerNote: string
  readonly metaTitle: string
  readonly metaDescription: string
}

/** Everything the page renders, for one language. */
export interface ContentBundle {
  readonly profile: Profile
  readonly socials: readonly Link[]
  readonly heroFacts: readonly string[]
  readonly about: readonly string[]
  readonly quote: Quote
  readonly hobbies: readonly string[]
  readonly beyond: string
  readonly spokenLanguages: readonly string[]
  readonly education: readonly Education[]
  readonly sections: readonly Section[]
  readonly experience: readonly Role[]
  readonly projects: readonly Project[]
  readonly talks: readonly Talk[]
  readonly mentorshipBeats: readonly string[]
  readonly mentorshipLede: string
  readonly stats: readonly Stat[]
  readonly community: readonly CommunityItem[]
  readonly awards: readonly Award[]
  readonly books: readonly Book[]
  readonly ui: UiStrings
}
