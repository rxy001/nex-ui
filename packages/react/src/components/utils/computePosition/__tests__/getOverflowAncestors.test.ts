import { getOverflowAncestors } from '../index'

describe('getOverflowAncestors', () => {
  it('should include window regardless of whether there are any overflow ancestors', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const result = getOverflowAncestors(div)
    expect(result).toContain(window)

    document.body.removeChild(div)
  })

  it('should return the nearest overflow ancestor', () => {
    const overflowDiv = document.createElement('div')
    overflowDiv.style.overflow = 'auto'

    const childDiv = document.createElement('div')
    overflowDiv.appendChild(childDiv)

    document.body.appendChild(overflowDiv)

    const result = getOverflowAncestors(childDiv)
    expect(result).toContain(overflowDiv)

    document.body.removeChild(overflowDiv)
  })

  it('should include body when body and html are overflow ancestors', () => {
    document.body.style.overflow = 'auto'
    const div = document.createElement('div')
    document.body.appendChild(div)
    expect(getOverflowAncestors(div)).not.toContain(document.body)

    document.documentElement.style.overflow = 'auto'
    expect(getOverflowAncestors(div)).toContain(document.body)

    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    document.body.removeChild(div)
  })

  it('should handle deeply nested overflow ancestors', () => {
    const outer = document.createElement('div')
    outer.style.overflow = 'auto'
    document.body.appendChild(outer)

    const middle = document.createElement('div')
    middle.style.overflow = 'scroll'
    outer.appendChild(middle)

    const inner = document.createElement('div')
    middle.appendChild(inner)

    const result = getOverflowAncestors(inner)

    expect(result).toEqual([middle, outer, window])

    document.body.removeChild(outer)
  })
})
