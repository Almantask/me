/** Wrap a slide index so the carousel can step off either end. */
export function wrapIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return 0
  return ((current + delta) % length + length) % length
}

/**
 * Read a pointer gesture as a carousel step.
 * Returns `1` (next) or `-1` (previous) only for a clearly horizontal swipe, so a
 * vertical pan to scroll the page is not stolen on a phone.
 */
export function swipeDirection(dx: number, dy: number, threshold = 40): -1 | 0 | 1 {
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return 0
  return dx < 0 ? 1 : -1
}
