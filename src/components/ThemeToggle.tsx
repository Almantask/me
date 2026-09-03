import type { MouseEvent } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useUi } from '../i18n/useContent'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const ui = useUi()

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    // The wipe expands from the button itself, so the swap has an origin the eye
    // can follow rather than appearing to happen everywhere at once.
    const box = event.currentTarget.getBoundingClientRect()
    toggle({ x: box.left + box.width / 2, y: box.top + box.height / 2 })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={theme === 'dark' ? ui.switchToLight : ui.switchToDark}
      className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-ember hover:text-ember"
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" strokeWidth="1.7">
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"
            />
          </>
        ) : (
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z"
          />
        )}
      </svg>
    </button>
  )
}
