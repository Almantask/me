import { useState, useSyncExternalStore } from 'react'
import {
  FINE_POINTER_QUERY,
  PIN_QUERY,
  REDUCED_DATA_QUERY,
  REDUCED_MOTION_QUERY,
  SLOW_UPDATE_QUERY,
  STILL,
  resolveMotionEnvironment,
  type MotionEnvironment,
} from './environment'
import { framesAreDropping, subscribeFrameBudget } from './frameBudget'

const QUERIES = [
  REDUCED_MOTION_QUERY,
  FINE_POINTER_QUERY,
  PIN_QUERY,
  SLOW_UPDATE_QUERY,
  REDUCED_DATA_QUERY,
]

interface NavigatorWithHints extends Navigator {
  readonly deviceMemory?: number
}

let cache: MotionEnvironment | null = null

function read(): MotionEnvironment {
  const nav = navigator as NavigatorWithHints

  // useSyncExternalStore compares snapshots by identity, so the same object has to
  // come back until a query actually changes.
  const next = resolveMotionEnvironment((q) => window.matchMedia(q), {
    cores: nav.hardwareConcurrency,
    memory: nav.deviceMemory,
    framesDropping: framesAreDropping(),
  })

  if (
    cache &&
    cache.reduced === next.reduced &&
    cache.finePointer === next.finePointer &&
    cache.canPin === next.canPin &&
    cache.lowPower === next.lowPower
  ) {
    return cache
  }
  cache = next
  return next
}

function subscribe(onChange: () => void): () => void {
  const lists = QUERIES.map((q) => window.matchMedia(q))
  for (const list of lists) list.addEventListener('change', onChange)
  const unsubscribeFrames = subscribeFrameBudget(onChange)

  return () => {
    for (const list of lists) list.removeEventListener('change', onChange)
    unsubscribeFrames()
  }
}

/**
 * The single source of truth for whether — and how — anything is allowed to move.
 * Re-renders if the user changes the preference mid-visit, or if the device turns
 * out not to be able to keep up.
 */
export function useMotionEnvironment(): MotionEnvironment {
  return useSyncExternalStore(subscribe, read, () => STILL)
}

/**
 * The low-power verdict as it stood on first render, frozen there.
 *
 * The measured half of that verdict arrives seconds in, which is what makes it
 * worth having — but a one-shot entrance keyed to a value that can change would
 * tear itself down and replay an entrance the reader has already watched. Anything
 * choreographed once reads this; anything that can be swapped out silently — the
 * ember canvas, the magnetic cards, a blur — reads the live value and benefits from
 * the change.
 */
export function useInitialLowPower(): boolean {
  const { lowPower } = useMotionEnvironment()
  // useState's initial value, not a ref: it is captured on the first render and
  // every later argument is ignored, which is exactly the semantics wanted — and
  // unlike a ref it is a legal thing to read while rendering.
  const [initial] = useState(lowPower)

  return initial
}
