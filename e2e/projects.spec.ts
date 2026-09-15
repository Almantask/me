import { expect, test } from '@playwright/test'
import { scrollToSection, settle } from './helpers'

test.describe('project screenshot carousels', () => {
  test('every project card has a screenshot carousel', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'projects')

    const cards = page.locator('#projects ul.grid > li')
    const carousels = page.locator('#projects [data-carousel]')
    await expect(cards).toHaveCount(13)
    await expect(carousels).toHaveCount(13)
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
