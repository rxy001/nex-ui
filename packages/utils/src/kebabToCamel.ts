export function kebabToCamel(str: string): string {
  if (typeof str !== 'string' || str.trim() === '') {
    return str
  }

  const processed = str.replace(/^-+/, '')

  if (!str.includes('-')) {
    return str
  }

  if (processed === '') {
    return ''
  }

  return processed.replace(/-([a-zA-Z0-9]+)/g, (_, letters) => {
    return letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase()
  })
}
