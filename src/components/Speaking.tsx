import { useContent } from '../i18n/useContent'
import { useReveal } from '../motion/useReveal'
import { Section } from './Section'

export function Speaking() {
  const { talks, ui } = useContent()
  const scope = useReveal<HTMLUListElement>({ stagger: 0.06, y: 20 })

  return (
    <Section
      id="speaking"
      eyebrow={ui.speakingEyebrow}
      title={ui.speakingTitle}
      lede={ui.speakingLede}
    >
      <ul ref={scope} className="divide-y divide-line border-y border-line">
        {talks.map((talk) => {
          const row = (
            <>
              <span className="w-16 shrink-0 font-serif text-2xl italic text-ember transition-transform duration-300 group-hover:scale-110 md:w-24 md:text-3xl">
                {talk.year}
              </span>
              <span className="flex-1">
                <span className="block font-medium md:text-lg">{talk.title}</span>
                <span className="mt-1 block text-sm text-muted">{talk.events.join(' · ')}</span>
              </span>
              {talk.href ? (
                <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-ember">
                  <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                    <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
                  </svg>
                  {ui.watchTalk}
                </span>
              ) : null}
            </>
          )

          return (
            <li key={talk.id} data-reveal className="group relative isolate">
              {/* Hover wipe sits behind the row without a negative z-index, which
                  would otherwise punch through the section background. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-0 bg-ember-quiet transition-[width] duration-500 group-hover:w-full"
              />
              {talk.href ? (
                <a
                  href={talk.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-5 py-6 transition-colors hover:text-ember"
                >
                  {row}
                  <span className="sr-only">— {ui.watchTalkContext}</span>
                </a>
              ) : (
                <div className="flex items-center gap-5 py-6">{row}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
