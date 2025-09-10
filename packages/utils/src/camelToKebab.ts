export function camelToKebab(str: string): string {
  if (typeof str !== 'string' || str.trim() === '') {
    return str
  }

  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase()
}
