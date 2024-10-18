import { describe, it, jest, expect } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { addEventListener } from '../addEventListener'

describe('addEventListener', () => {
  it('should add event listener to window', () => {
    const cb = jest.fn()
    const removeEventListener = addEventListener(window, 'click', cb)
    fireEvent.click(window)
    expect(cb).toHaveBeenCalled()
    removeEventListener()
    fireEvent.click(window)
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
