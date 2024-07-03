import { forEach, isString } from '@nex-ui/utils'
import type { CreateAliasesConfig } from './types'

export function createAliases({ aliases }: CreateAliasesConfig) {
  const aliasMap: Map<string, string[]> = new Map()

  forEach(aliases, (value: string | string[], key: string) => {
    const array = isString(value) ? [value] : value
    if (Array.isArray(array)) {
      aliasMap.set(`_${key}`, array)
    } else {
      console.error(
        `system: The value of this alias must be a string. ${key}: ${value}`,
      )
    }
  })

  return {
    getProperties: (key: string) => aliasMap.get(key),
  }
}
