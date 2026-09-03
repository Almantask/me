import { describe, expect, it } from 'vitest'
import { DEFAULT_LANGUAGE, isLanguage, otherLanguage, resolveLanguage } from '../i18n/language'

describe('language resolution', () => {
  it('lets an explicit ?lang= win over everything else', () => {
    // A shared link must open in the language it was shared in, even for a reader
    // who has picked the other one before.
    expect(resolveLanguage('lt', 'en', ['en-GB'])).toBe('lt')
    expect(resolveLanguage('en', 'lt', ['lt-LT'])).toBe('en')
  })

  it('falls back to a stored choice when the URL says nothing', () => {
    expect(resolveLanguage(null, 'lt', ['en-US'])).toBe('lt')
  })

  it('falls back to the browser preference when nothing is stored', () => {
    expect(resolveLanguage(null, null, ['lt-LT', 'en-US'])).toBe('lt')
    expect(resolveLanguage(null, null, ['en-US'])).toBe('en')
  })

  it('matches on the primary subtag, so lt-LT resolves like lt', () => {
    expect(resolveLanguage(null, null, ['LT-lt'])).toBe('lt')
  })

  it('skips languages the site does not ship', () => {
    expect(resolveLanguage(null, null, ['de-DE', 'fr-FR', 'lt'])).toBe('lt')
    expect(resolveLanguage(null, null, ['de-DE', 'fr-FR'])).toBe(DEFAULT_LANGUAGE)
  })

  it('ignores junk in the URL and in storage', () => {
    expect(resolveLanguage('klingon', null, ['en'])).toBe('en')
    expect(resolveLanguage(null, 'null', ['lt'])).toBe('lt')
    expect(resolveLanguage('', '', [])).toBe(DEFAULT_LANGUAGE)
  })
})

describe('language helpers', () => {
  it('recognises only shipped languages', () => {
    expect(isLanguage('en')).toBe(true)
    expect(isLanguage('lt')).toBe(true)
    expect(isLanguage('EN')).toBe(false)
    expect(isLanguage(undefined)).toBe(false)
  })

  it('toggles between the two', () => {
    expect(otherLanguage('en')).toBe('lt')
    expect(otherLanguage('lt')).toBe('en')
  })
})

describe('the language switch label', () => {
  it('is written in the language it switches to', async () => {
    const { bundles } = await import('../content')

    // A reader who cannot read the current language still has to find the way out.
    expect(bundles.en.ui.switchLanguage).toMatch(/lietuvi/i)
    expect(bundles.lt.ui.switchLanguage).toMatch(/english/i)
  })
})
