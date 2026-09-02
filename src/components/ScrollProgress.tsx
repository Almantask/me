import { m, useScroll, useSpring } from 'motion/react'

/**
 * Reading progress. Motion owns this rather than GSAP because it is derived from
 * scroll offset, not choreographed against it.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-ember"
    />
  )
}
