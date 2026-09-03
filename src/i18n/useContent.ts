import { useContext } from 'react'
import { LanguageContext } from './LanguageProvider'

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return value
}

/** Shorthand for the common case: a component only wants the copy. */
export function useContent() {
  return useLanguage().content
}

/** Shorthand for the even more common case: a component only wants chrome strings. */
export function useUi() {
  return useLanguage().content.ui
}
