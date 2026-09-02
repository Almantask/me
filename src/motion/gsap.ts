import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Registered exactly once, here. Every other module imports from this file so
// plugin registration can never race a component that depends on it.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/** One easing family across the whole site — entrances and state changes. */
export const EASE = {
  enter: 'power3.out',
  state: 'power2.inOut',
  settle: 'elastic.out(1, 0.6)',
} as const

export const DURATION = {
  micro: 0.2,
  enter: 0.7,
} as const

/**
 * ScrollTrigger positions are measured against whatever fonts and images were
 * loaded at measure time. Fallback-font metrics are off by tens of pixels, which
 * is the classic "fine locally, misaligned in production" bug.
 */
export function refreshOnAssetsSettled(): () => void {
  let cancelled = false
  const refresh = () => {
    if (!cancelled) ScrollTrigger.refresh()
  }

  void document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh)

  return () => {
    cancelled = true
    window.removeEventListener('load', refresh)
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
