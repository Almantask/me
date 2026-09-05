import { describe, expect, it } from 'vitest'
import {
  MAX_CREDITED_MS,
  SLOW_FRAMES_BEFORE_DEGRADING,
  SLOW_FRAME_MS,
  WARMUP_MS,
  createFrameSampler,
  type Verdict,
} from '../motion/frameSampler'

/** Feeds `count` frames of `deltaMs` and reports the first verdict that is not 'watching'. */
function feed(sampler: (ms: number) => Verdict, deltaMs: number, count: number): Verdict {
  for (let i = 0; i < count; i += 1) {
    const verdict = sampler(deltaMs)
    if (verdict !== 'watching') return verdict
  }
  return 'watching'
}

/** Enough smooth frames to get past the warmup without any of them counting as slow. */
const SMOOTH = 16
const framesToWarmUp = Math.ceil(WARMUP_MS / SMOOTH) + 1

describe('the frame budget sampler', () => {
  it('says nothing while a smooth device keeps up', () => {
    const sampler = createFrameSampler()
    expect(feed(sampler, SMOOTH, framesToWarmUp + 200)).toBe('watching')
  })

  it('ignores everything during the warmup, however bad it looks', () => {
    // Load, font swap and the intro all land in here. Judging a device on those
    // frames would degrade almost every visit.
    const sampler = createFrameSampler()
    const duringWarmup = Math.floor(WARMUP_MS / MAX_CREDITED_MS) - 1
    expect(feed(sampler, 300, duringWarmup)).toBe('watching')
  })

  it('degrades on a sustained run of dropped frames', () => {
    const sampler = createFrameSampler()
    feed(sampler, SMOOTH, framesToWarmUp)
    expect(feed(sampler, 60, SLOW_FRAMES_BEFORE_DEGRADING + 2)).toBe('degrade')
  })

  it('does not degrade on a handful of stalls in an otherwise smooth visit', () => {
    // A GC pause or an image decode is not a slow device.
    const sampler = createFrameSampler()
    feed(sampler, SMOOTH, framesToWarmUp)

    let verdict: Verdict = 'watching'
    for (let i = 0; i < 300 && verdict === 'watching'; i += 1) {
      verdict = sampler(i % 40 === 0 ? 250 : SMOOTH)
    }
    expect(verdict).toBe('watching')
  })

  /**
   * The bug this guards. An upper bound on what counts as "slow" — meant to skip
   * one-off stalls — dismissed every frame of a genuinely terrible device as an
   * outlier, so the devices most in need of the lighter page never got it.
   */
  it('still judges a device whose every frame is catastrophic', () => {
    const sampler = createFrameSampler()
    expect(feed(sampler, 400, 500)).toBe('degrade')
  })

  it('gives such a device enough frames to be judged before the window closes', () => {
    // The window is measured in credited time, so one enormous frame must not be
    // allowed to spend it all.
    const sampler = createFrameSampler()
    let frames = 0
    let verdict: Verdict = 'watching'
    while (verdict === 'watching' && frames < 5000) {
      verdict = sampler(500)
      frames += 1
    }
    expect(verdict).toBe('degrade')
  })

  it('stops watching once the window has closed on a device that coped', () => {
    const sampler = createFrameSampler()
    expect(feed(sampler, SMOOTH, 5000)).toBe('done')
  })

  it('holds its verdict once it has one', () => {
    const sampler = createFrameSampler()
    feed(sampler, SMOOTH, framesToWarmUp)
    expect(feed(sampler, 60, SLOW_FRAMES_BEFORE_DEGRADING + 2)).toBe('degrade')
    expect(sampler(SMOOTH)).toBe('done')
  })

  it('treats a frame right at the threshold as dropped', () => {
    const sampler = createFrameSampler()
    feed(sampler, SMOOTH, framesToWarmUp)
    expect(feed(sampler, SLOW_FRAME_MS, SLOW_FRAMES_BEFORE_DEGRADING + 2)).toBe('degrade')
  })

  it('leaves a device just inside the threshold alone', () => {
    const sampler = createFrameSampler()
    feed(sampler, SMOOTH, framesToWarmUp)
    expect(feed(sampler, SLOW_FRAME_MS - 1, SLOW_FRAMES_BEFORE_DEGRADING + 2)).toBe('watching')
  })
})
