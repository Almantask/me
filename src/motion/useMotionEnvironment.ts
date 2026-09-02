import { useSyncExternalStore } from 'react'
import {
  FINE_POINTER_QUERY,
  PIN_QUERY,
  REDUCED_MOTION_QUERY,
  STILL,
  resolveMotionEnvironment,
  type MotionEnvironment,
} from './environment'

const QUERIES = [REDUCED_MOTION_QUERY, FINE_POINTER_QUERY, PIN_QUERY]

let cache: MotionEnvironment | null = null

function read(): MotionEnvironment {
  // useSyncExternalStore compares snapshots by identity, so the same object has to
  // come back until a query actually changes.
  const next = resolveMotionEnvironment((q) => window.matchMedia(q))
  if (
    cache &&
    cache.reduced === next.reduced &&
    cache.finePointer === next.finePointer &&
    cache.canPin === next.canPin
  ) {
    return cache
  }
  cache = next
  return next
}

function subscribe(onChange: () => void): () => void {
  const lists = QUERIES.map((q) => window.matchMedia(q))
  for (const list of lists) list.addEventListener('change', onChange)
  return () => {
    for (const list of lists) list.removeEventListener('change', onChange)
  }
}

/**
 * The single source of truth for whether — and how — anything is allowed to move.
 * Re-renders if the user changes the preference mid-visit.
 */
export function useMotionEnvironment(): MotionEnvironment {
  return useSyncExternalStore(subscribe, read, () => STILL)
}
