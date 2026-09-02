import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
export const THEME_STORAGE_KEY = 'akarpavicius-theme'

/**
 * Precedence: an explicit stored choice beats the system preference, which beats
 * the dark default. Pure so the precedence is unit testable — it is the kind of
 * rule that silently regresses.
 */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored
  return prefersDark ? 'dark' : 'light'
}

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    // Private mode, blocked site data — fall back to the system preference.
    return null
  }
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export function useTheme() {
  // Mirrors the inline pre-paint script in index.html. That script exists only to
  // beat first paint; this is the same rule, expressed once, in one language.
  const [theme, setTheme] = useState<Theme>(() =>
    resolveTheme(readStored(), window.matchMedia('(prefers-color-scheme: dark)').matches),
  )

  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Nothing to do — the choice just will not survive a reload.
    }
  }, [theme])

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // A circular wipe out of the toggle itself, where the browser supports it.
    // Everywhere else this is a plain class swap and nothing is lost.
    if (!origin || reduced || !document.startViewTransition) {
      setTheme(next)
      return
    }

    const { x, y } = origin
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    const transition = document.startViewTransition(() => {
      flushToggle(setTheme, next)
    })

    void transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }, [])

  return { theme, toggle }
}

/**
 * `startViewTransition` snapshots the DOM synchronously inside its callback, so the
 * state update has to be flushed there rather than scheduled for the next render.
 */
function flushToggle(setTheme: (theme: Theme) => void, next: Theme) {
  apply(next)
  setTheme(next)
}
