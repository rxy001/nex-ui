import { describe, it, expect } from '@jest/globals'
import { createElement, forwardRef, memo } from 'react'
import { supportRef } from '../supportRef'

describe('supportRef', () => {
  it('should work correctly', () => {
    const div = createElement('div')
    const simple = createElement(() => 'test')
    const memoized = createElement(memo(() => 'test'))
    const forwarded = createElement(forwardRef(() => 'test'))
    const memoizedforwardeded = createElement(memo(forwardRef(() => 'test')))
    expect(supportRef(div)).toBe(true)
    expect(supportRef(forwarded)).toBe(true)
    expect(supportRef(memoizedforwardeded)).toBe(true)
    expect(supportRef(simple)).toBe(false)
    expect(supportRef(memoized)).toBe(false)
  })
})
