/**
 * Motion capability detection, kept as pure functions so the decisions are unit
 * testable. Getting these wrong is an accessibility bug, not a polish bug.
 */

export interface MotionEnvironment {
  /** The user asked for less motion. Nothing animates; Lenis is never mounted. */
  readonly reduced: boolean
  /** A real pointer that can hover. Gates magnetic cards and cursor-follow glow. */
  readonly finePointer: boolean
  /** Wide enough that pinning does not fight the browser's own scroll gestures. */
  readonly canPin: boolean
}

export type MediaMatcher = (query: string) => { matches: boolean }

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
export const PIN_QUERY = '(min-width: 768px)'

export function resolveMotionEnvironment(matchMedia: MediaMatcher): MotionEnvironment {
  const reduced = matchMedia(REDUCED_MOTION_QUERY).matches

  // Reduced motion wins over everything. A fine pointer does not make a magnetic
  // card acceptable to someone who asked for stillness.
  return {
    reduced,
    finePointer: !reduced && matchMedia(FINE_POINTER_QUERY).matches,
    canPin: !reduced && matchMedia(PIN_QUERY).matches,
  }
}

/** Server/test-safe default: assume the most conservative environment. */
export const STILL: MotionEnvironment = { reduced: true, finePointer: false, canPin: false }
