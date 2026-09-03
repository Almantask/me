import { type FormEvent, useId, useState } from 'react'
import { contactFormEndpoint } from '../content/site'
import type { UiStrings } from '../content/types'
import { useContent } from '../i18n/useContent'
import {
  EMPTY_DRAFT,
  type ContactDraft,
  type ContactErrorCode,
  type FieldErrors,
  buildMailto,
  isBot,
  validate,
} from '../lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'handed-off'

function errorMessage(code: ContactErrorCode, ui: UiStrings): string {
  const messages: Record<ContactErrorCode, string> = {
    'name-required': ui.errorName,
    'email-required': ui.errorEmailMissing,
    'email-invalid': ui.errorEmailInvalid,
    'message-short': ui.errorMessage,
  }
  return messages[code]
}

function statusMessage(status: Exclude<Status, 'idle'>, ui: UiStrings): string {
  const messages: Record<Exclude<Status, 'idle'>, string> = {
    sending: ui.statusSending,
    sent: ui.statusSent,
    failed: ui.statusFailed,
    'handed-off': ui.statusHandedOff,
  }
  return messages[status]
}

export function ContactForm() {
  const { profile, ui } = useContent()
  const id = useId()
  const [draft, setDraft] = useState<ContactDraft>(EMPTY_DRAFT)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof ContactDraft) => (value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isBot(draft)) {
      setStatus('sent')
      return
    }

    const found = validate(draft)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    if (!contactFormEndpoint) {
      window.location.href = buildMailto(profile.email, draft, ui.mailSubject(draft.name.trim()))
      setStatus('handed-off')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: draft.name, email: draft.email, message: draft.message }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setDraft(EMPTY_DRAFT)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const field = (name: 'name' | 'email' | 'message') => ({
    id: `${id}-${name}`,
    name,
    value: draft[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
    className: `w-full rounded-xl border bg-surface px-4 py-3 outline-none transition-colors focus-visible:border-ember ${
      errors[name] ? 'border-red-500/70' : 'border-line'
    }`,
  })

  const fieldError = (name: 'name' | 'email' | 'message') => {
    const code = errors[name]
    if (!code) return null
    return (
      <p id={`${id}-${name}-error`} className="mt-2 text-sm text-red-500">
        {errorMessage(code, ui)}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium">
          {ui.formName}
        </label>
        <input
          {...field('name')}
          type="text"
          autoComplete="name"
          onChange={(event) => set('name')(event.target.value)}
        />
        {fieldError('name')}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">
          {ui.formEmail}
        </label>
        <input
          {...field('email')}
          type="email"
          autoComplete="email"
          onChange={(event) => set('email')(event.target.value)}
        />
        {fieldError('email')}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium">
          {ui.formMessage}
        </label>
        <textarea
          {...field('message')}
          rows={5}
          onChange={(event) => set('message')(event.target.value)}
        />
        {fieldError('message')}
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots detect. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>{ui.formCompany}</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={draft.company}
          onChange={(event) => set('company')(event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {ui.formSubmit}
        </button>

        {/* <output> carries an implicit role="status", so results are announced. */}
        <output aria-live="polite" className="text-sm text-muted">
          {status === 'idle' ? '' : statusMessage(status, ui)}
        </output>
      </div>
    </form>
  )
}
