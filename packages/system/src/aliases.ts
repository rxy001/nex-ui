import { forEach, isString, isArray } from '@nex-ui/utils'

export type AliasesDefinition = {
  [alias: string]: string | string[]
}

export function createAliases(aliases: AliasesDefinition) {
  const aliasMap: Map<string, string[]> = new Map()

  forEach(aliases, (value: string | string[], key: string) => {
    const array = isString(value) ? [value] : value

    if (isArray(array)) {
      aliasMap.set(key, array)
    }
  })

  return {
    getPropertiesByAlias: (key: string) => aliasMap.get(key),
  }
}

export type Aliases = ReturnType<typeof createAliases>
