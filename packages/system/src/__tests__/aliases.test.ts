import { createAliases } from '../aliases'

describe('createAliases', () => {
  let consoleSpy: jest.SpyInstance<
    void,
    [message?: any, ...optionalParams: any[]]
  >

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should work correctly', () => {
    const { getPropertiesByAlias } = createAliases({
      w: 'width',
      px: ['paddingLeft', 'paddingRight'],
    })

    expect(getPropertiesByAlias('w')).toEqual(['width'])
    expect(getPropertiesByAlias('px')).toEqual(['paddingLeft', 'paddingRight'])
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it('should throw an error if the alias is invalid', () => {
    createAliases({
      // @ts-expect-error
      a: {},
      // @ts-expect-error
      b: [{}, {}],
      // @ts-expect-error
      c: 12,
      // @ts-expect-error
      d: () => {},
      // @ts-expect-error
      e: [1, 2],
      // @ts-expect-error
      f: [[]],
      // @ts-expect-error
      g: [() => {}],
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledTimes(7)
  })
})
