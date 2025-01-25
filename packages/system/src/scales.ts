import { forEach, isString } from '@nex-ui/utils'
import { checkTokenCategory } from './utils'
import type { TokenCategories } from './tokens'
import type { CSSPropertyKey } from './types'

export type ScalesDefinition = {
  [property in CSSPropertyKey]?: TokenCategories
}

export function createScales(scales: ScalesDefinition) {
  const scaleMap = new Map<string, TokenCategories>()

  forEach<ScalesDefinition>(
    scales,
    (category: TokenCategories | undefined, property: string) => {
      if (isString(category) && checkTokenCategory(category)) {
        scaleMap.set(property, category)
      }
    },
  )

  return {
    getCategoryByProperty: (key: string) => scaleMap.get(key),
  }
}

export type Scales = ReturnType<typeof createScales>
