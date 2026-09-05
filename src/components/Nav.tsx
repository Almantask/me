import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { useLenis } from 'lenis/react'
import { useContent } from '../i18n/useContent'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const { profile, sections, ui } = useContent()
  // Section ids are identical across languages, so switching language never
  // invalidates the active-section subscription or an anchor someone shared.
  const active = useActiveSection(sections.map((section) => section.id))
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

  const [firstName, ...restOfName] = profile.name.split(' ')

  // The condensed bar transitions colours only. `transition-all` also interpolates
  // backdrop-filter, so crossing the threshold spent 300ms re-blurring the whole
  // page behind the header.
  //
  // The blur is desktop-only for the same reason: a live backdrop-filter on a fixed
  // full-width bar is re-composited for the entire duration of every scroll, and on
  // a phone that is the first effect to start costing frames. Below `lg` a more
  // opaque background carries the same separation for free.
  const surface = condensed
    ? 'border-b border-line bg-bg/95 lg:bg-bg/85 lg:backdrop-blur-md'
    : 'border-b border-transparent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${surface}`}
    >
      <nav aria-label={ui.sectionsNavLabel} className="shell flex items-center justify-between gap-4 py-3">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0 })
          }}
          className="text-sm font-semibold tracking-tight"
        >
          {firstName} <span className="text-muted">{restOfName.join(' ')}</span>
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

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
