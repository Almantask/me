import { profile } from '../content/profile'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, GSAP and rather too much enthusiasm.</p>
      </div>
    </footer>
  )
}
