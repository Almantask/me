import { m, useScroll } from 'motion/react'

/**
 * Reading progress. Motion owns this rather than GSAP because it is derived from
 * scroll offset, not choreographed against it.
 *
 * Driven straight off `scrollYProgress` with no spring in between: Lenis has already
 * smoothed the scroll position this reads from, and a second smoothing pass on top
 * only adds a spring that keeps integrating — and keeps requesting frames — after
 * the reader has stopped, in exchange for lag nobody asked for.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-ember"
    />
  )
}
