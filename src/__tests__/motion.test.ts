import { describe, expect, it } from 'vitest'
import {
  FINE_POINTER_QUERY,
  PIN_QUERY,
  REDUCED_MOTION_QUERY,
  resolveMotionEnvironment,
} from '../motion/environment'

/** Stands in for window.matchMedia with a fixed set of answers. */
const matcher = (matches: Record<string, boolean>) => (query: string) => ({
  matches: matches[query] ?? false,
})

describe('motion environment', () => {
  it('enables everything on a desktop with a real pointer', () => {
    const env = resolveMotionEnvironment(
      matcher({ [FINE_POINTER_QUERY]: true, [PIN_QUERY]: true }),
    )
    expect(env).toEqual({ reduced: false, finePointer: true, canPin: true })
  })

  it('never binds pointer effects on a coarse pointer', () => {
    const env = resolveMotionEnvironment(
      matcher({ [FINE_POINTER_QUERY]: false, [PIN_QUERY]: true }),
    )
    expect(env.finePointer).toBe(false)
  })

  it('does not pin below the breakpoint, where it would fight native scroll', () => {
    const env = resolveMotionEnvironment(
      matcher({ [FINE_POINTER_QUERY]: false, [PIN_QUERY]: false }),
    )
    expect(env.canPin).toBe(false)
  })

  it('lets reduced motion override a capable device entirely', () => {
    const env = resolveMotionEnvironment(
      matcher({ [REDUCED_MOTION_QUERY]: true, [FINE_POINTER_QUERY]: true, [PIN_QUERY]: true }),
    )
    expect(env).toEqual({ reduced: true, finePointer: false, canPin: false })
  })
})
