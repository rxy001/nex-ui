function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, (match) => {
    return `-${match.toLowerCase()}`
  })
}

export function normalizeVar(prefix?: string) {
  return (_value: string | null, path: string[]) =>
    `${prefix ? `${prefix}-` : ''}${camelToKebab(path[0])}`
}
