import type { Page } from '@playwright/test'

export const SECTION_IDS = [
  'top',
  'about',
  'values',
  'experience',
  'projects',
  'speaking',
  'community',
  'writing',
  'beyond',
  'contact',
] as const

/**
 * Waits for the intro timeline and the first reveals to settle. Everything here is
 * scroll- or time-driven, so asserting before it lands produces flaky failures that
 * look like real bugs.
 */
export async function settle(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1600)
}

/** Scrolls the way a reader does, so Lenis and ScrollTrigger both see it. */
export async function scrollTo(page: Page, y: number) {
  await page.evaluate((target) => window.scrollTo({ top: target, behavior: 'instant' }), y)
  await page.waitForTimeout(700)
}

export async function scrollToSection(page: Page, id: string) {
  const top = await page.evaluate(
    (sectionId) => (document.getElementById(sectionId)?.offsetTop ?? 0) - 90,
    id,
  )
  await scrollTo(page, top)
}

/**
 * Waits until every reveal tween has landed.
 *
 * The reveals are staggered, so how long they take grows with the number of items
 * on the page: adding six project cards pushed the tail of that stagger past the
 * fixed beat `scrollTo` waits, and axe started scanning cards that were still
 * fading in. It reported them as contrast failures on text no reader ever sees at
 * that opacity. Wait for the last tween rather than for a guess at how long they
 * all take.
 *
 * Only safe once everything above the fold has been triggered — anything not yet
 * scrolled past sits at opacity 0 and never arrives.
 */
export async function revealsSettled(page: Page) {
  await page.waitForFunction(() =>
    [...document.querySelectorAll('[data-reveal]')].every(
      (node) => Number.parseFloat(getComputedStyle(node).opacity) > 0.99,
    ),
  )
}
