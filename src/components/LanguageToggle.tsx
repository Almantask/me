import { otherLanguage } from '../i18n/language'
import { useLanguage } from '../i18n/useContent'

export function LanguageToggle() {
  const { language, content, setLanguage } = useLanguage()
  const next = otherLanguage(language)

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      /*
        Both the accessible name and the `lang` attribute are in the language being
        switched *to*: a reader who cannot read the current language can still find
        the way out, and a screen reader pronounces the label correctly.

        An explicit aria-label replaces the visible "LT"/"EN" as the accessible name,
        which is the point — "LT" alone tells a screen-reader user nothing.
      */
      lang={next}
      aria-label={content.ui.switchLanguage}
      className="rounded-full border border-line px-3 py-2 text-xs font-semibold tracking-wide text-muted uppercase transition-colors hover:border-ember hover:text-ember"
    >
      {next}
    </button>
  )
}
