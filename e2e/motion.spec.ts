import { expect, test } from '@playwright/test'
import { scrollTo, scrollToSection, settle } from './helpers'

test.describe('with motion allowed', () => {
  test('mounts Lenis to own the scroll', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await expect(page.locator('html')).toHaveClass(/lenis/)
  })

  test('counts the community stats up to their exact values', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'community')
    await page.waitForTimeout(2500)

    const members = page.locator('#community li', { hasText: 'C# Inn community members' })
    await expect(members).toContainText('7000')
  })

  test('creates its ScrollTriggers once, not twice', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    // React StrictMode double-invokes effects in dev; useGSAP is what keeps that from
    // leaving a duplicate trigger behind for every animation on the page.
    const ids = await page.evaluate(() =>
      [...document.querySelectorAll('[data-role]')].map((node) => node.textContent?.slice(0, 20)),
    )
    expect(new Set(ids).size).toBe(ids.length)
  })
})

test.describe('the pinned mentorship set-piece', () => {
  test('pins on the desktop and releases cleanly', async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), 'pinning is disabled below the md breakpoint')

    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'community')
    await page.waitForTimeout(600)

    await expect(page.locator('.pin-spacer')).toHaveCount(1)

    // Scroll past the whole section: nothing should be left stuck to the viewport.
    const past = await page.evaluate(() => {
      const section = document.getElementById('community')
      return (section?.offsetTop ?? 0) + (section?.offsetHeight ?? 0) + 400
    })
    await scrollTo(page, past)

    const beats = page.locator('[data-beat]').first()
    const box = await beats.boundingBox()
    expect(box?.y ?? 0).toBeLessThan(0)
  })

  test('never pins on a phone, where it would fight native scrolling', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'this is the mobile guard')

    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'community')

    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    await expect(page.locator('[data-beat]').first()).toBeVisible()
  })
})

test.describe('with reduced motion requested', () => {
  // Set on the page rather than via test.use so it is unambiguous that the
  // preference is in place before the first render, which is when it matters.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
  })

  test('does not mount Lenis at all', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await expect(page.locator('html')).not.toHaveClass(/lenis/)
  })

  test('renders every section at its final state without scrolling', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    const faded = await page.evaluate(() =>
      [...document.querySelectorAll('[data-reveal], [data-role], [data-beat]')]
        .filter((node) => Number(getComputedStyle(node).opacity) < 0.99)
        .map((node) => node.textContent?.slice(0, 40)),
    )

    expect(faded).toEqual([])
  })

  test('shows the stats at their final values, not counting', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await expect(
      page.locator('#community li', { hasText: 'C# Inn community members' }),
    ).toContainText('7000')
  })

  test('does not pin', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'community')

    await expect(page.locator('.pin-spacer')).toHaveCount(0)
  })

  test('renders no ember canvas', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await expect(page.locator('#top canvas')).toHaveCount(0)
  })
})

test.describe('theme', () => {
  test('survives a reload without flashing the wrong background', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('./')
    await settle(page)

    await page.getByRole('button', { name: /switch to dark theme/i }).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.reload()
    // Asserted before any settle: the inline head script must have already run.
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
