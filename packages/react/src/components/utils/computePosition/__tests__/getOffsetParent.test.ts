import { getOffsetParent } from '../getOffsetParent'

describe('getOffsetParent', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return this.parentElement
      },
    })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      get() {
        return null
      },
    })
  })

  it('should return the nearest non-static parentElement for SVG elements', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    svg.setAttribute('style', 'position: relative;')
    svg.appendChild(rect)

    const div = document.createElement('div')
    div.setAttribute('style', 'position: relative;')
    div.appendChild(svg)
    document.body.appendChild(div)

    expect(getOffsetParent(rect)).toBe(svg)
    expect(getOffsetParent(svg)).toBe(div)

    document.body.removeChild(div)
  })

  it('should return window when SVG element has no positioned ancestor elements', () => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('style', 'position: static;')

    const div = document.createElement('div')
    div.setAttribute('style', 'position: static;')

    svg.appendChild(rect)
    div.appendChild(svg)
    document.body.appendChild(div)

    expect(getOffsetParent(rect)).toBe(window)
    expect(getOffsetParent(svg)).toBe(window)

    document.body.removeChild(div)
  })

  it('should return the nearest non-static and non-table parentElement for table elements', () => {
    const tbody = document.createElement('tbody')
    const table = document.createElement('table')
    const div = document.createElement('div')

    table.setAttribute('style', 'position: static;')
    table.appendChild(tbody)

    div.setAttribute('style', 'position: relative;')
    div.appendChild(table)

    document.body.appendChild(div)

    expect(getOffsetParent(tbody)).toBe(div)
    expect(getOffsetParent(table)).toBe(div)

    document.body.removeChild(div)
  })

  it('should return window when offsetParent is statically positioned and is the body or html element', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    document.body.setAttribute('style', 'position: static;')

    expect(getOffsetParent(div)).toBe(window)

    document.body.removeChild(div)
  })
})
