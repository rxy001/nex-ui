import { forEach, isString } from '@nex-ui/utils'
import type { CSSProperties } from 'react'

import { checkTokenCategory } from './utils'
import type { TokenCategories } from './tokens'

export type CSSProperty = keyof CSSProperties

export type ScalesDefinition = {
  [property in CSSProperty]?: TokenCategories
}

export function createScales(scales: ScalesDefinition) {
  const scaleMap = new Map<CSSProperty, TokenCategories>()

  forEach(scales, (category: TokenCategories | undefined, p: string) => {
    const property = p as CSSProperty
    if (isString(category) && checkTokenCategory(category)) {
      scaleMap.set(property, category)
    }

    // console.error(`system: Unknown token category '${category}'`)
  })

  return {
    getCategoryByProperty: (key: string) => scaleMap.get(key as CSSProperty),
  }
}

export type Scales = ReturnType<typeof createScales>
