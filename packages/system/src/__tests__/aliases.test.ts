import { describe, expect, it } from '@jest/globals'
import { createAliases } from '../aliases'

describe('createAliases', () => {
  it('works correctly', () => {
    const { getPropertiesByAlias } = createAliases({
      w: 'width',
      px: ['paddingLeft', 'paddingRight'],
    })

    expect(getPropertiesByAlias('w')).toEqual(['width'])
    expect(getPropertiesByAlias('px')).toEqual(['paddingLeft', 'paddingRight'])
  })
})
