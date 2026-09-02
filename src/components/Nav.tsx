import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { useLenis } from 'lenis/react'
import { sections } from '../content/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'

const IDS = sections.map((section) => section.id)

export function Nav() {
  const active = useActiveSection(IDS)
  const lenis = useLenis()
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    // Each section's `scroll-mt-24` is the single source of truth for how far below
    // the sticky header a target lands — Lenis honours scroll-margin-top, and so
    // does scrollIntoView on the reduced-motion path where Lenis is not mounted.
    // Passing an extra offset here would double-count it.
    if (lenis) lenis.scrollTo(target)
    else target.scrollIntoView({ block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        condensed ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Sections" className="shell flex items-center justify-between gap-4 py-3">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0 })
          }}
          className="text-sm font-semibold tracking-tight"
        >
          Almantas <span className="text-muted">Karpavičius</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((section) => {
            const isActive = active === section.id
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => go(section.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isActive ? (
                    <m.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ember-quiet"
                    />
                  ) : null}
                  <span className="relative">{section.label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  )
}
