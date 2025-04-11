import { createScales } from '../scales'

describe('createScales', () => {
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
    const { getCategoryByProperty } = createScales({
      color: 'colors',
      width: 'sizes',
    })

    expect(getCategoryByProperty('color')).toEqual('colors')
    expect(getCategoryByProperty('width')).toEqual('sizes')
    expect(consoleSpy).not.toBeCalled()
  })

  it('should throw an error if the scale is invalid', () => {
    createScales({
      // @ts-expect-error
      a: {},
      b: [],
      c: 1,
      d: () => {},
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toBeCalledTimes(4)
  })
})
