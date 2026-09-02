import { type FormEvent, useId, useState } from 'react'
import { contactFormEndpoint } from '../content/site'
import { profile } from '../content/profile'
import {
  EMPTY_DRAFT,
  type ContactDraft,
  type FieldErrors,
  buildMailto,
  isBot,
  validate,
} from '../lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'handed-off'

const STATUS_MESSAGE: Record<Exclude<Status, 'idle'>, string> = {
  sending: 'Sending…',
  sent: 'Thank you — your message is on its way.',
  failed: 'That did not go through. Email me directly and I will pick it up.',
  'handed-off': 'Your mail app should be opening with the message ready to send.',
}

export function ContactForm() {
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
      window.location.href = buildMailto(profile.email, draft)
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

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium">
          Your name
        </label>
        <input
          {...field('name')}
          type="text"
          autoComplete="name"
          onChange={(event) => set('name')(event.target.value)}
        />
        {errors.name ? (
          <p id={`${id}-name-error`} className="mt-2 text-sm text-red-500">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">
          Your email
        </label>
        <input
          {...field('email')}
          type="email"
          autoComplete="email"
          onChange={(event) => set('email')(event.target.value)}
        />
        {errors.email ? (
          <p id={`${id}-email-error`} className="mt-2 text-sm text-red-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium">
          What is on your mind?
        </label>
        <textarea
          {...field('message')}
          rows={5}
          onChange={(event) => set('message')(event.target.value)}
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="mt-2 text-sm text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots detect. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
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
          Send message
        </button>

        {/* <output> carries an implicit role="status", so results are announced. */}
        <output aria-live="polite" className="text-sm text-muted">
          {status === 'idle' ? '' : STATUS_MESSAGE[status]}
        </output>
      </div>
    </form>
  )
}
