import { describe, expect, it } from 'vitest'
import { experience } from '../content/experience'
import { projects } from '../content/projects'
import { talks } from '../content/speaking'
import { community, stats } from '../content/community'
import { awards } from '../content/awards'
import { books } from '../content/books'
import { about, beyond, education, profile, quote, sections, socials } from '../content/profile'
import { monthKey } from '../lib/dates'

const collections = { experience, projects, talks, community, awards, books, stats, sections }

describe('content integrity', () => {
  it.each(Object.entries(collections))('%s has unique ids', (_name, items) => {
    const ids = items.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(Object.entries(collections))('%s is not empty', (_name, items) => {
    expect(items.length).toBeGreaterThan(0)
  })

  it('lists experience in reverse-chronological order', () => {
    const keys = experience.map((role) => monthKey(role.start))
    expect(keys).toEqual(keys.toSorted((a, b) => b - a))
  })

  it('ends every role either in the past or as current', () => {
    for (const role of experience) {
      if (role.end === null) continue
      expect(monthKey(role.end)).toBeGreaterThan(monthKey(role.start))
    }
  })

  it('features exactly the roles worth expanding by default', () => {
    const featured = experience.filter((role) => role.featured)
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.length).toBeLessThan(experience.length)
    // Featured roles must be the most recent ones, or the disclosure hides recent work.
    expect(experience.slice(0, featured.length).every((role) => role.featured)).toBe(true)
  })
})

describe('outbound links', () => {
  const urls = [
    ...socials.map((social) => social.href),
    ...projects.map((project) => project.href),
    ...books.map((book) => book.href),
    ...talks.flatMap((talk) => (talk.href ? [talk.href] : [])),
    ...awards.flatMap((award) => (award.href ? [award.href] : [])),
    ...community.flatMap((item) => item.links.map((link) => link.href)),
  ]

  it.each(urls)('%s is a parseable https URL', (url) => {
    expect(() => new URL(url)).not.toThrow()
    expect(new URL(url).protocol).toBe('https:')
  })

  it('does not link to the mobile YouTube host', () => {
    expect(urls.some((url) => url.includes('m.youtube.com'))).toBe(false)
  })
})

describe('privacy', () => {
  // He decided the public site shows email, city and socials — no phone, no street
  // address. This is the guard that keeps a future CV paste from undoing that.
  const bundle = JSON.stringify({
    profile,
    socials,
    about,
    beyond,
    quote,
    education,
    experience,
    projects,
    talks,
    community,
    awards,
    books,
  })

  it('publishes no phone number', () => {
    expect(bundle).not.toMatch(/\+370/)
    expect(bundle).not.toMatch(/\b6\d{7}\b/)
  })

  it('publishes no street address', () => {
    expect(bundle).not.toMatch(/Partizan/i)
    expect(bundle).not.toMatch(/\b34B-49\b/)
  })

  it('still publishes the contact email and city', () => {
    expect(profile.email).toBe('almantusk@gmail.com')
    expect(profile.location).toBe('Kaunas, Lithuania')
  })
})
