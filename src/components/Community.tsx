import { useContent } from '../i18n/useContent'
import { useReveal } from '../motion/useReveal'
import { ExternalLink } from './ExternalLink'
import { MentorshipBeats } from './MentorshipBeats'
import { StatTile } from './StatTile'

export function Community() {
  const { community, mentorshipLede, stats, ui } = useContent()
  const scope = useReveal<HTMLDivElement>({ stagger: 0.07, y: 26 })

  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="scroll-mt-24 border-y border-line bg-surface-2 py-20 md:py-28"
    >
      <div className="shell">
        <p className="eyebrow">{ui.communityEyebrow}</p>
        <h2
          id="community-heading"
          className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl lg:text-5xl"
        >
          {ui.communityTitle}
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{mentorshipLede}</p>
      </div>

      <div className="shell mt-16">
        <MentorshipBeats />
      </div>

      <div ref={scope} className="shell mt-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatTile key={stat.id} stat={stat} />
          ))}
        </ul>

        <ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {community.map((item) => (
            <li key={item.id} data-reveal>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-ember">{item.period}</p>
              <p className="mt-3 text-muted">{item.blurb}</p>
              {item.links.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <ExternalLink href={link.href} className="text-ember">
                        {link.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
