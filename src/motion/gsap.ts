import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Registered exactly once, here. Every other module imports from this file so
// plugin registration can never race a component that depends on it.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

ScrollTrigger.config({
  // Mobile browsers resize the viewport as the URL bar slides in and out, which is
  // during a scroll — exactly when re-measuring every trigger on the page is least
  // affordable. This ignores resizes that only change the viewport height on touch
  // devices, which is the single largest source of scroll jank on a phone.
  ignoreMobileResize: true,
})

// Deliberately not set: `limitCallbacks: true`. It gates onEnter/onLeave behind an
// actual state toggle, and the reveals that arrive via ScrollTrigger.batch are
// onEnter callbacks — on a deep link that jumps past a section before its trigger
// has ever toggled, that is a section left blank. The saving is not worth it.

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
