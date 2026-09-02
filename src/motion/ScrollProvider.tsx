import { type ReactNode, useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { ScrollTrigger, gsap, refreshOnAssetsSettled } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

interface Props {
  readonly children: ReactNode
}

const LENIS_OPTIONS = {
  autoRaf: false,
  duration: 1.1,
  smoothWheel: true,
  syncTouch: false,
  // Let Lenis handle in-page anchor clicks. Without this a plain <a href="#contact">
  // does a native jump that desyncs Lenis from the position it thinks it is at.
  anchors: true,
} as const

/**
 * Owns the scroll position — and nothing visual.
 *
 * Lenis and ScrollTrigger must share one RAF loop. Without the sync below,
 * ScrollTrigger reads a scroll position Lenis has already moved past and every
 * scrubbed animation judders.
 */
export function ScrollProvider({ children }: Props) {
  const { reduced } = useMotionEnvironment()
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => refreshOnAssetsSettled(), [])

  useEffect(() => {
    if (reduced) return

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      gsap.ticker.lagSmoothing(500, 33)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [reduced])

  // Hijacked scrolling is precisely what prefers-reduced-motion exists to prevent,
  // so under that preference Lenis is not mounted at all.
  if (reduced) return <>{children}</>

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={LENIS_OPTIONS}
    >
      {children}
    </ReactLenis>
  )
}
