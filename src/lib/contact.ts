export interface ContactDraft {
  readonly name: string
  readonly email: string
  readonly message: string
  /** Honeypot. Real people never see it, so anything in it is a bot. */
  readonly company: string
}

export type ContactField = 'name' | 'email' | 'message'

/**
 * Validation returns codes, not sentences. The messages themselves live with the
 * rest of the copy in `src/content/<lang>/ui.ts`, so this stays language-agnostic.
 */
export type ContactErrorCode =
  | 'name-required'
  | 'email-required'
  | 'email-invalid'
  | 'message-short'

export type FieldErrors = Partial<Record<ContactField, ContactErrorCode>>

export const EMPTY_DRAFT: ContactDraft = { name: '', email: '', message: '', company: '' }
export const MIN_MESSAGE_LENGTH = 10

// Deliberately permissive: something@something.tld. Anything stricter starts
// rejecting real addresses, and the mail either sends or it does not.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(draft: ContactDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (draft.name.trim().length === 0) errors.name = 'name-required'

  if (draft.email.trim().length === 0) errors.email = 'email-required'
  else if (!EMAIL.test(draft.email.trim())) errors.email = 'email-invalid'

  if (draft.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = 'message-short'

  return errors
}

export function isBot(draft: ContactDraft): boolean {
  return draft.company.trim().length > 0
}

/**
 * The zero-config path. With no form endpoint configured, submitting opens the
 * visitor's mail client with everything already filled in — which works on a static
 * host with no account, no signup and nothing to break.
 */
export function buildMailto(to: string, draft: ContactDraft, subject: string): string {
  const body = `${draft.message.trim()}\n\n—\n${draft.name.trim()}\n${draft.email.trim()}`

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
