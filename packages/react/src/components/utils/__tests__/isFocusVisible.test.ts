import { isFocusVisible } from '../index'

describe('isFocusVisible', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns true when element.matches(":focus-visible") returns true', () => {
    const matches = jest.fn().mockReturnValue(true)
    const el = { matches } as unknown as Element

    expect(isFocusVisible(el)).toBe(true)
    expect(matches).toHaveBeenCalledWith(':focus-visible')
  })

  it('returns false when element.matches(":focus-visible") returns false', () => {
    const matches = jest.fn().mockReturnValue(false)
    const el = { matches } as unknown as Element

    expect(isFocusVisible(el)).toBe(false)
    expect(matches).toHaveBeenCalledWith(':focus-visible')
  })

  it('returns false when element has no matches method', () => {
    const el = {} as unknown as Element
    expect(isFocusVisible(el)).toBe(false)
  })
})
