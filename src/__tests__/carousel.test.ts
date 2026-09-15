import { describe, expect, it } from 'vitest'
import { swipeDirection, wrapIndex } from '../lib/carousel'

describe('wrapIndex', () => {
  it('steps forward and wraps off the end', () => {
    expect(wrapIndex(0, 1, 3)).toBe(1)
    expect(wrapIndex(2, 1, 3)).toBe(0)
  })

  it('steps backward and wraps off the start', () => {
    expect(wrapIndex(0, -1, 3)).toBe(2)
    expect(wrapIndex(1, -1, 3)).toBe(0)
  })

  it('is a no-op on an empty carousel', () => {
    expect(wrapIndex(0, 1, 0)).toBe(0)
  })
})

describe('swipeDirection', () => {
  it('reads a left swipe as next', () => {
    expect(swipeDirection(-80, 4)).toBe(1)
  })

  it('reads a right swipe as previous', () => {
    expect(swipeDirection(80, -6)).toBe(-1)
  })

  it('ignores a tap and a vertical pan, so the page can still scroll', () => {
    expect(swipeDirection(-10, 0)).toBe(0)
    expect(swipeDirection(-30, 80)).toBe(0)
    expect(swipeDirection(12, -90)).toBe(0)
  })
})
