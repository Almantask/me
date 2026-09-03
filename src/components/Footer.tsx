import { useContent } from '../i18n/useContent'

export function Footer() {
  const { profile, ui } = useContent()

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{ui.footerNote}</p>
      </div>
    </footer>
  )
}
