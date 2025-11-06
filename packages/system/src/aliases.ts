import { __DEV__, isString } from '@nex-ui/utils'
import { isValidAliasValue } from './utils'
import type { CSSProperties, Dictionary } from './types'

export type AliasesDefinition = Dictionary<
  keyof CSSProperties | (keyof CSSProperties)[]
>

export function createAliases(aliases: AliasesDefinition) {
  const aliasMap: Map<string, string[]> = new Map()

  for (const key in aliases) {
    // istanbul ignore if
    if (!Object.hasOwn(aliases, key)) continue

    const value = aliases[key]

    if (__DEV__ && !isValidAliasValue(value)) {
      console.error(
        '[Nex UI] system: Expect the alias value to be a CSSProperty or CSSProperty[], but what is currently received is %o.',
        value,
      )
      continue
    }

    aliasMap.set(key, isString(value) ? [value] : value)
  }

  return {
    getPropertiesByAlias: (key: string) => aliasMap.get(key),
    isAlias: (key: string) => aliasMap.has(key),
  }
}

export type Aliases = ReturnType<typeof createAliases>
