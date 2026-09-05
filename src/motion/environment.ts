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
  /**
   * The device cannot afford the decorative layers — the ember canvas, the magnetic
   * cards, the blurred glow. Entrances and scroll choreography still run; those are
   * the site's structure. This only drops what is pure garnish.
   */
  readonly lowPower: boolean
}

export type MediaMatcher = (query: string) => { matches: boolean }

/** What the browser will tell us about the hardware. Both are absent on Safari. */
export interface HardwareSignals {
  readonly cores?: number | undefined
  readonly memory?: number | undefined
  /** Set once measured frame times show the device is actually dropping frames. */
  readonly framesDropping?: boolean | undefined
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'
export const PIN_QUERY = '(min-width: 768px)'
/** The display itself cannot paint at animation rates — e-ink, some cheap panels. */
export const SLOW_UPDATE_QUERY = '(update: slow)'
/** Data saver on. Someone metering bytes is rarely on a device with frames to burn. */
export const REDUCED_DATA_QUERY = '(prefers-reduced-data: reduce)'

const WEAK_CORES = 4
const WEAK_MEMORY_GB = 4

export function resolveMotionEnvironment(
  matchMedia: MediaMatcher,
  hardware: HardwareSignals = {},
): MotionEnvironment {
  const reduced = matchMedia(REDUCED_MOTION_QUERY).matches
  const hasFinePointer = matchMedia(FINE_POINTER_QUERY).matches

  // An absent core or memory count must not read as "weak" — Safari reports neither,
  // and quietly stripping the site on every iPhone is not the goal.
  const weakCpu = hardware.cores !== undefined && hardware.cores <= WEAK_CORES
  const weakMemory = hardware.memory !== undefined && hardware.memory <= WEAK_MEMORY_GB

  // The counts only mean something alongside the kind of device. Four cores is a
  // budget phone and it is also a perfectly capable older desktop — and a CI runner.
  // Measured frame times are what catch the weak desktops; this catches the phones
  // before they have had a chance to drop anything.
  const weakHardware = !hasFinePointer && (weakCpu || weakMemory)

  // Reduced motion wins over everything. A fine pointer does not make a magnetic
  // card acceptable to someone who asked for stillness.
  return {
    reduced,
    finePointer: !reduced && hasFinePointer,
    canPin: !reduced && matchMedia(PIN_QUERY).matches,
    lowPower:
      hardware.framesDropping === true ||
      weakHardware ||
      matchMedia(SLOW_UPDATE_QUERY).matches ||
      matchMedia(REDUCED_DATA_QUERY).matches,
  }
}

/** Server/test-safe default: assume the most conservative environment. */
export const STILL: MotionEnvironment = {
  reduced: true,
  finePointer: false,
  canPin: false,
  lowPower: true,
}
