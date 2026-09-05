/**
 * Measures whether this device is actually keeping up, and says so once it clearly
 * is not.
 *
 * `hardwareConcurrency` and `deviceMemory` are guesses: a phone with eight little
 * cores reports the same numbers as a laptop, and Safari reports nothing at all.
 * Frame times are not a guess. This watches the real ones for a short window after
 * the intro and, on a sustained pattern of dropped frames, flips a flag that the
 * decorative layers unmount themselves on.
 */

/** A frame this long dropped at least one at 30fps. */
export const SLOW_FRAME_MS = 34
/**
 * A GC pause or an image decode is not a slow device, so it takes a run of them.
 * The count is the only guard against one-off stalls — an upper bound on what
 * counts as slow would be exactly backwards, dismissing the worst devices as
 * outliers because every one of their frames is bad.
 */
export const SLOW_FRAMES_BEFORE_DEGRADING = 30
/** Load, font swap and the intro timeline all land inside this. */
export const WARMUP_MS = 2500
/** Past this the reader has seen what the device can do. Stop paying to measure. */
export const WATCH_MS = 20000
/**
 * How much of the window a single frame may consume. Without this, a device slow
 * enough to matter burns through the window in a handful of frames and stops being
 * watched before it has produced enough of them to judge.
 */
export const MAX_CREDITED_MS = 100

/**
 * The decision, as a plain function over frame durations, so the thresholds can be
 * tested without a ticker or a clock.
 *
 * Returns `'watching'` while it is still making up its mind, `'degrade'` on the
 * frame that settles it, and `'done'` once the window has closed without a verdict.
 */
export type Verdict = 'watching' | 'degrade' | 'done'

export function createFrameSampler(): (deltaMs: number) => Verdict {
  let watched = 0
  let slowFrames = 0
  let settled = false

  return (deltaMs) => {
    if (settled) return 'done'

    watched += Math.min(deltaMs, MAX_CREDITED_MS)
    if (watched < WARMUP_MS) return 'watching'

    if (watched > WATCH_MS) {
      settled = true
      return 'done'
    }

    if (deltaMs >= SLOW_FRAME_MS) slowFrames += 1

    if (slowFrames >= SLOW_FRAMES_BEFORE_DEGRADING) {
      settled = true
      return 'degrade'
    }

    return 'watching'
  }
}
