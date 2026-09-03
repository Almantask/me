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
