import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { useContent } from '../i18n/useContent'
import { DURATION, EASE, ScrollTrigger, gsap, useGSAP } from '../motion/gsap'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'
import { RoleCard } from './RoleCard'
import { Section } from './Section'

export function Experience() {
  const { experience, ui } = useContent()
  const scope = useRef<HTMLDivElement>(null)
  const spineRef = useRef<HTMLSpanElement>(null)
  const [expanded, setExpanded] = useState(false)
  const { reduced } = useMotionEnvironment()

  const featured = experience.filter((role) => role.featured)
  const earlier = experience.filter((role) => !role.featured)

  useGSAP(
    () => {
      const spine = spineRef.current
      const roles = gsap.utils.toArray<HTMLElement>('[data-role]')
      const nodes = gsap.utils.toArray<HTMLElement>('[data-node]')

      if (reduced) {
        gsap.set(spine, { scaleY: 1 })
        gsap.set([...roles, ...nodes], { opacity: 1, x: 0, scale: 1 })
        return
      }

      // The spine draws itself top-down, tied to how far through the list you are.
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: scope.current, start: 'top 70%', end: 'bottom 75%', scrub: 0.6 },
        },
      )

      for (const [index, role] of roles.entries()) {
        gsap.from(role, {
          opacity: 0,
          x: -18,
          duration: DURATION.enter,
          ease: EASE.enter,
          scrollTrigger: { trigger: role, start: 'top 85%', once: true },
        })

        const node = nodes[index]
        if (node) {
          gsap.from(node, {
            scale: 0,
            duration: 0.5,
            ease: EASE.settle,
            scrollTrigger: { trigger: role, start: 'top 82%', once: true },
          })
        }
      }
    },
    // Language is deliberately not a dependency: switching it re-renders the same
    // elements in the same structure, and re-running would replay every entrance.
    { scope, dependencies: [reduced, expanded] },
  )

  return (
    <Section
      id="experience"
      eyebrow={ui.experienceEyebrow}
      title={ui.experienceTitle}
      lede={ui.experienceLede}
    >
      <div ref={scope} className="relative">
        {/* Unlit track first, then the ember spine that draws over it. */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-line md:left-6"
        />
        <span
          ref={spineRef}
          aria-hidden="true"
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-ember md:left-6"
        />

        <div className="space-y-14">
          {featured.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}

          <div id="earlier-roles">
            <AnimatePresence initial={false}>
              {expanded ? (
                <m.div
                  key="earlier"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  // Seven new roles shift every trigger below them; without this the
                  // rest of the page animates against stale positions.
                  onAnimationComplete={() => ScrollTrigger.refresh()}
                  className="overflow-hidden"
                >
                  <div className="space-y-14 pt-14">
                    {earlier.map((role) => (
                      <RoleCard key={role.id} role={role} />
                    ))}
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 pl-10 md:pl-14">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls="earlier-roles"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ember hover:text-ember"
          >
            {expanded ? ui.hideEarlierRoles : ui.showEarlierRoles(earlier.length)}
          </button>
        </div>
      </div>
    </Section>
  )
}
