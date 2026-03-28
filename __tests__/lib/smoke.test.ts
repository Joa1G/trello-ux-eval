import { describe, it, expect } from 'vitest'

describe('Smoke test', () => {
  it('should pass basic assertion', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have correct project structure expectations', () => {
    expect(typeof window).toBe('object') // jsdom environment
  })
})
