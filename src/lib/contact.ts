export interface ContactDraft {
  readonly name: string
  readonly email: string
  readonly message: string
  /** Honeypot. Real people never see it, so anything in it is a bot. */
  readonly company: string
}

export type ContactField = 'name' | 'email' | 'message'
export type FieldErrors = Partial<Record<ContactField, string>>

export const EMPTY_DRAFT: ContactDraft = { name: '', email: '', message: '', company: '' }

// Deliberately permissive: something@something.tld. Anything stricter starts
// rejecting real addresses, and the mail either sends or it does not.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(draft: ContactDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (draft.name.trim().length === 0) errors.name = 'Please tell me who you are.'
  if (draft.email.trim().length === 0) errors.email = 'I need an address to reply to.'
  else if (!EMAIL.test(draft.email.trim())) errors.email = 'That does not look like an email address.'
  if (draft.message.trim().length < 10) errors.message = 'A little more detail, please — at least 10 characters.'

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
export function buildMailto(to: string, draft: ContactDraft): string {
  const subject = `Hello from ${draft.name.trim()}`
  const body = `${draft.message.trim()}\n\n—\n${draft.name.trim()}\n${draft.email.trim()}`

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
