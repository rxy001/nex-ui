export const isNumber = (value?: any): value is number =>
  typeof value === 'number'

export const isFunction = (value?: any): value is (...args: any[]) => any =>
  typeof value === 'function' &&
  !/^class\s/.test(Function.prototype.toString.call(value))

export const isPlainObject = (value: any): boolean =>
  typeof value === 'object' &&
  Object.prototype.toString.call(value) === '[object Object]'

export const isString = (value?: any): value is string =>
  typeof value === 'string'

export const isUndefined = (value?: any): value is undefined =>
  typeof value === 'undefined'

export const isArray = (value: any): value is Array<any> => Array.isArray(value)

export const isFocusVisible = (element: Element): boolean => {
  try {
    return element.matches(':focus-visible')
  } catch {
    /* empty */
  }

  // istanbul ignore next
  return false
}
