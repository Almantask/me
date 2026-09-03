import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ContentBundle, Language } from '../content/types'
import { bundles } from '../content'
import { LANGUAGE_PARAM, LANGUAGE_STORAGE_KEY, resolveLanguage } from './language'

interface LanguageContextValue {
  readonly language: Language
  readonly content: ContentBundle
  readonly setLanguage: (next: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStored(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY)
  } catch {
    return null
  }
}

function readParam(): string | null {
  return new URLSearchParams(window.location.search).get(LANGUAGE_PARAM)
}

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    resolveLanguage(readParam(), readStored(), navigator.languages ?? [navigator.language]),
  )

  const content = bundles[language]

  useEffect(() => {
    const { ui } = bundles[language]

    document.documentElement.lang = language
    document.title = ui.metaTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', ui.metaDescription)

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Private mode or blocked storage — the choice just will not survive a reload.
    }
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)

    // Reflect the choice in the URL so the page can be shared in the language it is
    // being read in. replaceState keeps the back button meaning what the reader
    // expects, and preserves whichever section anchor they are on.
    const url = new URL(window.location.href)
    url.searchParams.set(LANGUAGE_PARAM, next)
    window.history.replaceState(null, '', url)
  }, [])

  const value = useMemo(
    () => ({ language, content, setLanguage }),
    [language, content, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
