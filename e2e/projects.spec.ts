import { expect, test } from '@playwright/test'
import { bundles } from '../src/content'
import { scrollToSection, settle } from './helpers'

// Counted from the content rather than written down, so adding a project cannot
// leave this passing against a stale number.
const PROJECT_COUNT = bundles.en.projects.length

test.describe('project screenshot carousels', () => {
  test('every project card has a screenshot carousel', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'projects')

    const cards = page.locator('#projects ul.grid > li')
    const carousels = page.locator('#projects [data-carousel]')
    await expect(cards).toHaveCount(PROJECT_COUNT)
    await expect(carousels).toHaveCount(PROJECT_COUNT)
  })

  test('steps through README screenshots without wrapping the card in the control', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'projects')

    const carousel = page.locator('[data-carousel="sunderplace"]')
    await carousel.scrollIntoViewIfNeeded()
    await expect(page.locator('#projects [data-reveal]').first()).toHaveCSS('opacity', '1')
    await carousel.hover()

    const position = carousel.locator('[data-carousel-position]')
    await expect(position).toHaveText('1 of 11')

    const next = carousel.getByRole('button', { name: 'Next screenshot' })
    expect(await next.evaluate((node) => node.closest('a'))).toBeNull()

    await next.click()
    await expect(position).toHaveText('2 of 11')

    await carousel.getByRole('button', { name: 'Previous screenshot' }).click()
    await expect(position).toHaveText('1 of 11')
  })

  test('swipes to the next screenshot from the image, not the page', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'projects')

    const carousel = page.locator('[data-carousel="sunderplace"]')
    await carousel.scrollIntoViewIfNeeded()
    await expect(page.locator('#projects [data-reveal]').first()).toHaveCSS('opacity', '1')
    await carousel.hover()

    const box = await carousel.boundingBox()
    expect(box).not.toBeNull()
    if (!box) return

    await page.mouse.move(box.x + box.width * 0.78, box.y + box.height * 0.42)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width * 0.22, box.y + box.height * 0.42, { steps: 8 })
    await page.mouse.up()

    await expect(carousel.locator('[data-carousel-position]')).toHaveText('2 of 11')
  })

  test('keeps controls tappable and the card on-screen at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 })
    await page.goto('./?lang=lt')
    await settle(page)
    await scrollToSection(page, 'projects')

    const carousel = page.locator('[data-carousel="sunderplace"]')
    await carousel.scrollIntoViewIfNeeded()
    await expect(page.locator('#projects [data-reveal]').first()).toHaveCSS('opacity', '1')

    const next = carousel.getByRole('button', { name: 'Kita nuotrauka' })
    const size = await next.evaluate((node) => {
      const box = node.getBoundingClientRect()
      return { width: box.width, height: box.height, right: box.right }
    })
    expect(size.width).toBeGreaterThanOrEqual(40)
    expect(size.height).toBeGreaterThanOrEqual(40)
    expect(size.right).toBeLessThanOrEqual(321)

    await expect(carousel.locator('[data-carousel-position]')).toHaveText('1 iš 11')
    await next.click()
    await expect(carousel.locator('[data-carousel-position]')).toHaveText('2 iš 11')

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('pauses autoplay while the pointer is on the card', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'projects')

    const carousel = page.locator('[data-carousel="sunderplace"]')
    await carousel.scrollIntoViewIfNeeded()
    await expect(page.locator('#projects [data-reveal]').first()).toHaveCSS('opacity', '1')
    await carousel.hover()
    await expect(carousel.locator('[data-carousel-position]')).toHaveText('1 of 11')
    await page.waitForTimeout(4800)
    await expect(carousel.locator('[data-carousel-position]')).toHaveText('1 of 11')
  })
})
