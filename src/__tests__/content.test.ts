import { describe, expect, it } from 'vitest'
import { bundles } from '../content'
import { LANGUAGES, type ContentBundle, type Language } from '../content/types'
import { monthKey } from '../lib/dates'

const entries = Object.entries(bundles) as [Language, ContentBundle][]

const collectionsOf = (bundle: ContentBundle) => ({
  experience: bundle.experience,
  projects: bundle.projects,
  talks: bundle.talks,
  community: bundle.community,
  awards: bundle.awards,
  books: bundle.books,
  stats: bundle.stats,
  sections: bundle.sections,
  education: bundle.education,
  values: bundle.values,
})

describe.each(entries)('%s content', (_language, bundle) => {
  const collections = Object.entries(collectionsOf(bundle))

  it.each(collections)('%s has unique ids', (_name, items) => {
    const ids = items.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(collections)('%s is not empty', (_name, items) => {
    expect(items.length).toBeGreaterThan(0)
  })

  it('lists experience in reverse-chronological order', () => {
    const keys = bundle.experience.map((role) => monthKey(role.start))
    expect(keys).toEqual(keys.toSorted((a, b) => b - a))
  })

  it('ends every role either in the past or as current', () => {
    for (const role of bundle.experience) {
      if (role.end === null) continue
      expect(monthKey(role.end)).toBeGreaterThan(monthKey(role.start))
    }
  })

  it('features the most recent roles, not an arbitrary subset', () => {
    const featured = bundle.experience.filter((role) => role.featured)
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.length).toBeLessThan(bundle.experience.length)
    expect(bundle.experience.slice(0, featured.length).every((role) => role.featured)).toBe(true)
  })

  it('fills in every UI string', () => {
    for (const [key, value] of Object.entries(bundle.ui)) {
      if (typeof value === 'function') continue
      expect(value, `ui.${key}`).toBeTruthy()
    }
  })
})

describe.each(entries)('%s outbound links', (_language, bundle) => {
  const urls = [
    ...bundle.socials.map((social) => social.href),
    ...bundle.projects.map((project) => project.href),
    ...bundle.books.map((book) => book.href),
    ...bundle.talks.flatMap((talk) => (talk.href ? [talk.href] : [])),
    ...bundle.awards.flatMap((award) => (award.href ? [award.href] : [])),
    ...bundle.community.flatMap((item) => item.links.map((link) => link.href)),
  ]

  it.each(urls)('%s is a parseable https URL', (url) => {
    expect(() => new URL(url)).not.toThrow()
    expect(new URL(url).protocol).toBe('https:')
  })

  it('does not link to the mobile YouTube host', () => {
    expect(urls.some((url) => url.includes('m.youtube.com'))).toBe(false)
  })
})

/**
 * Translations drift. These checks fail the build when one language gains an entry
 * the other does not, or when an id diverges — which would silently break the
 * anchors and the animation selectors that key off them.
 */
describe('language parity', () => {
  const [en, lt] = [bundles.en, bundles.lt]

  it('ships every language listed in LANGUAGES', () => {
    for (const language of LANGUAGES) expect(bundles[language]).toBeDefined()
  })

  it.each(Object.keys(collectionsOf(en)))('has matching %s ids in both languages', (name) => {
    const key = name as keyof ReturnType<typeof collectionsOf>
    expect(collectionsOf(lt)[key].map((item) => item.id)).toEqual(
      collectionsOf(en)[key].map((item) => item.id),
    )
  })

  it('keeps section ids identical, since they are URL anchors', () => {
    expect(lt.sections.map((section) => section.id)).toEqual(
      en.sections.map((section) => section.id),
    )
  })

  it('keeps the same roles featured in both languages', () => {
    expect(lt.experience.map((role) => role.featured)).toEqual(
      en.experience.map((role) => role.featured),
    )
  })

  it('keeps dates, links and stat values identical — only words are translated', () => {
    expect(lt.experience.map((r) => [r.start, r.end])).toEqual(
      en.experience.map((r) => [r.start, r.end]),
    )
    expect(lt.projects.map((p) => p.href)).toEqual(en.projects.map((p) => p.href))
    expect(lt.stats.map((s) => s.value)).toEqual(en.stats.map((s) => s.value))
    expect(lt.socials.map((s) => s.href)).toEqual(en.socials.map((s) => s.href))
  })

  it('defines the same set of UI strings', () => {
    expect(Object.keys(lt.ui).toSorted()).toEqual(Object.keys(en.ui).toSorted())
  })

  it('actually translates the prose rather than copying English', () => {
    expect(lt.values.map((value) => value.name)).not.toEqual(
      en.values.map((value) => value.name),
    )
    expect(lt.ui.aboutTitle).not.toBe(en.ui.aboutTitle)
    expect(lt.profile.tagline).not.toBe(en.profile.tagline)
    expect(lt.about).not.toEqual(en.about)
    expect(lt.mentorshipBeats).not.toEqual(en.mentorshipBeats)
  })

  it('states the same three values in both languages', () => {
    expect(lt.values.map((value) => value.id)).toEqual(['growth', 'vulnerability', 'directness'])
    expect(en.values.map((value) => value.id)).toEqual(lt.values.map((value) => value.id))
  })

  it('counts the same number of about paragraphs and mentorship beats', () => {
    expect(lt.about.length).toBe(en.about.length)
    expect(lt.mentorshipBeats.length).toBe(en.mentorshipBeats.length)
  })
})

describe('privacy', () => {
  // He decided the public site shows email, city and socials — no phone, no street
  // address. This is the guard that keeps a future CV paste from undoing that, and
  // it has to cover every language.
  it.each(entries)('%s publishes no phone number or street address', (_language, bundle) => {
    const serialised = JSON.stringify(bundle)

    expect(serialised).not.toMatch(/\+370/)
    expect(serialised).not.toMatch(/\b6\d{7}\b/)
    expect(serialised).not.toMatch(/Partizan/i)
    expect(serialised).not.toMatch(/\b34B-49\b/)
  })

  it.each(entries)('%s still publishes the contact email', (_language, bundle) => {
    expect(bundle.profile.email).toBe('almantusk@gmail.com')
  })
})
