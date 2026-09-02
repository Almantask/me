import { about, education, languages } from '../content/profile'
import { useReveal } from '../motion/useReveal'
import { Section } from './Section'

export function About() {
  const scope = useReveal<HTMLDivElement>({ stagger: 0.1 })

  return (
    <Section
      id="about"
      eyebrow="About"
      title="I chose growing people over growing codebases."
    >
      <div ref={scope} className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="space-y-8 text-sm">
          <div data-reveal>
            <h3 className="eyebrow">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((entry) => (
                <li key={entry.id}>
                  <p className="font-medium">{entry.qualification}</p>
                  <p className="text-muted">
                    {entry.institution} · {entry.period}
                  </p>
                  {entry.note ? <p className="mt-1 text-muted">{entry.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="eyebrow">Languages</h3>
            <ul className="mt-4 space-y-1 text-muted">
              {languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  )
}
