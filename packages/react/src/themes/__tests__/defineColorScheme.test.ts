import { defineColorScheme } from '../index'

describe('defineColorScheme', () => {
  it('should return configuration as-is', () => {
    const config = {
      colorSchemeSelector: 'data',
      defaultMode: 'light',
      modeStorageKey: 'color-scheme',
    } as const

    expect(defineColorScheme(config)).toBe(config)
  })
})
