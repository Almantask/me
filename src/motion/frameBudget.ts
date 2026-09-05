import { gsap } from './gsap'
import { createFrameSampler } from './frameSampler'

/**
 * Wires the frame sampler to the one animation clock on the page.
 *
 * The decision itself lives in `frameSampler` — free of GSAP, the DOM and any
 * clock, so the thresholds can be tested by feeding it frame durations.
 */

let dropping = false
let watching = false
const listeners = new Set<() => void>()

/** True once measured frame times show the device cannot hold a smooth rate. */
export function framesAreDropping(): boolean {
  return dropping
}

export function subscribeFrameBudget(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

/**
 * Starts sampling. Safe to call more than once; only the first call does anything.
 *
 * Degradation is deliberately one-way. Frame times recover the moment the ember
 * canvas is dropped, and re-enabling on that recovery would put the page in a loop
 * of appearing and disappearing sparks.
 */
export function watchFrameBudget(): () => void {
  if (watching || dropping) return () => {}
  watching = true

  const sampler = createFrameSampler()

  const sample = (_time: number, delta: number) => {
    // rAF throttles to roughly 1fps in a background tab, and every one of those
    // frames looks catastrophic. Waiting behind a tab is not the reader's device —
    // returning before the clock advances also keeps the warmup honest.
    if (document.hidden) return

    const verdict = sampler(delta)
    if (verdict === 'watching') return

    stop()
    if (verdict === 'degrade') {
      dropping = true
      for (const listener of listeners) listener()
    }
  }

  function stop() {
    if (!watching) return
    watching = false
    gsap.ticker.remove(sample)
  }

  gsap.ticker.add(sample)
  return stop
}
