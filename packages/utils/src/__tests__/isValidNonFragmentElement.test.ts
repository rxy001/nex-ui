import { Fragment, createElement } from 'react'
import { isValidNonFragmentElement } from '../index'

afterEach(() => {
  jest.clearAllMocks()
})

test('returns false and logs when node is not a valid React element', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
  expect(isValidNonFragmentElement('just a string')).toBe(false)
  expect(consoleSpy).toHaveBeenCalled()
})

test('returns false and logs when node is a React.Fragment', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

  const frag = createElement(Fragment, null, 'child')
  expect(isValidNonFragmentElement(frag)).toBe(false)
  expect(consoleSpy).toHaveBeenCalled()
})

test('returns true and does not log for a valid non-fragment element', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

  const div = createElement('div')
  expect(isValidNonFragmentElement(div)).toBe(true)
  expect(consoleSpy).not.toHaveBeenCalled()
})
