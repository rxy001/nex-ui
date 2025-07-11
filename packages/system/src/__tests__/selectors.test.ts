import { createSelectors } from '../selectors'

describe('createSelectors', () => {
  let consoleSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error')
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should work correctly', () => {
    const HOVER_SELECTOR = '&:not(:disabled):not([data-disabled=true]):hover'
    const DARK_SELECTOR = '.dark'
    const { getCustomizedSelector } = createSelectors({
      selectors: { hover: HOVER_SELECTOR, dark: DARK_SELECTOR },
      getMediaSelectors: () => ({}),
    })

    expect(getCustomizedSelector('_hover')).toBe(HOVER_SELECTOR)
    expect(getCustomizedSelector('_dark')).toBe(DARK_SELECTOR)
  })

  it('should throw an error if the selector is invalid', () => {
    createSelectors({
      selectors: {
        // @ts-expect-error
        sm: {},
        // @ts-expect-error
        md: [],
        // @ts-expect-error
        lg: 1,
        // @ts-expect-error
        xl: () => {},
      },
      getMediaSelectors: () => ({}),
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(4)
  })

  it('should throw an error if duplicate selectors are encountered', () => {
    createSelectors({
      selectors: { sm: 'sm' },
      getMediaSelectors: () => ({
        sm: 'smsm',
      }),
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(1)
  })
})
