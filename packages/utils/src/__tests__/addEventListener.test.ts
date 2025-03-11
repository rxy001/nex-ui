import { describe, it, jest, expect } from '@jest/globals'
import { fireEvent } from '@testing-library/dom'
import { addEventListener } from '../addEventListener'

describe('addEventListener', () => {
  it('should add event listener to body', () => {
    const cb = jest.fn()
    const removeEventListener = addEventListener(document.body, 'click', cb)
    fireEvent.click(document.body)
    expect(cb).toHaveBeenCalled()
    removeEventListener()
    fireEvent.click(document.body)
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
