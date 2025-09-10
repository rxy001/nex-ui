import { camelToKebab } from '../index'

// 测试用例
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

describe('camelToKebab', () => {
  it('should convert camelCase to kebab-case', () => {
    testCases.forEach(([input, expected]) => {
      const result = camelToKebab(input)
      expect(result).toBe(expected)
    })
  })
})
