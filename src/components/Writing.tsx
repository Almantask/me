import { useContent } from '../i18n/useContent'
import { useReveal } from '../motion/useReveal'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Writing() {
  const { awards, books, ui } = useContent()
  const scope = useReveal<HTMLDivElement>({ stagger: 0.1, y: 28 })

  return (
    <Section id="writing" eyebrow={ui.writingEyebrow} title={ui.writingTitle}>
      <div ref={scope}>
        <ul className="grid gap-5 md:grid-cols-2">
          {books.map((book) => (
            <li key={book.id} data-reveal>
              <a
                href={book.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card group flex h-full flex-col p-7 transition-colors hover:border-ember"
              >
                <p className="eyebrow">{book.credit}</p>
                <h3 className="mt-3 font-serif text-2xl italic md:text-3xl">{book.title}</h3>
                <p className="mt-2 text-sm text-muted">
                  {book.publisher} · {book.year}
                </p>
                <p className="mt-5 flex-1 text-muted">{book.blurb}</p>
                <span className="mt-6 text-sm font-medium text-ember group-hover:underline">
                  {ui.findOnAmazon}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <h3 className="eyebrow mt-16">{ui.awardsHeading}</h3>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {awards.map((award) => (
            <li key={award.id} data-reveal className="card flex gap-5 p-6">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ember-quiet text-ember"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.7">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3 .9L7.5 22l4.5-2.4L16.5 22 15 16.4"
                  />
                </svg>
              </span>
              <div>
                <h4 className="font-semibold">
                  {award.href ? (
                    <ExternalLink href={award.href}>{award.title}</ExternalLink>
                  ) : (
                    award.title
                  )}
                </h4>
                <p className="mt-1 text-sm text-ember">{award.years}</p>
                <p className="mt-2 text-sm text-muted">{award.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
