import { describe, it, expect } from 'vitest'
import { linkResolver } from '@/helpers'
import { NEWS_URL } from '@/config'

describe('linkResolver', () => {
  it('builds the news URL from the document uid', () => {
    expect(linkResolver({ type: 'news', uid: 'naira-hits-new-low' })).toBe(`/${NEWS_URL}/naira-hits-new-low`)
  })

  it('falls back to the home page for anything else', () => {
    expect(linkResolver({ type: 'news' })).toBe('/')
    expect(linkResolver({ type: 'landing', uid: 'home' })).toBe('/')
    expect(linkResolver({})).toBe('/')
  })
})
