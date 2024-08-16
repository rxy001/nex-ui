export const isNumber = (value?: any): value is number =>
  typeof value === 'number'

export const isFunction = (value?: any): value is (...args: any[]) => any =>
  typeof value === 'function'

export const isPlainObject = (value: any): boolean =>
  typeof value === 'object' &&
  Object.prototype.toString.call(value) === '[object Object]'

export const isString = (value?: any): value is string =>
  typeof value === 'string'

export const isUndefined = (value?: any): value is undefined =>
  typeof value === 'undefined'
