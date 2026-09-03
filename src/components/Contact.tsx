import { useContent } from '../i18n/useContent'
import { useReveal } from '../motion/useReveal'
import { ContactForm } from './ContactForm'
import { ExternalLink } from './ExternalLink'
import { Section } from './Section'

export function Contact() {
  const { profile, socials, ui } = useContent()
  const scope = useReveal<HTMLDivElement>({ stagger: 0.1, y: 24 })

  return (
    <Section
      id="contact"
      eyebrow={ui.contactEyebrow}
      title={ui.contactTitle}
      lede={ui.contactLede}
    >
      <div ref={scope} className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div data-reveal className="space-y-8">
          <div>
            <h3 className="eyebrow">{ui.directHeading}</h3>
            <p className="mt-3 text-lg">
              <a href={`mailto:${profile.email}`} className="hover:text-ember hover:underline">
                {profile.email}
              </a>
            </p>
            <p className="mt-1 text-muted">{profile.location}</p>
          </div>

          <div>
            <h3 className="eyebrow">{ui.elsewhereHeading}</h3>
            <ul className="mt-4 space-y-2">
              {socials.map((social) => (
                <li key={social.href}>
                  <ExternalLink href={social.href}>{social.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
