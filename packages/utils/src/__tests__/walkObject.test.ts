import { describe, it, expect, jest } from '@jest/globals'
import { walkObject } from '../walkObject'

describe('walkObject', () => {
  const sampleObject = {
    name: 'Alice',
    age: 30,
    address: {
      city: 'Wonderland',
      zip: 12345,
    },
    hobbies: ['reading', 'chess'],
  }

  it('should map simple object values using callback', () => {
    let acc = ''
    const mockFn = jest.fn((value) => {
      acc += `.${value}`
    })

    walkObject(sampleObject, mockFn)

    expect(mockFn).toHaveBeenCalledTimes(6)
    expect(acc).toEqual('.Alice.30.Wonderland.12345.reading.chess')
  })

  it('should modify keys using getKey option', () => {
    const mockFn = jest.fn((key: string) => key.toUpperCase())

    walkObject(sampleObject, () => {}, {
      getKey: mockFn,
    })

    expect(mockFn).toHaveBeenCalledTimes(8)
  })

  it('should skip processing when predicate returns true', () => {
    const mockCallback = jest.fn((value) => value)
    const mockPredicate = jest.fn((_, path: string[]) => path.includes('age'))

    walkObject(sampleObject, mockCallback, {
      predicate: mockPredicate,
    })

    expect(mockCallback).toHaveBeenCalledTimes(2)
  })
})
