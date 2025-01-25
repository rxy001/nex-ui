import { forEach, isString, isArray } from '@nex-ui/utils'
import type { CSSPropertyKey } from './types'

export type AliasesDefinition = {
  [alias: string]: CSSPropertyKey | CSSPropertyKey[]
}

export function createAliases(aliases: AliasesDefinition) {
  const aliasMap: Map<string, string[]> = new Map()

  forEach(aliases, (value: string | string[], key: string) => {
    if (!isString(value) && !isArray(value)) {
      console.error(
        `The alias value must be either a string or a number. ${key}: ${value}`,
      )
      return
    }

    aliasMap.set(key, isString(value) ? [value] : value)
  })

  return {
    getPropertiesByAlias: (key: string) => aliasMap.get(key),
  }
}

export type Aliases = ReturnType<typeof createAliases>
