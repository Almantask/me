import { expect, test } from '@playwright/test'
import { settle } from './helpers'

test.describe('language', () => {
  test('defaults to English for an English browser', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { name: /growing people over growing codebases/i })).toBeVisible()
  })

  test('opens in Lithuanian when the URL asks for it', async ({ page }) => {
    await page.goto('./?lang=lt')
    await settle(page)

    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')
    await expect(page.getByRole('heading', { name: /auginti žmones/i })).toBeVisible()
    await expect(page).toHaveTitle(/inžinerijos vadovas/i)
  })

  test('lets the URL override a previously stored choice', async ({ page }) => {
    // A link shared in Lithuanian must open in Lithuanian, even for a reader who
    // has picked English before.
    await page.goto('./?lang=en')
    await settle(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await page.goto('./?lang=lt')
    await settle(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')
  })

  test('follows a Lithuanian browser preference with no URL or stored choice', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'lt-LT' })
    const page = await context.newPage()
    await page.goto('/me/')
    await settle(page)

    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')
    await context.close()
  })

  test('switches, updates the URL, and survives a reload', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await page.getByRole('button', { name: 'Skaityti lietuviškai' }).click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')
    await expect(page).toHaveURL(/lang=lt/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Almantas Karpavičius')
    await expect(page.getByRole('navigation', { name: 'Skyriai' })).toBeVisible()

    await page.reload()
    await settle(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')
  })

  test('switches back to English', async ({ page }) => {
    await page.goto('./?lang=lt')
    await settle(page)

    await page.getByRole('button', { name: 'Read in English' }).click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveURL(/lang=en/)
    await expect(page.getByRole('navigation', { name: 'Sections' })).toBeVisible()
  })

  test('keeps section anchors working across a switch', async ({ page }) => {
    // Ids are shared between languages precisely so a shared anchor survives one.
    await page.goto('./#projects')
    await settle(page)
    await page.waitForTimeout(600)

    await page.getByRole('button', { name: 'Skaityti lietuviškai' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'lt')

    await expect(page).toHaveURL(/#projects/)
    await expect(page.locator('#projects')).toBeAttached()
  })

  test('translates the values band', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await expect(page.locator('#values')).toContainText('Continuous growth')
    await expect(page.locator('#values')).toContainText('Directness')

    await page.goto('./?lang=lt')
    await settle(page)
    await expect(page.locator('#values')).toContainText('Nuolatinis augimas')
    await expect(page.locator('#values')).toContainText('Tiesumas')
  })

  test('translates the contact form, errors included', async ({ page }) => {
    await page.goto('./?lang=lt')
    await settle(page)

    await page.getByLabel('Jūsų vardas').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'Siųsti žinutę' }).click()

    await expect(page.getByText('Parašykite, kas esate.')).toBeVisible()
    await expect(page.getByText('Reikia adreso, kuriuo galėčiau atsakyti.')).toBeVisible()
  })

  test('formats dates the way each language writes them', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await expect(page.locator('#experience').getByText(/Jan 2026 — present/)).toBeVisible()

    await page.goto('./?lang=lt')
    await settle(page)
    await expect(page.locator('#experience').getByText(/01\/2026 — dabar/)).toBeVisible()
  })
})
