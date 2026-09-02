import { describe, expect, it } from 'vitest'
import { EMPTY_DRAFT, buildMailto, isBot, validate } from '../lib/contact'

const draft = (over: Partial<typeof EMPTY_DRAFT> = {}) => ({
  ...EMPTY_DRAFT,
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'I would like to talk about mentoring.',
  ...over,
})

describe('validation', () => {
  it('accepts a complete message', () => {
    expect(validate(draft())).toEqual({})
  })

  it('rejects an empty form field by field', () => {
    const errors = validate(EMPTY_DRAFT)
    expect(Object.keys(errors).toSorted()).toEqual(['email', 'message', 'name'])
  })

  it('rejects whitespace-only input', () => {
    expect(validate(draft({ name: '   ' })).name).toBeDefined()
  })

  it('rejects a malformed address', () => {
    for (const email of ['jane', 'jane@', 'jane@example', '@example.com', 'a b@c.com']) {
      expect(validate(draft({ email })).email).toBeDefined()
    }
  })

  it('rejects a message too short to be worth sending', () => {
    expect(validate(draft({ message: 'hi' })).message).toBeDefined()
  })
})

describe('honeypot', () => {
  it('flags a filled hidden field as a bot', () => {
    expect(isBot(draft({ company: 'Acme' }))).toBe(true)
  })

  it('leaves real submissions alone', () => {
    expect(isBot(draft())).toBe(false)
  })
})

describe('mailto fallback', () => {
  const url = new URL(buildMailto('almantusk@gmail.com', draft()))
  const params = new URLSearchParams(url.search)

  it('addresses the mail correctly', () => {
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('almantusk@gmail.com')
  })

  it('names the sender in the subject', () => {
    expect(params.get('subject')).toBe('Hello from Jane Doe')
  })

  it('carries the message and a signature back to the sender', () => {
    const body = params.get('body') ?? ''
    expect(body).toContain('I would like to talk about mentoring.')
    expect(body).toContain('jane@example.com')
  })

  it('encodes characters that would otherwise break the URL', () => {
    const raw = buildMailto('a@b.com', draft({ message: 'Testing & "quotes" + #hashes, please.' }))
    expect(raw).not.toContain('"')
    expect(raw).toContain('%26')
    expect(new URLSearchParams(new URL(raw).search).get('body')).toContain('& "quotes" + #hashes')
  })
})
