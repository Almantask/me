import { describe, expect, it } from 'vitest'
import { wrapIndex } from '../lib/carousel'

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
