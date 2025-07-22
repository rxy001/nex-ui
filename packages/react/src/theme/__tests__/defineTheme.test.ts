import { defineTheme } from '../index'

describe('defineTheme', () => {
  it('should return configuration as-is', () => {
    const config = {} as const

    expect(defineTheme(config)).toBe(config)
  })
})
