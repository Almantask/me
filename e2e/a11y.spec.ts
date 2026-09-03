import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { scrollToSection, settle } from './helpers'

type Page = import('@playwright/test').Page

async function scan(page: Page, exclude?: string) {
  const builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
  ])
  return exclude ? builder.exclude(exclude).analyze() : builder.analyze()
}

test.describe('accessibility', () => {
  // Both languages, both themes. Lithuanian sets noticeably longer strings, so it
  // can break a layout or a contrast ratio that English never does.
  for (const language of ['en', 'lt'] as const) {
    for (const theme of ['light', 'dark'] as const) {
      test(`has no axe violations in ${language}, ${theme} theme`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme })
        await page.goto(`./?lang=${language}`)
        await settle(page)

        const results = await scan(page)
        expect(results.violations.map((violation) => violation.id)).toEqual([])
      })
    }
  }

  test('has no violations further down the page', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'contact')

    /*
      The hero is excluded here, and only here. Its copy is scrubbed to opacity 0.15
      as you scroll away from it, so axe reports contrast failures on text that is
      several screens off-screen and cannot be read by anyone. The two scans above
      already cover the hero at full opacity, which is the state that matters.
    */
    const results = await scan(page, '#top')
    expect(results.violations.map((violation) => violation.id)).toEqual([])
  })

  /**
   * SplitText replaces the heading's text with per-character spans. Without the
   * aria handling that would leave screen readers reading the name letter by letter
   * — or not at all.
   */
  test('exposes the whole name to assistive technology despite the split', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    const heading = page.getByRole('heading', { level: 1 })
    const accessibleName = await heading.evaluate((node) => node.getAttribute('aria-label') ?? node.textContent)

    expect(accessibleName?.replace(/\s+/g, ' ').trim()).toBe('Almantas Karpavičius')
    expect(await heading.locator('[aria-hidden="true"]').count()).toBeGreaterThan(0)
  })

  test('offers a skip link as the first stop for the keyboard', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
  })

  test('lets the keyboard reach the contact form past the pinned section', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await page.getByLabel('Your name').focus()
    await expect(page.getByLabel('Your name')).toBeFocused()

    // Focusing something below a pinned region must not leave the viewport stranded.
    const box = await page.getByLabel('Your name').boundingBox()
    expect(box).not.toBeNull()
    expect(box?.y ?? -1).toBeGreaterThan(0)
  })
})
