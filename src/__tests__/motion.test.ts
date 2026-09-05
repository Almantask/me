import { describe, expect, it } from 'vitest'
import {
  FINE_POINTER_QUERY,
  PIN_QUERY,
  REDUCED_DATA_QUERY,
  REDUCED_MOTION_QUERY,
  SLOW_UPDATE_QUERY,
  resolveMotionEnvironment,
} from '../motion/environment'

/** Stands in for window.matchMedia with a fixed set of answers. */
const matcher = (matches: Record<string, boolean>) => (query: string) => ({
  matches: matches[query] ?? false,
})

const DESKTOP = { [FINE_POINTER_QUERY]: true, [PIN_QUERY]: true }
const PHONE = { [FINE_POINTER_QUERY]: false, [PIN_QUERY]: false }

describe('motion environment', () => {
  it('enables everything on a desktop with a real pointer', () => {
    const env = resolveMotionEnvironment(matcher(DESKTOP))
    expect(env).toEqual({ reduced: false, finePointer: true, canPin: true, lowPower: false })
  })

  it('never binds pointer effects on a coarse pointer', () => {
    const env = resolveMotionEnvironment(
      matcher({ [FINE_POINTER_QUERY]: false, [PIN_QUERY]: true }),
    )
    expect(env.finePointer).toBe(false)
  })

  it('does not pin below the breakpoint, where it would fight native scroll', () => {
    const env = resolveMotionEnvironment(matcher(PHONE))
    expect(env.canPin).toBe(false)
  })

  it('lets reduced motion override a capable device entirely', () => {
    const env = resolveMotionEnvironment(
      matcher({ [REDUCED_MOTION_QUERY]: true, ...DESKTOP }),
    )
    expect(env).toMatchObject({ reduced: true, finePointer: false, canPin: false })
  })
})

describe('the low-power tier', () => {
  it('leaves a device alone when the browser reports nothing about it', () => {
    // Safari exposes neither hint. Absent must not read as weak, or the decorative
    // layers would be stripped on every iPhone and Mac.
    expect(resolveMotionEnvironment(matcher(DESKTOP)).lowPower).toBe(false)
  })

  it('spares a four-core desktop, which is capable and also every CI runner', () => {
    const env = resolveMotionEnvironment(matcher(DESKTOP), { cores: 4, memory: 4 })
    expect(env.lowPower).toBe(false)
  })

  it('drops the decoration on a four-core phone', () => {
    const env = resolveMotionEnvironment(matcher(PHONE), { cores: 4 })
    expect(env.lowPower).toBe(true)
  })

  it('drops it on a phone short on memory too', () => {
    const env = resolveMotionEnvironment(matcher(PHONE), { cores: 8, memory: 2 })
    expect(env.lowPower).toBe(true)
  })

  it('keeps a capable phone fully decorated', () => {
    const env = resolveMotionEnvironment(matcher(PHONE), { cores: 8, memory: 8 })
    expect(env.lowPower).toBe(false)
  })

  it('honours a display that cannot paint at animation rates', () => {
    const env = resolveMotionEnvironment(matcher({ ...DESKTOP, [SLOW_UPDATE_QUERY]: true }))
    expect(env.lowPower).toBe(true)
  })

  it('honours a data-saving preference', () => {
    const env = resolveMotionEnvironment(matcher({ ...DESKTOP, [REDUCED_DATA_QUERY]: true }))
    expect(env.lowPower).toBe(true)
  })

  it('believes measured frame times over any hardware hint', () => {
    // The whole point of the measured signal: a machine that looks capable on paper
    // and demonstrably is not still gets the lighter page.
    const env = resolveMotionEnvironment(matcher(DESKTOP), {
      cores: 16,
      memory: 8,
      framesDropping: true,
    })
    expect(env.lowPower).toBe(true)
  })

  it('still animates the structure — low power is not reduced motion', () => {
    const env = resolveMotionEnvironment(matcher(PHONE), { cores: 2 })
    expect(env).toMatchObject({ reduced: false, lowPower: true })
  })
})
