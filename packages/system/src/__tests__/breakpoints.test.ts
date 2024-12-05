import { describe, expect, it } from '@jest/globals'
import { createBreakpoints, toMediaKey } from '../breakpoints'

describe('createBreakpoint', () => {
  it('works correctly', () => {
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
  })
})
