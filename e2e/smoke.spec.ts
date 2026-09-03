import { expect, test } from '@playwright/test'
import { SECTION_IDS, scrollToSection, settle } from './helpers'

test.describe('the page', () => {
  test('renders every section', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Almantas Karpavičius')
    await expect(page).toHaveTitle(/Almantas Karpavičius/)
  })

  test('has exactly one h1', async ({ page }) => {
    await page.goto('./')
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('logs nothing to the console', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text())
    })
    page.on('pageerror', (error) => problems.push(String(error)))

    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'contact')

    expect(problems).toEqual([])
  })

  /**
   * The site is served from /me/, so a root-absolute "/img/x.jpg" resolves to the
   * domain root and 404s — while working perfectly in dev. This catches it
   * mechanically instead of by eye.
   */
  test('requests no assets from the domain root', async ({ page }) => {
    const strays: string[] = []
    page.on('request', (request) => {
      const { pathname, host } = new URL(request.url())
      if (host.startsWith('localhost') && !pathname.startsWith('/me/')) strays.push(pathname)
    })

    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'contact')

    expect(strays).toEqual([])
  })

  test('never scrolls horizontally, even at 320px', async ({ page }) => {
    // 320 CSS px is the narrowest viewport worth supporting. A single element that
    // overflows here makes the whole page feel broken on a small phone.
    await page.setViewportSize({ width: 320, height: 720 })
    await page.goto('./?lang=lt')
    await settle(page)
    await scrollToSection(page, 'contact')

    const overflow = await page.evaluate(() => {
      const root = document.documentElement

      // Decoration that deliberately bleeds past its container is fine as long as
      // the container clips it — the hero's ember glow, for one. Only unclipped
      // overflow can actually push the page sideways.
      const isClipped = (node: Element) => {
        for (let parent = node.parentElement; parent; parent = parent.parentElement) {
          const { overflowX } = getComputedStyle(parent)
          if (overflowX === 'hidden' || overflowX === 'clip') return true
        }
        return false
      }

      const culprits = [...document.querySelectorAll('body *')]
        .filter((node) => node.getBoundingClientRect().right > root.clientWidth + 1)
        .filter((node) => !isClipped(node))
        .map((node) => `${node.tagName}.${String(node.className).slice(0, 40)}`)

      return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth, culprits: culprits.slice(0, 5) }
    })

    expect(overflow.culprits).toEqual([])
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
  })

  test('loads the hero photo', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    const loaded = await page.locator('#top img').evaluate((node: HTMLImageElement) => ({
      complete: node.complete,
      width: node.naturalWidth,
      alt: node.alt,
    }))

    expect(loaded.complete).toBe(true)
    expect(loaded.width).toBeGreaterThan(0)
    expect(loaded.alt).not.toBe('')
  })
})

test.describe('deep links', () => {
  test('lands on the linked section with its content revealed', async ({ page }) => {
    // The browser resolves the hash while the page is still an empty root div, so
    // without explicit handling a shared link silently lands at the top.
    await page.goto('./#contact')
    await settle(page)
    await page.waitForTimeout(800)

    const state = await page.evaluate(() => ({
      scrollY: window.scrollY,
      contactTop: document.getElementById('contact')!.getBoundingClientRect().top,
      faded: [...document.querySelectorAll('#contact [data-reveal]')]
        .filter((node) => Number(getComputedStyle(node).opacity) < 0.99).length,
    }))

    expect(state.scrollY).toBeGreaterThan(1000)
    expect(Math.abs(state.contactTop)).toBeLessThan(200)
    expect(state.faded).toBe(0)
  })
})

test.describe('navigation', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'the section nav is desktop-only')

  test('the hero call-to-action scrolls rather than jumping', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    await page.getByRole('link', { name: 'See my work' }).click()
    await page.waitForTimeout(1500)

    const top = await page.locator('#experience').evaluate((node) => node.getBoundingClientRect().top)
    expect(top).toBeGreaterThan(0)
    expect(top).toBeLessThan(200)
  })

  test('every anchor scrolls to its section', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    for (const id of ['experience', 'projects', 'speaking', 'community', 'contact']) {
      await page.getByRole('navigation', { name: 'Sections' }).getByRole('button', { name: new RegExp(id, 'i') }).click()
      await page.waitForTimeout(1400)

      const { top, headerBottom } = await page.locator(`#${id}`).evaluate((node) => ({
        top: node.getBoundingClientRect().top,
        headerBottom: document.querySelector('header')!.getBoundingClientRect().bottom,
      }))

      // Landed clear of the sticky header, and close enough that the section
      // heading is the first thing the reader sees.
      expect(top).toBeGreaterThanOrEqual(headerBottom)
      expect(top - headerBottom).toBeLessThan(80)
    }
  })
})

test.describe('earlier roles disclosure', () => {
  test('expands and collapses from the keyboard', async ({ page }) => {
    await page.goto('./')
    await settle(page)

    const toggle = page.getByRole('button', { name: /earlier roles/i })
    await toggle.scrollIntoViewIfNeeded()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.focus()
    await page.keyboard.press('Enter')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('heading', { name: 'Game Developer' })).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('contact form', () => {
  test('reports validation errors instead of submitting', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'contact')

    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByText('Please tell me who you are.')).toBeVisible()
    await expect(page.getByText('I need an address to reply to.')).toBeVisible()
    await expect(page.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true')
  })

  test('hands a valid message to the mail client', async ({ page }) => {
    await page.goto('./')
    await settle(page)
    await scrollToSection(page, 'contact')

    // The mailto: navigation is handled by the OS, so intercept it instead.
    let mailto = ''
    await page.route('mailto:**', (route) => {
      mailto = route.request().url()
      return route.abort()
    })

    await page.getByLabel('Your name').fill('Jane Doe')
    await page.getByLabel('Your email').fill('jane@example.com')
    await page.getByLabel('What is on your mind?').fill('Could you mentor me for a while?')
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByText(/mail app should be opening/i)).toBeVisible()
    if (mailto) expect(decodeURIComponent(mailto)).toContain('Could you mentor me')
  })
})
