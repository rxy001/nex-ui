import { kebabCase } from '../index'

const testCases = [
  ['backgroundColor', 'background-color'],
  ['marginTop', 'margin-top'],
  ['borderTopLeftRadius', 'border-top-left-radius'],
  ['WebkitTransform', 'webkit-transform'],
  ['XMLHttpRequest', 'xml-http-request'],
  ['fontSize', 'font-size'],
  ['zIndex', 'z-index'],
  ['', ''],
  ['a', 'a'],
  ['A', 'a'],
  ['AB', 'ab'],
  ['ABC', 'abc'],
  ['ABc', 'a-bc'],
  ['AbC', 'ab-c'],
  ['AbCd', 'ab-cd'],
  ['HTMLElement', 'html-element'],
  ['XMLParser', 'xml-parser'],
  ['JSONData', 'json-data'],
  ['URLPath', 'url-path'],
  ['CSS3Transform', 'css3-transform'],
  ['webkit2D', 'webkit2-d'],
]

describe('kebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    testCases.forEach(([input, expected]) => {
      const result = kebabCase(input)
      expect(result).toBe(expected)
    })
  })
})
