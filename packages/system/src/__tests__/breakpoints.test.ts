import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals'
import { createBreakpoints, toMediaKey } from '../breakpoints'

describe('createBreakpoint', () => {
  let consoleSpy: jest.SpiedFunction<() => void>

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error')
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should work correctly', () => {
    const { getMediaSelectors } = createBreakpoints({
      sm: '500px',
      md: '700px',
      lg: '900px',
    })

    expect(getMediaSelectors()).toEqual({
      0: toMediaKey('500px'),
      1: toMediaKey('700px'),
      2: toMediaKey('900px'),
      sm: toMediaKey('500px'),
      md: toMediaKey('700px'),
      lg: toMediaKey('900px'),
    })

    expect(consoleSpy).not.toBeCalled()
  })

  it('should throw an error if the breakpoint is invalid', () => {
    createBreakpoints({
      // @ts-expect-error
      sm: {},
      // @ts-expect-error
      md: [],
      // @ts-expect-error
      lg: 1,
      // @ts-expect-error
      xl: () => {},
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleSpy).toBeCalledTimes(4)
  })
})
