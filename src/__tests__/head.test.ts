import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { bundles } from '../content'
import { LANGUAGES, type Language } from '../content/types'
import { DEFAULT_LANGUAGE, LANGUAGE_PARAM, LANGUAGE_STORAGE_KEY } from '../i18n/language'

/**
 * index.html carries a copy of the meta strings so the title is right before React
 * hydrates — otherwise a Lithuanian reader watches the English one for a beat. A copy
 * can drift from src/content, and nothing about the running site would look wrong
 * until someone shared a link. These are the checks that make drift fail the build.
 */
const html = readFileSync(resolve(import.meta.dirname, '../../index.html'), 'utf8')

/** Tolerates \u escapes as well as the literal characters the strings are written with. */
function decodeEscapes(value: string): string {
  return value.replaceAll(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
    String.fromCodePoint(Number.parseInt(code, 16)),
  )
}

function inlineStrings(language: Language) {
  const block = new RegExp(`\\b${language}: \\{([\\s\\S]*?)\\},`).exec(html)?.[1]
  expect(block, `${language} block in index.html`).toBeTruthy()

  const read = (key: string) => {
    const raw = new RegExp(`\\b${key}: '((?:[^'\\\\]|\\\\.)*)'`).exec(block!)?.[1]
    expect(raw, `${language}.${key} in index.html`).toBeTruthy()
    return decodeEscapes(raw!)
  }

  return { title: read('t'), description: read('d'), ogDescription: read('o') }
}

describe('pre-paint head strings', () => {
  it.each(LANGUAGES)('matches %s content exactly', (language) => {
    const { ui } = bundles[language]
    expect(inlineStrings(language)).toEqual({
      title: ui.metaTitle,
      description: ui.metaDescription,
      ogDescription: ui.ogDescription,
    })
  })

  it('resolves language by the same keys the app uses', () => {
    expect(html).toContain(`get('${LANGUAGE_PARAM}')`)
    expect(html).toContain(`getItem('${LANGUAGE_STORAGE_KEY}')`)
    expect(html).toContain(`return '${DEFAULT_LANGUAGE}'`)
  })

  /**
   * The script only rewrites tags that already exist, so a renamed or dropped tag
   * would leave the served markup stuck in the default language.
   */
  it.each([
    ['name', 'description'],
    ['property', 'og:title'],
    ['property', 'og:description'],
  ])('ships a %s="%s" tag for the script to rewrite', (attribute, key) => {
    expect(html).toMatch(new RegExp(`<meta\\s+${attribute}="${key}"`))
  })

  it('serves the default language in the static markup', () => {
    expect(html).toContain('<html lang="en">')
    expect(html).toContain(`<title>${bundles[DEFAULT_LANGUAGE].ui.metaTitle}</title>`)
  })
})
