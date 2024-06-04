export const isPlainObject = (value: any) =>
  typeof value === 'object' &&
  Object.prototype.toString.call(value) === '[object Object]'
